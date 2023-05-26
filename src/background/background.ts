chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background script is running");
  console.log(message);
  chrome.tabs
    .query({
      active: true,
      currentWindow: true,
    })
    .then((tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        files: ["contentScript.js"],
      });
    });
});
