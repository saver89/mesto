const editButton = document.querySelector(".profile__edit-button"),
  addButton = document.querySelector(".profile__add-button"),
  nameElement = document.querySelector(".profile__name"),
  positionElement = document.querySelector(".profile__position"),
  popup = document.querySelector(".popup"),
  closeButton = popup.querySelector(".popup__close-button"),
  editFormElement = popup.querySelector(".popup__form-container_edit-form"),
  editNameInput = editFormElement.querySelector(".popup__input_edit_name"),
  editPositionInput = editFormElement.querySelector(".popup__input_edit_position"),
  addFormElement = popup.querySelector(".popup__form-container_add-form"),
  addNameInput = addFormElement.querySelector(".popup__input_add_name"),
  addUrlInput = addFormElement.querySelector(".popup__input_add_url"),
  cardTemplate = document.querySelector("#card-template"),
  cardsElement = document.querySelector(".elements"),
  popupImagePreview = document.querySelector(".popup__image-preview"),
  popupImage = document.querySelector(".popup__image"),
  popupImageName = document.querySelector(".popup__image-name"),
  cards = [
    {
      name: "Архыз",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link:
        "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
  ];

function setPopupToInitialState() {
  addFormElement.classList.remove("popup__form-container_visible");
  editFormElement.classList.remove("popup__form-container_visible");
  popupImagePreview.classList.remove("popup__image-preview_visible");
}

//обработка открытия popup
function showPopup() {
  setPopupToInitialState();
  popup.classList.add("popup_opened");
}

//обработка закрытия popup
function closePopup() {
  const inputErrors = Array.from(popup.querySelectorAll(".popup__input-error"));
  inputErrors.forEach((element) => {
    element.textContent = "";
    element.classList.remove("popup__input-error_active");
  });

  popup.classList.remove("popup_opened");
}

//нажатие на лайк
function toggleLike(evt) {
  evt.target.classList.toggle("element__like_liked");
}

function removeCard(cardElement) {
  cardElement.remove();
}

//показать картинку карточки
function showPreview(card) {
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupImageName.textContent = card.name;

  showPopup();
  popupImagePreview.classList.add("popup__image-preview_visible");
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
  removeButton.addEventListener("click", (evt) => {
    removeCard(evt.target.closest(".element"));
  });
  //обработка нажатия на кнопку "нравится"
  const likeButton = cardElement.querySelector(".element__like");
  likeButton.addEventListener("click", toggleLike);
  cardsElement.prepend(cardElement);
}

//открытие формы редактирования профиля
function openEditForm() {
  editNameInput.value = nameElement.textContent;
  editPositionInput.value = positionElement.textContent;

  const sumbitButton = editFormElement.querySelector(".popup__save-button");
  sumbitButton.classList.remove("popup__save-button_disabled");
  sumbitButton.removeAttribute("disabled");

  showPopup();
  editFormElement.classList.add("popup__form-container_visible");
}

//открытие формы добавления изображения
function openAddForm() {
  addNameInput.value = "";
  addUrlInput.value = "";

  const sumbitButton = addFormElement.querySelector(".popup__save-button");
  sumbitButton.classList.add("popup__save-button_disabled");
  sumbitButton.setAttribute("disabled", true);

  showPopup();
  addFormElement.classList.add("popup__form-container_visible");
}

//Обработка сохрания данных формы
function editFormSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = editNameInput.value;
  positionElement.textContent = editPositionInput.value;
  closePopup();
}

//добавление карточки
function addCard(card) {
  renderCard(card);
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();

  const newCard = {
    name: addNameInput.value,
    link: addUrlInput.value,
  };

  addCard(newCard);
  closePopup();
}

addButton.addEventListener("click", openAddForm);
editButton.addEventListener("click", openEditForm);
closeButton.addEventListener("click", closePopup);
editFormElement.addEventListener("submit", editFormSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);
//закрытие формы через escape
document.addEventListener("keydown", (evt) => {
  const escapeCode = 27;
  if (evt.keyCode === escapeCode) {
    closePopup();
  }
});

cards.forEach(renderCard);
