// popup.js
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");

  startButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      console.log(tabs);
      // Send a message to the background script with the tab ID
      chrome.runtime.sendMessage({
        action: "start",
        tab: tabs[0],
      });
    });
  });

  stopButton.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      // Send a message to the background script with the tab ID
      chrome.runtime.sendMessage({
        action: "stop",
        tab: tabs[0], // We can safely assume tabs[0] is defined and an active tab exists
      });
    });
  });
});

// document.addEventListener("DOMContentLoaded", function () {
//   const btn = document.getElementById("but");
//   btn.addEventListener("click", function () {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//       const currentTabId = tabs[0].id;
//       const currentURL = tabs[0].url;

//       switch (currentURL) {
//         case "https://www.csgoroll.com/en/top-up/steam/csgo":
//           chrome.scripting.executeScript({
//             target: { tabId: currentTabId, allFrames: true },
//             files: ["test.js"],
//           });
//           break;
//       }

//       console.log(tabs, currentURL);
//     });
//   });

//   const endBtn = document.getElementById("end");
//   endBtn.addEventListener("click", function () {
//     chrome.runtime.sendMessage({ action: "stopExtension" });
//     // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     //   const currentTabId = tabs[0].id;
//     //   const currentURL = tabs[0].url;

//     //   switch (currentURL) {
//     //     case "https://www.csgoroll.com/en/top-up/steam/csgo":
//     //       chrome.scripting.executeScript({
//     //         target: { tabId: currentTabId, allFrames: true },
//     //         files: ["end.js"],
//     //       });
//     //       break;
//     //   }

//     //   console.log(tabs, currentURL);
//     // });
//   });
// });
