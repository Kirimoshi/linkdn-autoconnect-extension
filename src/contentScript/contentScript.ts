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
    const element = document.querySelector<HTMLDivElement>(elementSelector);
    if (element) {
      element.dispatchEvent(event);
      return resolve();
    } else {
      return reject(`No element found by given selector ${elementSelector}`);
    }
  };
  return new Promise<void | string>(executorFn);
};

const ADD_NOTE_CONTENT: string =
  "Hi Cameron, I'm Ihor from Periodix\n" + "Connect?";
const addNote = (noteContent: string): Promise<void | string> => {
  return new Promise<void | string>((resolve, reject) => {
    const noteElem =
      document.querySelector<HTMLTextAreaElement>("#custom-message");
    if (noteElem) {
      noteElem.value = noteContent;
      noteElem.dispatchEvent(new InputEvent("change"));
      return resolve();
    } else {
      return reject(`No note element is found by given id`);
    }
  });
};

// delay(5000)
//   .then(() =>
//     simulateClickOnElement(
//       "button.artdeco-dropdown__trigger.artdeco-dropdown__trigger--placement-bottom.ember-view.pvs-profile-actions__action.artdeco-button.artdeco-button--secondary.artdeco-button--muted.artdeco-button--1"
//     )
//   )
//   .then(() =>
//     simulateClickOnElement(
//       "div.artdeco-dropdown__content-inner > ul > li:nth-child(3) > div"
//     )
//   )
//   .then(() => delay(1500))
//   .then(() => simulateClickOnElement('[aria-label="Add a note"]'))
//   .then(() => delay(5000))
//   .then(() => addNote(ADD_NOTE_CONTENT))
//   // .then(() => simulateClickOnElement('[aria-label="Send now"]'))
//   .catch((error) => {
//     console.log(error);
//   });

delay(2000)
  // .then(() => simulateClickOnElement('div.pvs-profile-actions button.artdeco-dropdown__trigger.artdeco-dropdown__trigger--placement-bottom.ember-view.pvs-profile-actions__action.artdeco-button.artdeco-button--secondary.artdeco-button--muted.artdeco-button--1'))
  .then(() =>
    simulateClickOnElement(
      "div.artdeco-dropdown__content-inner > ul > li:nth-child(3) > div"
    )
  )
  .then(() => delay(1000))
  .then(() => simulateClickOnElement('button.artdeco-button.artdeco-button--muted.artdeco-button--2.artdeco-button--secondary.ember-view.mr1'))
  .then(() => delay(1000))
  .then(() => addNote(ADD_NOTE_CONTENT))
  // .then(() => simulateClickOnElement('[aria-label="Send now"]'))
  .catch((error) => {
    console.log(error);
  });
