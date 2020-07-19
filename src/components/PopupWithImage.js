import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(selectors) {
    super({ popupSelector: selectors.popupSelector, closeButtonSelector: selectors.closeButtonSelector });
    this._image = this._popup.querySelector(selectors.popupImageSelector);
    this._imageName = this._popup.querySelector(selectors.popupImageNameSelector);
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._imageName.textContent = name;

    super.open();
  }
}

export default PopupWithImage;
