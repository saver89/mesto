class Card {
  constructor({ link, name }, cardSelector, handleCardClick) {
    this._cardSelector = cardSelector;
    this._link = link;
    this._name = name;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  //обработчик удаления карточки
  _removeCard(evt) {
    this._element.remove();
    this._element = null;
  }

  //обработчик нажатия на лайк
  _toggleLike(evt) {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_liked");
  }

  _setEventListeners() {
    //обработка вывода изображения карточки
    this._element
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
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
    const imageElement = this._element.querySelector(".element__image");

    imageElement.src = this._link;
    imageElement.alt = this._name;
    this._element.querySelector(".element__name").textContent = this._name;
    this._setEventListeners();

    return this._element;
  }

  getName() {
    return this._name;
  }

  getLink() {
    return this._link;
  }
}

export default Card;
