const editButton = document.querySelector(".profile__edit-button"),
  addButton = document.querySelector(".profile__add-button"),
  nameElement = document.querySelector(".profile__name"),
  positionElement = document.querySelector(".profile__position"),
  popup = document.querySelector(".popup"),
  closeButton = popup.querySelector(".popup__close-button"),
  editFormElement = popup.querySelector(".popup__form-container_edit-form"),
  editNameInput = editFormElement.querySelector(".popup__input_edit_name"),
  editPositionInput = editFormElement.querySelector(
    ".popup__input_edit_position"
  ),
  addFormElement = popup.querySelector(".popup__form-container_add-form"),
  addNameInput = addFormElement.querySelector(".popup__input_add_name"),
  addUrlInput = addFormElement.querySelector(".popup__input_add_url"),
  cardTemplate = document.querySelector("#card-template"),
  cardsElement = document.querySelector(".elements"),
  popupImagePreview = document.querySelector(".popup__image-preview"),
  popupImage = document.querySelector(".popup__image"),
  popupImageName = document.querySelector(".popup__image-name");

//обработка открытия popup
function showPopup() {
  addFormElement.classList.remove("popup__form-container_visible");
  editFormElement.classList.remove("popup__form-container_visible");
  popupImagePreview.classList.remove("popup__image-preview_visible");

  popup.classList.add("popup_opened");
}

//обработка закрытия popup
function closePopup() {
  popup.classList.remove("popup_opened");
}

function toggleLike(evt) {
  evt.target.classList.toggle("element__like_liked");
}

//показать картинку карточки
function showPreview(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupImageName.textContent = card.name;

  showPopup();
  popupImagePreview.classList.add("popup__image-preview_visible");
}

//вывести все карточки
function renderCards() {
  cards.forEach(renderCard);
}

function renderCard(card) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const imageElement = cardElement.querySelector(".element__image");
  imageElement.src = card.link;
  imageElement.alt = card.name;
  cardElement.querySelector(".element__name").textContent = card.name;

  //обработка вывода изображения карточки
  imageElement.addEventListener("click", () => {
    showPreview(card);
  });
  //обработка удаления карточки
  const removeButton = cardElement.querySelector(".element__remove");
  removeButton.addEventListener("click", removeCard);
  //обработка нажатия на кнопку "нравится"
  const likeButton = cardElement.querySelector(".element__like");
  likeButton.addEventListener("click", toggleLike);
  cardsElement.prepend(cardElement);
}

//открытие формы редактирования профиля
function openEditForm() {
  editNameInput.value = nameElement.textContent;
  editPositionInput.value = positionElement.textContent;

  showPopup();
  editFormElement.classList.add("popup__form-container_visible");
}

//открытие формы добавления изображения
function openAddForm() {
  addNameInput.value = "";
  addUrlInput.value = "";

  showPopup();
  addFormElement.classList.add("popup__form-container_visible");
}

//Обработка сохрания данных формы
function editFormSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = editNameInput.value;
  positionElement.textContent = editPositionInput.value;
  showPopup();
  addFormElement.classList.add("popup__form-container_visible");
}

//добавление карточки
function addCard(card) {
  cards.unshift(card);
  renderCard(card);
}

function removeCard(evt) {
  const cardElement = evt.target.closest(".element");
  const cardName = cardElement.querySelector(".element__name").textContent;
  const cardIndex = cards.findIndex((elem) => elem.name === cardName);
  cards = cards.filter((elem) => elem.name !== cardName);

  //т.к. элементы располагаются в обратно порядке, то нужен индекс с конца массива
  cardsElement.children[cards.length - cardIndex].remove();
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();

  const newCard = {
    name: addNameInput.value,
    link: addUrlInput.value,
  };

  addCard(newCard);
}

addButton.addEventListener("click", openAddForm);
editButton.addEventListener("click", openEditForm);
closeButton.addEventListener("click", closePopup);
editFormElement.addEventListener("submit", editFormSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);
//закрытие формы через escape
document.addEventListener("keydown", (evt) => {
  const escapeCode = 27;
  if (evt.keyCode == escapeCode) {
    closePopup();
  }
});

renderCards();
