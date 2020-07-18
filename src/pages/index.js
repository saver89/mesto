import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirm from "../components/PopupConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  configObject,
  editFormElement,
  addFormElement,
  cardsElementSelector,
  addPopupSelector,
  editPopupSelector,
  confirmPopupSelector,
  addButton,
  editButton,
  nameSelector,
  aboutSelector,
  avatarSelector,
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
  elementRemoveVisibleClass,
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
let userInfo;
const successUserInfoHandler = (info) => {
  userInfo = new UserInfo({
    nameSelector,
    aboutSelector,
    avatarSelector
  }, info);
};
const errorUserInfoHandler = (err) => {
  console.log(err);
};


//Попап отображения изображения
const popupWithImage = new PopupWithImage({
  popupSelector: ".popup_image-preview",
  closeButtonSelector,
  popupImageSelector,
  popupImageNameSelector
});

let cardsSection;
//Отрисовка карточек в случае успешного получения ответа
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

//Добавление объекта карточки и отрисовка в секции
function addCard(card, isAdded = false) {
  const cardObject = new Card(
    card,
    {
      cardSelector: "#card-template",
      likeSelector: elementLikeSelector,
      likedClass: elementLikedClass,
      imageSelector: elementImageSelector,
      removeSelector: elementRemoveSelector,
      removeVisibleClass: elementRemoveVisibleClass,
      nameSelector: elementNameSelector,
      likeCounterSelector: elementLikeCounterSelector,
      elementSelector,
    },
    {
      handleCardClick: (name, link) => {
        popupWithImage.open(name, link);
      },
      handleRemoveClick: () => {
        popupConfirmForm.open(cardObject);
      }
    }

  );
  const cardElement = cardObject.generateCard(userInfo.getUserId());
  cardsSection.addItem(cardElement, isAdded);
}

const addSubmitHandler = (evt, card) => {
  evt.preventDefault();

  api.postCard(card).then((postedCard) => {
    addCard(postedCard, true);
  }).catch((err) => {
    console.log(err);
  });
};

const editSumbitHandler = (evt, info) => {
  evt.preventDefault();

  api.editUserInfo(info).then(() => {
    userInfo.setUserInfo(info);
  }).catch(err => {
    console.log(err);
  });
};

const removeSubmitHandler = (evt, card) => {
  evt.preventDefault();

  api.removeCard(card.getId()).then(res => {
    card.hideCard();
  }).catch(err => {
    console.log(err);
  });
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

//Попап подтверждения
const popupConfirmForm = new PopupConfirm(
  { popupSelector: confirmPopupSelector, closeButtonSelector, formSelector },
  (evt, card) => {
    removeSubmitHandler(evt, card);
  }
);

const setEventListeners = () => {
  popupWithImage.setEventListeners();
  popupAddForm.setEventListeners();
  popupEditForm.setEventListeners();
  popupConfirmForm.setEventListeners();
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

api.getUserInfo()
  .then((info) => {
    successUserInfoHandler(info);

    api.getInitialsCards()
      .then(successInitialCardsHandler)
      .catch(errorInitialCardsHandler);
  })
  .catch(errorUserInfoHandler);
