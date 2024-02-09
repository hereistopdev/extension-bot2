let intervalId;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(sender, message);
  if (message.action === "start") {
    chrome.storage.local.set({ start: true });
    chrome.scripting.executeScript({
      target: { tabId: message.tab.id },
      files: ["test.js"],
    });
  } else if (message.action === "stop") {
    chrome.storage.local.set({ start: false });
    chrome.scripting.executeScript({
      target: { tabId: message.tab.id },
      files: ["stop.js"],
    });
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.active) {
    console.log("Changed");

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      const currentTabId = tabs[0].id;
      console.log(tabs[0].url);
      if (tabs[0].url.slice(0, 37) == "https://steamcommunity.com/tradeoffer") {
        console.log(tabs, "LDLSLSSL");
        chrome.scripting.executeScript({
          target: { tabId: currentTabId, allFrames: true },
          files: ["hello.js"],
        });
      } else if (
        tabs[0].url == "https://www.csgoroll.com/en/top-up/steam/csgo"
      ) {
        console.log("CS GO");
        chrome.scripting.executeScript({
          target: { tabId: currentTabId, allFrames: true },
          files: ["test.js"],
        });
      } else {
        console.log("HAHA");
      }
    });
  }
});
