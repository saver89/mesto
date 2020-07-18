import { escapeCode } from "../utils/constants.js";

class Popup {
  constructor({popupSelector, closeButtonSelector}) {
    this._popup = document.querySelector(popupSelector);
    this._closeButton = this._popup.querySelector(closeButtonSelector);

    //т.к. bind возвращает новую функцию объект сохраним ее как свойство класса
    this._handleEscClose = function(evt) {
      if (evt.keyCode === escapeCode) {
        this.close();
      }
    }.bind(this);
  }

  _handleOutsideClickClose(evt) {
    if (!evt.target.closest(".popup__form-container") && !evt.target.classList.contains("popup__close-button")) {
      this.close();
    }
  }

  setEventListeners() {
    //обработчик закрытия формы при нажатии на кнопку закрытия
    this._closeButton.addEventListener("click", () => {
      this.close();
    });
    //обработчик закрытия формы при нажатии вне области формы
    this._popup.addEventListener("mousedown", (evt) => {
      this._handleOutsideClickClose(evt);
    });
  }

  open() {
    this._popup.classList.add("popup_opened");

    //обработчик закрытия формы при нажатии клавиши esc
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }
}

export default Popup;
