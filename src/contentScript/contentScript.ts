const delay = (func, ms) => {
  return function () {
    setTimeout(() => func.apply(this, arguments), ms);
  };
};

const simulateClickOnElement = (
  elementSelector: string
): Promise<void | string> => {
  const executorFn = (resolve, reject) => {
    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    const element = document.querySelector(elementSelector);
    if (element) {
      element.dispatchEvent(event);
      return resolve();
    } else {
      return reject("No element found by given selector");
    }
  };
  // const delayedExecutor = delay(executorFn, delayInMs);
  return new Promise<void | string>(executorFn);
};

const ADD_NOTE_CONTENT: string =
  "Hi Cameron, I'm ........ from ......\n" + "Connect?\n";
const addNote = (noteContent: string): Promise<void | string> => {
  return new Promise<void | string>((resolve, reject) => {
    const noteElem = document.querySelector("#custom-message");
    if (noteElem) {
      noteElem.textContent = noteContent;
      return resolve();
    } else {
      return reject(`No note element is found by given id`);
    }
  });
};

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  simulateClickOnElement('[aria-label="More actions"]')
    .then(() =>
      simulateClickOnElement(
        "div.artdeco-dropdown__content-inner > ul > li:nth-child(3) > div"
      )
    )
    .then(() => simulateClickOnElement('[aria-label="Add a note"]'))
    // .then(() => addNote(ADD_NOTE_CONTENT))
    // .then(() => simulateClickOnElement('[aria-label="Send now"]'))
    .catch((error) => {
      console.log(error);
    });
});
