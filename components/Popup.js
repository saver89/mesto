import { escapeCode, closeButtonSelector } from '../utils/constants.js';

class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButtonSelector);
  }

  _handleEscClose = (evt) => {
    if (evt.keyCode === escapeCode) {
      this.close();
    }
  }

  _handleOutsideClickClose = (evt) => {
    if (!evt.target.closest(".popup__content-container") && !evt.target.classList.contains("popup__close-button")) {
      this.close();
    }
  }

  setEventListeners() {
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    //обработчики закрытия формы
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.addEventListener("mousedown", this._handleOutsideClickClose);
  }

  open() {
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
  }
}

export default Popup;
