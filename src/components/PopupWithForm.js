import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor({popupSelector, closeButtonSelector, formSelector, formInputSelector}, submitHandler, openHandler) {
    super({popupSelector, closeButtonSelector});
    this._submitHandler = submitHandler;
    this._openHandler = openHandler;
    this._inputList = Array.from(this._popup.querySelectorAll(formInputSelector));
    this._form = this._popup.querySelector(formSelector);
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
      super.close();
    });
  }

  open(data) {
    if (data) {
      this._setInputValues(data);
    }

    this._openHandler();
    super.open();
  }
}

export default PopupWithForm;