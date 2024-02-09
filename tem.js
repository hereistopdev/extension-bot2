let items = document.getElementsByClassName("item-card selectable");
let btnDeposit = document.getElementsByClassName(
  "mat-focus-indicator w-100 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-accent"
);

let arr = [];

for (let i = 0; i < items.length; i++) {
  const itemCard = items[i];
  const priceElement = itemCard.querySelector(".currency-value");
  const priceValue = priceElement ? priceElement.textContent : "Unknown"; // Get the text content if price element exists

  arr.push({ val: itemCard, price: priceValue }); // Push an object with the item card and the price value onto the array
}

arr.sort((a, b) => a.price - b.price);

//Bot action as person
if (arr.length) arr[0].val.click();
if (btnDeposit.length) btnDeposit[0].click();

setTimeout(() => {
  let okBtn = document.getElementsByClassName(
    "mat-focus-indicator w-100 mb-2 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-accent"
  );
  if (okBtn.length) {
    okBtn[0].click();
    console.log("OK Clicked");
  }

  setTimeout(() => {
    let readyBtn = document.getElementsByClassName(
      "mat-focus-indicator w-100 mb-3 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-accent ng-star-inserted"
    );
    if (readyBtn.length) readyBtn[0].click();

    setTimeout(() => {
      let continueBtn = document.getElementsByClassName(
        "mat-focus-indicator w-100 mat-button-3d mat-button-lg mb-3 mat-flat-button mat-button-base mat-accent ng-star-inserted"
      );
      if (continueBtn.length) continueBtn[0].click();
      setTimeout(() => {
        let confirmBtn = document.getElementsByClassName(
          "mat-focus-indicator w-50 mat-button-3d mat-button-lg mat-flat-button mat-button-base mat-accent"
        );
        console.log("conFirmBut", confirmBtn, confirmBtn.length);
        setInterval(() => {
          if (confirmBtn.length) {
            console.log("Clicked", confirmBtn[0]);
            confirmBtn[0].click();
          }
        }, 5000);
      }, 5000);
    }, 3000);
  }, 10000);
}, 10000);

//====================================================

console.log(arr, btnDeposit);
