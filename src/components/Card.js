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
    {
      handleCardClick,
      handleRemoveClick,
      handleLikeClick
    }
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
    this._handleRemoveClick = handleRemoveClick;
    this._handleLikeClick = handleLikeClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(this._elementSelector)
      .cloneNode(true);

    return cardElement;
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
      .addEventListener("click", () => {
        this._handleRemoveClick();
      });

    //обработка нажатия на кнопку "нравится"
    this._element
      .querySelector(this._likeSelector)
      .addEventListener("click", (evt) => {
        this._handleLikeClick(this._id);
      });
  }

  //обработчик удаления карточки
  hideCard() {
    this._element.remove();
    this._element = null;
  }

  isLiked(currentUserId) {
    return this._likes.some(like => like._id === currentUserId);
  }

  //отрисовать информацию о лайках
  renderLike(currentUserId) {
    if (this.isLiked(currentUserId)) {
      this._element
        .querySelector(this._likeSelector)
        .classList.add(this._likedClass);
    } else {
      this._element
        .querySelector(this._likeSelector)
        .classList.remove(this._likedClass);
    }

    this._element.querySelector(this._likeCounterSelector).textContent = this._likes.length;
  }

  generateCard(currentUserId) {
    this._element = this._getTemplate();
    const imageElement = this._element.querySelector(this._imageSelector);

    imageElement.src = this._link;
    imageElement.alt = this._name;
    this._element.querySelector(this._nameSelector).textContent = this._name;

    if (this._owner._id === currentUserId) {
      this._element
        .querySelector(this._removeSelector)
        .classList.add(this._removeVisibleClass);
    }
    this.renderLike(currentUserId);

    this._setEventListeners();

    return this._element;
  }

  getId() {
    return this._id;
  }

  setLikes(likes) {
    this._likes = likes;
  }
}

export default Card;
