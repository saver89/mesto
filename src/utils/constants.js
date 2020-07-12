export const initialCards = [
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
  editButton = document.querySelector(".profile__edit-button"),
  addButton = document.querySelector(".profile__add-button"),
  nameSelector = ".profile__name",
  positionSelector = ".profile__position",
  closeButtonSelector = ".popup__close-button",
  editFormElement = document.querySelector(".popup__form-container_edit-form"),
  addFormElement = document.querySelector(".popup__form-container_add-form"),
  formSelector = ".popup__form-container",
  addPopupSelector = ".popup_add-form",
  editPopupSelector = ".popup_edit-form",
  formInputSelector = ".popup__input",
  cardsElementSelector = ".elements",
  escapeCode = 27,
  configObject = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save-button",
    inactiveButtonClass: "popup__save-button_disabled",
    inputErrorSelector: ".popup__input-error",
    inputContainerSelector: ".popup__form-field",
    errorClass: "popup__input-error_active",
  };
