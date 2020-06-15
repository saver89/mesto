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
  ];

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

  showPopup(popupImagePreview);
}

function renderCard(card) {
  const cardElement = cardTemplate.content.cloneNode(true);
  const imageElement = cardElement.querySelector(".element__image");
  const removeButton = cardElement.querySelector(".element__remove");
  const likeButton = cardElement.querySelector(".element__like");

  imageElement.src = card.link;
  imageElement.alt = card.name;
  cardElement.querySelector(".element__name").textContent = card.name;

  //обработка вывода изображения карточки
  imageElement.addEventListener("click", () => {
    showPreview(card);
  });
  //обработка удаления карточки
  removeButton.addEventListener("click", (evt) => {
    removeCard(evt.target.closest(".element"));
  });
  //обработка нажатия на кнопку "нравится"
  likeButton.addEventListener("click", toggleLike);
  return cardElement;
}

//открытие формы редактирования профиля
function openEditForm() {
  editNameInput.value = nameElement.textContent;
  editPositionInput.value = positionElement.textContent;

  resetValidation(editFormElement);
  showPopup(editFormElement);
}

//открытие формы добавления изображения
function openAddForm() {
  addNameInput.value = "";
  addUrlInput.value = "";

  resetValidation(addFormElement);
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
  const cardElement = renderCard(card);
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
  const cardElement = renderCard(card);
  cardsElement.prepend(cardElement);
});
