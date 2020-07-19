class Card {
  constructor(props, selectors, handlers) {
    //css селекторы для определения элементов управления карточкой
    this._elementSelector = selectors.elementSelector;
    this._cardSelector = selectors.cardSelector;
    this._likeSelector = selectors.likeSelector;
    this._likeCounterSelector = selectors.likeCounterSelector;
    this._likedClass = selectors.likedClass;
    this._imageSelector = selectors.imageSelector;
    this._removeSelector = selectors.removeSelector;
    this._removeVisibleClass = selectors.removeVisibleClass;
    this._nameSelector = selectors.nameSelector;

    //Свойства карточки
    this._link = props.link;
    this._name = props.name;
    this._likes = props.likes;
    this._id = props._id;
    this._owner = props.owner;
    this._createdAt = props.createdAt;

    //Обработчики событий
    this._handleCardClick = handlers.handleCardClick;
    this._handleRemoveClick = handlers.handleRemoveClick;
    this._handleLikeClick = handlers.handleLikeClick;
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
