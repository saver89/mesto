class Card {
  constructor(
    { link, name, likes, _id, owner, createdAt },
    {
      cardSelector,
      likeCounterSelector,
      likeSelector,
      likedClass,
      imageSelector,
      removeSelector,
      removeVisibleClass,
      nameSelector,
      elementSelector,
    },
    handleCardClick
  ) {
    //css селекторы для определения элементов управления карточкой
    this._elementSelector = elementSelector;
    this._cardSelector = cardSelector;
    this._likeSelector = likeSelector;
    this._likeCounterSelector = likeCounterSelector;
    this._likedClass = likedClass;
    this._imageSelector = imageSelector;
    this._removeSelector = removeSelector;
    this._removeVisibleClass = removeVisibleClass;
    this._nameSelector = nameSelector;

    //Свойства карточки
    this._link = link;
    this._name = name;
    this._likes = likes;
    this._id = _id;
    this._owner = owner;
    this._createdAt = createdAt;

    //Обработчики событий
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(this._elementSelector)
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
      .querySelector(this._likeSelector)
      .classList.toggle(this._likedClass);
  }

  _setEventListeners() {
    //обработка вывода изображения карточки
    this._element
      .querySelector(this._imageSelector)
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });

    //обработка удаления карточки
    this._element
      .querySelector(this._removeSelector)
      .addEventListener("click", (evt) => {
        this._removeCard(evt);
      });

    //обработка нажатия на кнопку "нравится"
    this._element
      .querySelector(this._likeSelector)
      .addEventListener("click", (evt) => {
        this._toggleLike(evt);
      });
  }

  generateCard(currentUserId) {
    this._element = this._getTemplate();
    const imageElement = this._element.querySelector(this._imageSelector);

    imageElement.src = this._link;
    imageElement.alt = this._name;
    this._element.querySelector(this._likeCounterSelector).textContent = this._likes.length;
    this._element.querySelector(this._nameSelector).textContent = this._name;

    if (this._owner._id === currentUserId) {
      this._element
        .querySelector(this._removeSelector)
        .classList.add(this._removeVisibleClass);
    }

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
