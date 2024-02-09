setTimeout(() => {
  function triggerDoubleClick(element) {
    const doubleClickEvent = new MouseEvent("dblclick", {
      bubbles: true,
      cancelable: true,
      view: window,
    });

    element.dispatchEvent(doubleClickEvent);
  }

  chrome.storage.local.get(["key", "fn"], function (result) {
    let temp = document.querySelectorAll(".itemHolder");
    triggerDoubleClick(temp[result.fn].firstChild);

    setTimeout(() => {
      const v = document.getElementById("you_notready");
      if (v) v.click();
      const vv = document.getElementsByClassName(
        "btn_green_steamui btn_medium"
      );
      if (vv.length) vv[0].click();
      setTimeout(() => {
        const finalBtn = document.getElementById("trade_confirmbtn");
        if (finalBtn) finalBtn.click();
        setTimeout(() => {
          const v = document.getElementsByClassName(
            "btn_grey_steamui btn_medium"
          );

          console.log(v);
          if (v.length) {
            v[0].click();
          }
        }, 2000);
      }, 1000);
    }, 1000);
    // }
  });
}, 2000);
