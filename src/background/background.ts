chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background script is running");
  console.log(message);
});
