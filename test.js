function getElementsByClass(className) {
  return document.getElementsByClassName(className);
}

function clickElement(element) {
  if (element) {
    element.click();
    console.log(`Clicked element with class: ${element.innerText}`);
  }
}

function collectItemCards() {
  let items = getElementsByClass("item-card selectable");
  let itemArray = [];

  for (let item of items) {
    const priceElement = item.querySelector(".currency-value");
    const priceValue = priceElement ? priceElement.textContent : "Unknown";
    let FN = item.querySelector(".wear");
    FN = FN ? FN.innerText : null;
    itemArray.push({ element: item, price: priceValue, FN });
  }

  return itemArray;
}

function sortItemsByPrice(itemArray) {
  itemArray.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
}
function performBotActions() {
  console.log("Bot Starts working");
  let items = collectItemCards();
  sortItemsByPrice(items);

  let randomIndex = Math.floor(Math.random() * items.length);
  if (items[randomIndex]) items[randomIndex].element.click();

  let btnDeposit = getElementsByClass(
    "mat-focus-indicator w-100 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-accent"
  );

  setTimeout(() => {
    let applyButton = getElementsByClass(
      "mat-focus-indicator w-100 mat-flat-button mat-button-base mat-primary"
    )[0];
    clickElement(applyButton);

    setTimeout(() => {
      clickElement(btnDeposit[0]);

      setTimeout(() => {
        let okButton = getElementsByClass(
          "mat-focus-indicator w-100 mb-2 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-accent"
        )[0];
        clickElement(okButton);

        setTimeout(() => {
          let readyButton = getElementsByClass(
            "mat-focus-indicator w-100 mb-3 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-accent ng-star-inserted"
          )[0];
          clickElement(readyButton);

          setTimeout(() => {
            let continueButton = getElementsByClass(
              "mat-focus-indicator w-100 mat-button-3d mat-button-lg mb-3 mat-flat-button mat-button-base mat-accent ng-star-inserted"
            )[0];
            clickElement(continueButton);

            setTimeout(() => {
              let confirmButton = getElementsByClass(
                "mat-focus-indicator w-50 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-accent"
              )[0];
              if (confirmButton) {
                const Imgdiv = document.getElementsByClassName(
                  "item selected ng-star-inserted"
                );
                const pic = Imgdiv.length
                  ? Imgdiv[0].querySelector("img")
                  : "None";

                let _id = 0;
                imgItems = document.querySelectorAll(".item");
                Array.from(imgItems).map((v, i) => {
                  if (v.className == "item selected ng-star-inserted") {
                    _id = i;
                  }
                });

                let _page = 0;
                tempText = document.getElementsByClassName(
                  "mt-2 ng-star-inserted"
                );
                if (tempText.length) {
                  const arr = tempText[0].innerText.split(" ");
                  if (arr.length > 2) _page = Number(arr[2]);
                }
                FinalID = (_page - 1) * 16 + _id;

                chrome.storage.local.set({ key: pic.src, fn: FinalID });
                console.log(FinalID, chrome.storage.local.get());

                setTimeout(() => {
                  clickElement(confirmButton);

                  setTimeout(() => {
                    let primaryButton = getElementsByClass(
                      "mat-focus-indicator mat-button mat-button-base mat-primary"
                    );
                    if (primaryButton.length)
                      clickElement(primaryButton[primaryButton.length - 1]);

                    setTimeout(() => {
                      let checkBox = document.querySelector(
                        ".mat-checkbox-layout"
                      );
                      clickElement(checkBox);

                      setTimeout(() => {
                        let warnButton = getElementsByClass(
                          "mat-focus-indicator w-100 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-warn"
                        )[0];
                        clickElement(warnButton);
                      }, 1000);
                    }, 0);
                  }, 12 * 60 * 1000); // Time to cancel
                }, 5000);
              }
            }, 15000);
          }, 3000);
        }, 10000);
      }, 10000);
    }, 1000);
  }, 1000);
}

function checkStartCondition() {
  chrome.storage.local.get(["start"], function (result) {
    if (result.start) {
      performBotActions();

      const intervalId = setInterval(() => {
        console.log("Interval Start");
        const warningElements = getElementsByClass(
          "mat-checkbox-inner-container"
        );
        if (warningElements && warningElements.length > 1) {
          clickElement(warningElements[1]);

          const closeButton =
            warningElements[1]?.parentElement?.parentElement?.parentElement
              ?.nextElementSibling?.children[0];
          clickElement(closeButton);
          console.log("Close Button Clicked!");
        }

        const TradeNotFound = document.getElementsByClassName(
          "mat-dialog-container cdk-dialog-container ng-tns-c2096979241-16 ng-trigger ng-trigger-dialogContainer ng-star-inserted"
        );
        if (TradeNotFound.length) {
          if (
            TradeNotFound[0]?.children[0]?.children[0]?.textContent ==
            "Trade Not Confirmed"
          ) {
            console.log("Trade Not Confirmed Click");
            TradeNotFound[0]?.children[0]?.children[1].lastChild.click();
          }
        }

        const success_btn = document.getElementsByClassName(
          "mat-focus-indicator w-100 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-accent"
        );
        if (success_btn.length && success_btn[0].innerText == "OK") {
          console.log("Trade Complete Success Button", success_btn);
          success_btn[0].click();
        }
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
        location.reload();
      }, 5 * 60 * 1000);
    } else {
      console.log("Bot should stop working!!!");
    }
  });
}

setTimeout(checkStartCondition, 5000);
