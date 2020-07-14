import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor({popupSelector, closeButtonSelector, popupImageSelector, popupImageNameSelector}) {
    super({popupSelector, closeButtonSelector});
    this._image = this._popup.querySelector(popupImageSelector);
    this._imageName = this._popup.querySelector(popupImageNameSelector);
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._imageName.textContent = name;

    super.open();
  }
}

export default PopupWithImage;
