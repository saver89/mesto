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
  cardsElement = document.querySelector(".elements");

function renderCards() {
  cards.forEach(renderCard);
}

function renderCard(card) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const imageElement = cardElement.querySelector(".element__image");
  imageElement.src = card.link;
  imageElement.alt = card.name;
  cardElement.querySelector(".element__name").textContent = card.name;

  removeButton = cardElement.querySelector(".element__remove");
  removeButton.addEventListener("click", removeCard);
  cardsElement.prepend(cardElement);
}

//обработка открытия/закрытия popup
function togglePopup() {
  popup.classList.toggle("popup_opened");
}

//открытие формы редактирования профиля
function openEditForm() {
  editNameInput.value = nameElement.textContent;
  editPositionInput.value = positionElement.textContent;
  editFormElement.classList.add("popup__form-container_visible");
  addFormElement.classList.remove("popup__form-container_visible");

  togglePopup();
}

//открытие формы добавления изображения
function openAddForm() {
  addNameInput.value = "";
  addUrlInput.value = "";
  editFormElement.classList.remove("popup__form-container_visible");
  addFormElement.classList.add("popup__form-container_visible");

  togglePopup();
}

//Обработка сохрания данных формы
function editFormSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = editNameInput.value;
  positionElement.textContent = editPositionInput.value;
  togglePopup();
}

function addCard(card) {
  cards.unshift(card);
  renderCard(card);
}

function removeCard(evt) {
  const cardElement = evt.target.closest(".element");
  const cardName = cardElement.querySelector(".element__name").textContent;
  const cardIndex = cards.findIndex((elem) => elem.name === cardName);
  cards = cards.filter((elem) => elem.name !== cardName);
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
closeButton.addEventListener("click", togglePopup);
editFormElement.addEventListener("submit", editFormSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);
//закрытие формы через escape
document.addEventListener("keydown", (evt) => {
  const escapeCode = 27;
  if (evt.keyCode == escapeCode) {
    popup.classList.remove("popup_opened");
  }
});

renderCards();
