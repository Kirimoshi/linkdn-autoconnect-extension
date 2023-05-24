import React from "react";
import ReactDOM from "react-dom";
import "./popup.css";

// interface AppProps {
//     url: string,
// }

const App: React.FC = () => {
  const url = "https://www.linkedin.com/in/cameronpercy/";
  const createTab = (url) => {
    return new Promise((resolve, reject) => {
      chrome.tabs.create({ url }, (tab) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        }
        resolve(tab);
      });
    });
  };

  const handleClick = () => {
    createTab(url).then(() => {
      chrome.runtime.sendMessage("LinkedIn User Profile is opened");
    });
    // .then((tab: chrome.tabs.Tab) => {
    //   chrome.tabs.sendMessage(tab.id, `LinkedIn User Profile is opened`);
    // })
    // .catch((error) => {
    //   console.log(error);
    // });
  };

  return (
    <>
      <h1>Click the GO! button to start AutoConnection</h1>
      <button onClick={handleClick}>GO!</button>
    </>
  );
};

const root = document.createElement("div");
document.body.appendChild(root);
ReactDOM.render(<App />, root);
