import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

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
  popup.addEventListener("mousedown", closePopupByClick);
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

initialCards.forEach((card) => {
  const cardObject = new Card(card, '#card-template', showPopup);
  const cardElement = cardObject.generateCard();
  cardsElement.prepend(cardElement);
});

editFormValidation.enableValidation();
addFormValidation.enableValidation();
