function init() {
  var steamTradeOffersURL =
    "https://steamcommunity.com/profiles/76561198156144508/tradeoffers/sent/";

  console.log("Bot Starts working");
  let items = document.getElementsByClassName("item-card selectable");
  let btnDeposit = document.getElementsByClassName(
    "mat-focus-indicator w-100 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-accent"
  );

  let arr = [];

  for (let i = 0; i < items.length; i++) {
    const itemCard = items[i];
    const priceElement = itemCard.querySelector(".currency-value");
    const priceValue = priceElement ? priceElement.textContent : "Unknown"; // Get the text content if price element exists
    let FN = itemCard.querySelector(".wear");
    if (FN) FN = FN.innerText;
    arr.push({ val: itemCard, price: priceValue, FN }); // Push an object with the item card and the price value onto the array
  }
  //mat-focus-indicator w-100 mat-flat-button mat-button-base mat-primary
  let sum = 0;
  while (sum < 10) {
    if (arr.length == 0) {
      const temp = document.getElementsByClassName(
        "mat-focus-indicator mat-button-3d d-block mt-4 mx-auto mat-flat-button mat-button-base mat-accent ng-star-inserted"
      );
      if (temp.length) {
        temp[0].click();
        console.log("Click new item.");
      }
    }
    sum++;
  }

  arr.sort((a, b) => a.price - b.price);

  let RandNum = 0;
  RandNum = Math.trunc(Math.random() * arr.length);
  //Bot action as person
  if (arr.length > RandNum) arr[RandNum].val.click();
  setTimeout(() => {
    const temp = document.getElementsByClassName(
      "mat-focus-indicator w-100 mat-flat-button mat-button-base mat-primary"
    );
    if (temp.length) {
      temp[0].click();
      console.log("Click apply % button");
    }
    setTimeout(() => {
      if (btnDeposit.length) {
        btnDeposit[0].click();
        console.log("Click Deposit Button");
      }
      setTimeout(() => {
        let okBtn = document.getElementsByClassName(
          "mat-focus-indicator w-100 mb-2 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-accent"
        );
        if (okBtn.length) {
          okBtn[0].click();
          console.log(okBtn[0], "OK Clicked");
        }

        setTimeout(() => {
          let readyBtn = document.getElementsByClassName(
            "mat-focus-indicator w-100 mb-3 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-accent ng-star-inserted"
          );
          if (readyBtn.length) {
            readyBtn[0].click();
            console.log("I am Ready button clicked");
          }

          //       setTimeout(() => {
          //         let continueBtn = document.getElementsByClassName(
          //           "mat-focus-indicator w-100 mat-button-3d mat-button-lg mb-3 mat-flat-button mat-button-base mat-accent ng-star-inserted"
          //         );
          //         if (continueBtn.length) continueBtn[0].click();
          //         console.log("just before click send items");
          //         setTimeout(() => {
          //           let confirmBtn = document.getElementsByClassName(
          //             "mat-focus-indicator w-50 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-accent"
          //           );
          //           console.log("conFirmBut", confirmBtn, confirmBtn.length);
          //           if (confirmBtn.length) {
          //             const Imgdiv = document.getElementsByClassName(
          //               "item selected ng-star-inserted"
          //             );
          //             const pic = Imgdiv.length
          //               ? Imgdiv[0].querySelector("img")
          //               : "None";

          //             let _id = 0;
          //             imgItems = document.querySelectorAll(".item");
          //             Array.from(imgItems).map((v, i) => {
          //               console.log(v, i);
          //               if (v.className == "item selected ng-star-inserted") {
          //                 _id = i;
          //               }
          //             });

          //             let _page = 0;
          //             tempText = document.getElementsByClassName(
          //               "mt-2 ng-star-inserted"
          //             );
          //             if (tempText.length) {
          //               const arr = tempText[0].innerText.split(" ");
          //               console.log(arr);
          //               if (arr.length > 2) _page = Number(arr[2]);
          //             }
          //             FinalID = (_page - 1) * 16 + _id;
          //             console.log(
          //               _id,
          //               _page,
          //               FinalID,
          //               "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
          //             );

          //             chrome.storage.local.set({ key: pic.src, fn: FinalID });

          //             console.log("Clicked", confirmBtn[0], pic.src);
          //             setTimeout(() => {
          //               confirmBtn[0].click(); //Final

          //               setTimeout(() => {
          //                 const v = document.querySelector(
          //                   ".cdk-overlay-backdrop-showing"
          //                 );

          //                 if (v) {
          //                   v.click();
          //                   v.click();
          //                   v.click();
          //                   console.log("Backed!");
          //                   // init();
          //                 }
          //               }, 1000);
          //               setTimeout(() => {
          //                 console.log("hey", FinalID);
          //                 // window.open(steamTradeOffersURL, "_blank");
          //                 // window.close();

          //                 const v = document.getElementsByClassName(
          //                   "mat-focus-indicator mat-button mat-button-base mat-primary"
          //                 );
          //                 if (v.length) v[v.length - 1].click();
          //                 setTimeout(() => {
          //                   vv = document.querySelector(".mat-checkbox-layout");
          //                   if (vv) vv.click();
          //                   setTimeout(() => {
          //                     vvv = document.getElementsByClassName(
          //                       "mat-focus-indicator w-100 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-warn"
          //                     );
          //                     if (vvv.length) vvv[0].click();
          //                   }, 1000);
          //                 });
          //               }, 10 * 60 * 1000); //Time to cancel
          //             }, 5000);
          //           }
          //         }, 15000);
          //       }, 3000);
        }, 10 * 1000);
      }, 10 * 1000);
    }, 1000);
  }, 1000);
}

setTimeout(() => {
  chrome.storage.local.get(["start"], function (result) {
    console.log(result);
    if (result.start) {
      init();
      setTimeout(() => {
        location.reload();
      }, 12 * 60 * 1000);
    }
  });
}, 5000);

// if (!window.intervalId) {
//   // window.intervalId = setInterval(() => {
//   console.log("Hi"); // This will be logged in the context of the current page.
//   init();
//   // }, 60 * 1000);
// }
