const imageElement = this._element.querySelector(".element__image");

class Card {
  constructor({ link, name }, cardSelector, showPopup) {
    this._cardSelector = cardSelector;
    this._link = link;
    this._name = name;
    this._showPopup = showPopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.cloneNode(true);
    return cardElement;
  }

  //показать картинку карточки
  _showPreview() {
    const popupImage = document.querySelector(".popup__image");
    popupImage.src = this._link;
    popupImage.alt = this._name;
    document.querySelector(".popup__image-name").textContent = this._name;

    this._showPopup(document.querySelector(".popup__image-preview"));
  }

  //обработчик удаления карточки
  _removeCard(evt) {
    evt.target.closest('.element').remove();
  }

  //обработчик нажатия на лайк
  _toggleLike(evt) {
    evt.target.classList.toggle("element__like_liked");
  }

  _setEventListeners() {
    //обработка вывода изображения карточки
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._showPreview();
      });

    //обработка удаления карточки
    this._element
      .querySelector(".element__remove")
      .addEventListener("click", (evt) => {
        this._removeCard(evt);
      });

    //обработка нажатия на кнопку "нравится"
    this._element
      .querySelector(".element__like")
      .addEventListener("click", (evt) => {
        this._toggleLike(evt);
      });
  }

  generateCard() {
    this._element = this._getTemplate();

    imageElement.src = this._link;
    imageElement.alt = this._name;
    this._element.querySelector(".element__name").textContent = this._name;
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
