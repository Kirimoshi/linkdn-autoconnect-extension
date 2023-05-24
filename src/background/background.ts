chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("Background script is running");
  console.log(message);
  // chrome.scripting.registerContentScripts([
  //   {
  //     id: "session-script",
  //     js: ["contentScript.js"],
  //     persistAcrossSessions: false,
  //     matches: ["https://www.linkedin.com/in/*"],
  //     runAt: "document_start",
  //   },
  // ]);
  // chrome.tabs
  //   .query({
  //     active: true,
  //     currentWindow: true,
  //   })
  // .then((tabs) => {
  //   chrome.scripting.executeScript({
  //     target: { tabId: tabs[0].id },
  //     files: ["contentScript.js"],
  //   });
  // })
  // .then(() => console.log("Script injected"));
});
