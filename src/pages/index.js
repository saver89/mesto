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
  cardsElementSelector,
  addPopupSelector,
  editPopupSelector,
  confirmPopupSelector,
  updateAvatarPopupSelector,
  nameSelector,
  aboutSelector,
  avatarSelector,
  closeButtonSelector,
  submitButtonSelector,
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

const editButton = document.querySelector(".profile__edit-button"),
  addButton = document.querySelector(".profile__add-button"),
  avatarButton = document.querySelector(".profile__avatar-edit"),
  editFormElement = document.forms["edit-form"],
  addFormElement = document.forms["add-form"],
  updateAvatarFormElement = document.forms["update-avatar-form"];

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-13", {
  authorization: "d0402095-4250-4903-b400-52c8ec468fa5",
});

//Объекты валидации для каждой формы
const editFormValidation = new FormValidator(configObject, editFormElement);
const addFormValidation = new FormValidator(configObject, addFormElement);
const avatarFormValidation = new FormValidator(configObject, updateAvatarFormElement);

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
      },
      handleLikeClick: () => {
        const cardLiked = cardObject.isLiked(userInfo.getUserId());
        const apiResult = cardLiked ? api.unlikeCard(cardObject.getId()) : api.likeCard(cardObject.getId());

        apiResult.then((cardResponse) => {
          cardObject.setLikes(cardResponse.likes);
          cardObject.renderLike(userInfo.getUserId());
        }).catch(err => {
          console.log(err);
        });
      }
    }

  );
  const cardElement = cardObject.generateCard(userInfo.getUserId());
  cardsSection.addItem(cardElement, isAdded);
}

//Обработчики событий "submit" форм
const addSubmitHandler = (evt, card) => {
  evt.preventDefault();

  popupAddForm.editSubmitText("Сохранение...");
  api.postCard(card).then((postedCard) => {
    addCard(postedCard, true);
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    popupAddForm.close();
    popupAddForm.resetSubmitText();
  });
};

const editSumbitHandler = (evt, info) => {
  evt.preventDefault();

  popupEditForm.editSubmitText("Сохранение...");
  api.editUserInfo(info).then(() => {
    userInfo.setUserInfo(info);
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    popupEditForm.close();
    popupEditForm.resetSubmitText();
  });
};

const removeSubmitHandler = (evt, card) => {
  evt.preventDefault();

  popupConfirmForm.editSubmitText("Сохранение...")
  api.removeCard(card.getId()).then(() => {
    card.hideCard();
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    popupConfirmForm.close();
    popupConfirmForm.resetSubmitText();
  });
};

const avatarSumbitHandler = (evt, {link}) => {
  evt.preventDefault();

  popupAvatarForm.editSubmitText("Сохранение...");
  api.editAvatar(link).then(() => {
    userInfo.setUserAvatar(link);
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    popupAvatarForm.close();
    popupAvatarForm.resetSubmitText();
  });
};

//Попап добавления карточки
const popupAddForm = new PopupWithForm(
  { popupSelector: addPopupSelector, closeButtonSelector, formSelector, formInputSelector, submitButtonSelector },
  addSubmitHandler,
  () => {
    addFormValidation.resetValidation();
  }
);

//Попап редактирования данных пользователя
const popupEditForm = new PopupWithForm(
  { popupSelector: editPopupSelector, closeButtonSelector, formSelector, formInputSelector, submitButtonSelector },
  editSumbitHandler,
  () => {
    editFormValidation.resetValidation()
  }
);

//Попап подтверждения
const popupConfirmForm = new PopupConfirm(
  { popupSelector: confirmPopupSelector, closeButtonSelector, formSelector, submitButtonSelector },
  (evt, card) => {
    removeSubmitHandler(evt, card);
  }
);

//Попап редактирования аватара пользователя
const popupAvatarForm = new PopupWithForm(
  { popupSelector: updateAvatarPopupSelector, closeButtonSelector, formSelector, formInputSelector, submitButtonSelector },
  avatarSumbitHandler,
  () => {
    avatarFormValidation.resetValidation()
  }
);

const setEventListeners = () => {
  popupWithImage.setEventListeners();
  popupAddForm.setEventListeners();
  popupEditForm.setEventListeners();
  popupConfirmForm.setEventListeners();
  popupAvatarForm.setEventListeners();

  editButton.addEventListener("click", () => {
    const info = userInfo.getUserInfo();
    popupEditForm.open(info);
  });
  addButton.addEventListener("click", () => {
    popupAddForm.open({ name: "", link: "" });
  });
  avatarButton.addEventListener("click", () => {
    popupAvatarForm.open({ link: userInfo.getUserAvatar() });
  });
};

setEventListeners();
editFormValidation.enableValidation();
addFormValidation.enableValidation();
avatarFormValidation.enableValidation();

//Получение информации из апи
api.getUserInfo()
  .then((info) => {
    successUserInfoHandler(info);

    api.getInitialsCards()
      .then(successInitialCardsHandler)
      .catch(errorInitialCardsHandler);
  })
  .catch(errorUserInfoHandler);
