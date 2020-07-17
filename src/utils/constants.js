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
  editFormElement = document.forms["edit-form"],
  addFormElement = document.forms["add-form"],
  updateAvatarFormElement = document.forms["update-avatar-form"],
  confrimFormElement = document.forms["confrim-form"],
  formSelector = ".popup__form-container",
  addPopupSelector = ".popup_add-form",
  editPopupSelector = ".popup_edit-form",
  updateAvatarPopupSelector = ".popup_update-avatar",
  confirmPopupSelector = ".popup_confirm",
  formInputSelector = ".popup__input",
  cardsElementSelector = ".elements",
  popupImageSelector = '.popup__image',
  popupImageNameSelector = '.popup__image-name',
  escapeCode = 27,
  configObject = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit-button",
    inactiveButtonClass: "popup__submit-button_disabled",
    inputErrorSelector: ".popup__input-error",
    inputContainerSelector: ".popup__form-field",
    errorClass: "popup__input-error_active",
  };
