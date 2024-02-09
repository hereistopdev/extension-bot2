setInterval(() => {
  v = document.querySelectorAll(".tradeoffer_footer_actions");
  if (v.length) {
    id = v.length - 1;
    console.log(id);
    if (v[id].children.length) {
      temp = v[id].children[0];
      console.log(temp);
      //   CancelTradeOffer("6723454237");
      if (temp) temp.click();
    }
    setTimeout(() => {
      vv = document.getElementsByClassName("btn_green_steamui btn_medium");
      if (vv.length) {
        vv[0].click();
      }
    }, 2000);
  }
}, 5000);
