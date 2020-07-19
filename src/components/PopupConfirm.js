import Popup from "./Popup.js";

class PopupConfirm extends Popup {
  constructor(selectors, submitHandler) {
    super({popupSelector: selectors.popupSelector, closeButtonSelector: selectors.closeButtonSelector});
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(selectors.formSelector);
    this._submitButton = this._popup.querySelector(selectors.submitButtonSelector);
    this._submitDefaultText = this._submitButton.textContent;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this._submitHandler(evt, this._confirmParam);
    });
  }

  editSubmitText(text) {
    this._submitButton.textContent = text;
  }

  resetSubmitText() {
    this._submitButton.textContent = this._submitDefaultText;
  }

  open(confirmParam) {
    this._confirmParam = confirmParam;
    super.open();
  }
}

export default PopupConfirm;
