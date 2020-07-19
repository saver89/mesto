import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(selectors, submitHandler, openHandler) {
    super({popupSelector: selectors.popupSelector, closeButtonSelector: selectors.closeButtonSelector});
    this._submitHandler = submitHandler;
    this._openHandler = openHandler;
    this._inputList = Array.from(this._popup.querySelectorAll(selectors.formInputSelector));
    this._form = this._popup.querySelector(selectors.formSelector);
    this._submitButton = this._popup.querySelector(selectors.submitButtonSelector);
    this._submitDefaultText = this._submitButton.textContent;
  }

  _getInputValues() {
    const inputValuesObject = this._inputList.reduce((accumulator, input) => {
      accumulator[input.name] = input.value;

      return accumulator;
    }, {});

    return inputValuesObject;
  };

  _setInputValues(data) {
    this._inputList.forEach( input => {
      input.value = data[input.name];
    });
  };

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this._submitHandler(evt, this._getInputValues());
    });
  }

  editSubmitText(text) {
    this._submitButton.textContent = text;
  }

  resetSubmitText() {
    this._submitButton.textContent = this._submitDefaultText;
  }

  open(data) {
    if (data) {
      this._setInputValues(data);
    }

    if (this._openHandler) {
      this._openHandler();
    }

    super.open();
  }
}

export default PopupWithForm;
