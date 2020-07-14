import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {
  configObject,
  editFormElement,
  addFormElement,
  initialCards,
  cardsElementSelector,
  addPopupSelector,
  editPopupSelector,
  addButton,
  editButton,
  nameSelector,
  positionSelector,
  closeButtonSelector,
  formSelector,
  formInputSelector,
  popupImageSelector,
  popupImageNameSelector
} from "../utils/constants.js";

//Объекты валидации для каждой формы
const editFormValidation = new FormValidator(configObject, editFormElement);
const addFormValidation = new FormValidator(configObject, addFormElement);

//информация о пользователе
const userInfo = new UserInfo({
  nameSelector: nameSelector,
  positionSelector: positionSelector,
});

//Попап отображения изображения
const popupWithImage = new PopupWithImage({
  popupSelector: ".popup_image-preview",
  closeButtonSelector,
  popupImageSelector,
  popupImageNameSelector
});

//Список карточек
const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (card) => {
      addCard(card);
    },
  },
  cardsElementSelector
);

//Добавление объекта карточки и отрисовка в секции
function addCard(card) {
  const cardObject = new Card(card, "#card-template", (name, link) => {
    popupWithImage.open(name, link);
  });
  const cardElement = cardObject.generateCard();
  cardsSection.addItem(cardElement);
}

const addSubmitHandler = (evt, card) => {
  evt.preventDefault();

  addCard(card);
};

const editSumbitHandler = (evt, info) => {
  evt.preventDefault();

  userInfo.setUserInfo(info);
};

//Попап добавления карточки
const popupAddForm = new PopupWithForm(
  { popupSelector: addPopupSelector, closeButtonSelector, formSelector, formInputSelector },
  addSubmitHandler,
  () => {
    addFormValidation.resetValidation();
  }
);

//Попап редактирования данных пользователя
const popupEditForm = new PopupWithForm(
  { popupSelector: editPopupSelector, closeButtonSelector, formSelector, formInputSelector },
  editSumbitHandler,
  () => {
    editFormValidation.resetValidation()
  }
);

const setEventListeners = () => {
  popupWithImage.setEventListeners();
  popupAddForm.setEventListeners();
  popupEditForm.setEventListeners();
};

editButton.addEventListener("click", () => {
  const info = userInfo.getUserInfo();
  popupEditForm.open(info);
});
addButton.addEventListener("click", () => {
  popupAddForm.open({ name: "", link: "" });
});

setEventListeners();
editFormValidation.enableValidation();
addFormValidation.enableValidation();
cardsSection.renderItems();
