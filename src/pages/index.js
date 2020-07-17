import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  configObject,
  editFormElement,
  addFormElement,
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
  popupImageNameSelector,
  elementLikedClass,
  elementLikeSelector,
  elementLikeCounterSelector,
  elementImageSelector,
  elementRemoveSelector,
  elementNameSelector,
  elementSelector
} from "../utils/constants.js";

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-13", {
  authorization: "d0402095-4250-4903-b400-52c8ec468fa5",
});

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

//Отрисовка карточек в случае успешного получения ответа
let cardsSection;
const successInitialCardsHandler = (initialCards) => {
  cardsSection = new Section(
    {
      items: initialCards,
      renderer: (card) => {
        addCard(card);
      },
    },
    cardsElementSelector
  );

  cardsSection.renderItems();
};
//Вывод ошибки в случае неуспешного ответа
const errorInitialCardsHandler = (err) => {
  console.log(err);
}
api.getInitialsCards(successInitialCardsHandler, errorInitialCardsHandler);


//Добавление объекта карточки и отрисовка в секции
function addCard(card) {
  const cardObject = new Card(
    card,
    {
      cardSelector: "#card-template",
      likeSelector: elementLikeSelector,
      likedClass: elementLikedClass,
      imageSelector: elementImageSelector,
      removeSelector: elementRemoveSelector,
      nameSelector: elementNameSelector,
      likeCounterSelector: elementLikeCounterSelector,
      elementSelector,
    },
    (name, link) => {
      popupWithImage.open(name, link);
    }
  );
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
