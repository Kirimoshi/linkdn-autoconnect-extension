const CONNECT_BUTTON_SELECTOR_PRIMARY: string =
  "div.pvs-profile-actions > button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.pvs-profile-actions__action";
const CONNECT_BUTTON_SELECTOR_SECONDARY: string =
  "div.artdeco-dropdown__content-inner > ul > li:nth-child(3) > div";
const ADD_NOTE_BUTTON_SELECTOR: string =
  "button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view.mr1";
const ADD_NOTE_FIELD_SELECTOR: string = "#custom-message";
const SEND_BUTTON_SELECTOR: string =
  "div.artdeco-modal__actionbar.ember-view.text-align-right > button.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1";
const NOTE_CONTENT: string = "Hi Cameron, I'm ... from ...\n" + "Connect?";

const delay = (ms: number) =>
  new Promise<NodeJS.Timeout>((res) => setTimeout(res, ms));
const simulateClickOnElement = (
  elementSelector: string
): Promise<void | string> => {
  return new Promise((resolve, reject) => {
    const event = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    const element = document.querySelector<HTMLDivElement>(elementSelector);
    if (element) {
      element.dispatchEvent(event);
      resolve();
    }
    reject(`No element found by given selector ${elementSelector}`);
  });
};

const addNote = (noteContent: string): Promise<void | string> => {
  return new Promise((resolve, reject) => {
    const noteElem = document.querySelector<HTMLTextAreaElement>(
      ADD_NOTE_FIELD_SELECTOR
    );
    if (noteElem) {
      noteElem.value = noteContent;
      noteElem.dispatchEvent(new InputEvent("change"));
      resolve();
    }
    reject(
      `No note element is found by given selector ${ADD_NOTE_FIELD_SELECTOR}`
    );
  });
};
delay(2000)
  // "Connect" button click if visible on first render
  .then(() => simulateClickOnElement(CONNECT_BUTTON_SELECTOR_PRIMARY))
  .catch((error) => {
    console.log(error);
    // "Connect" button click if in drop-down menu
    return simulateClickOnElement(CONNECT_BUTTON_SELECTOR_SECONDARY);
  })
  .catch(() => console.log("Failed to find Connect button"))
  .then(() => delay(1000))
  // "Add a note" button click
  .then(() => simulateClickOnElement(ADD_NOTE_BUTTON_SELECTOR))
  .catch((error) => console.log(error))
  .then(() => delay(1000))
  // Injecting note content
  .then(() => addNote(NOTE_CONTENT))
  .catch((error) => console.log(error))
  .then(() => delay(1000))
  // "Send" button click
  .then(() => simulateClickOnElement(SEND_BUTTON_SELECTOR))
  .catch((error) => console.log(error))
  .then(() => console.log("Connection request successfully sent"))
  .finally(() => console.log("SCRIPT END"));
