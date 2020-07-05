import Card from './card.js';
import FormValidator from './FormValidator.js';

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
  cardsElement = document.querySelector(".elements"),
  formList = Array.from(document.querySelectorAll('.popup__form-container')),
  escapeCode = 27,
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
  ],
  configObject = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorSelector: ".popup__input-error",
    inputContainerSelector: ".popup__form-field",
    errorClass: "popup__input-error_active"
  };

//Объекты валидации для каждой формы
const editFormValidation = new FormValidator(configObject, editFormElement);
const addFormValidation = new FormValidator(configObject, addFormElement);

const closePopupByClick = (evt) => {
  if (!evt.target.closest(".popup__content-container")) {
    closePopup();
  }
};

const closePopupByEsc = (evt) => {
  if (evt.keyCode === escapeCode) {
    closePopup();
  }
}

const hideAllContent = () => {
  Array.from(popup.querySelectorAll(".popup__content-container")).forEach((container) => {
    container.classList.remove("popup__content-container_visible");
  });
}

//обработка открытия popup
function showPopup(elementToShow) {
  const popupContentContainer = elementToShow.closest(".popup__content-container");

  hideAllContent();
  popup.classList.add("popup_opened");
  popupContentContainer.classList.add("popup__content-container_visible");

  //обработчики закрытия формы
  document.addEventListener("keydown", closePopupByEsc);
  popup.addEventListener("click", closePopupByClick);
}

//обработка закрытия popup
function closePopup() {
  popup.classList.remove("popup_opened");

  document.removeEventListener("keydown", closePopupByEsc);
  popup.removeEventListener("click", closePopupByClick);
}

//открытие формы редактирования профиля
function openEditForm() {
  editNameInput.value = nameElement.textContent;
  editPositionInput.value = positionElement.textContent;

  editFormValidation.resetValidation();
  showPopup(editFormElement);
}

//открытие формы добавления изображения
function openAddForm() {
  addNameInput.value = "";
  addUrlInput.value = "";

  addFormValidation.resetValidation();
  showPopup(addFormElement);
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
  const cardObject = new Card(card, '#card-template', showPopup);
  const cardElement = cardObject.generateCard();
  cardsElement.prepend(cardElement);
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
closeButton.addEventListener("click", () => {
  closePopup();
});
editFormElement.addEventListener("submit", editFormSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);

cards.forEach((card) => {
  const cardObject = new Card(card, '#card-template', showPopup);
  const cardElement = cardObject.generateCard();
  cardsElement.prepend(cardElement);
});

editFormValidation.enableValidation();
addFormValidation.enableValidation();
