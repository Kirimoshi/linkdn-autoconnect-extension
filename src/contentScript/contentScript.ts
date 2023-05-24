const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
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
  return new Promise<void | string>(executorFn);
};

const ADD_NOTE_CONTENT: string =
  "Hi Cameron, I'm ........ from ......\n" + "Connect?\n";
const addNote = (noteContent: string): Promise<void | string> => {
  return new Promise<void | string>((resolve, reject) => {
    const noteElem =
      document.querySelector<HTMLTextAreaElement>("#custom-message");
    if (noteElem) {
      noteElem.value = noteContent;
      return resolve();
    } else {
      return reject(`No note element is found by given id`);
    }
  });
};

delay(5000)
  .then(() =>
    simulateClickOnElement(
      "button.artdeco-dropdown__trigger.artdeco-dropdown__trigger--placement-bottom.ember-view.pvs-profile-actions__action.artdeco-button.artdeco-button--secondary.artdeco-button--muted.artdeco-button--1"
    )
  )
  .then(() => delay(2000))
  .then(() =>
    simulateClickOnElement(
      "div.artdeco-dropdown__content-inner > ul > li:nth-child(3) > div"
    )
  )
  .then(() => delay(1500))
  .then(() => simulateClickOnElement('[aria-label="Add a note"]'))
  // .then(() => addNote(ADD_NOTE_CONTENT))
  // .then(() => simulateClickOnElement('[aria-label="Send now"]'))
  .catch((error) => {
    console.log(error);
  });
