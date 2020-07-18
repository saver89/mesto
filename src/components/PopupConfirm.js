import Popup from "./Popup.js";

class PopupConfirm extends Popup {
  constructor({popupSelector, closeButtonSelector, formSelector}, submitHandler) {
    super({popupSelector, closeButtonSelector});
    this._submitHandler = submitHandler;
    this._form = this._popup.querySelector(formSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      this._submitHandler(evt, this._confirmParam);
      super.close();
    });
  }

  open(confirmParam) {
    this._confirmParam = confirmParam;
    super.open();
  }
}

export default PopupConfirm;
