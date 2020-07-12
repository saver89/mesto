import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__image");
    this._imageName = this._popup.querySelector(".popup__image-name");
  }

  open(name, link) {
    this._image.src = link;
    this._image.alt = name;
    this._imageName.textContent = name;

    super.open();
  }
}

export default PopupWithImage;
