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
    popupImageName.textContent = this._name;

    this._showPopup(document.querySelector(".popup__image-preview"));
  }

  //обработчик удаления карточки
  _removeCard() {
    this._card.remove();
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
        _showPreview(card);
      });
    //обработка удаления карточки
    this._element
      .querySelector(".element__remove")
      .addEventListener("click", this._removeCard);
    //обработка нажатия на кнопку "нравится"
    this._element
      .querySelector(".element__like")
      .addEventListener("click", this._toggleLike);
  }

  generateCard(card) {
    this._element = this._getTemplate();
    const imageElement = this._element.querySelector(".element__image");

    imageElement.src = this._link;
    imageElement.alt = this._name;
    this._element.querySelector(".element__name").textContent = this._name;

    return this._element;
  }
}

export default Card;
