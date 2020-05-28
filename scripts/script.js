const editButton = document.querySelector(".profile__edit-button"),
  addButton = document.querySelector(".profile__add-button"),
  nameElement = document.querySelector(".profile__name"),
  positionElement = document.querySelector(".profile__position"),
  popup = document.querySelector(".popup"),
  closeButton = popup.querySelector(".popup__close-button"),
  editFormElement = popup.querySelector(".popup__form-container_edit-form"),
  editNameInput = editFormElement.querySelector(".popup__input_edit_name"),
  editPositionInput = editFormElement.querySelector(
    ".popup__input_edit_position"
  ),
  addFormElement = popup.querySelector(".popup__form-container_add-form"),
  addNameInput = addFormElement.querySelector(".popup__input_add_name"),
  addUrlInput = addFormElement.querySelector(".popup__input_add_url"),
  cardTemplate = document.querySelector("#card-template");
  cardsElement = document.querySelector(".elements");
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

function renderCards() {
  cards.forEach((card)=> {
    const cardElement = cardTemplate.content.cloneNode(true);
    const imageElement = cardElement.querySelector(".element__image");
    imageElement.src = card.link;
    imageElement.alt = card.name;
    cardElement.querySelector(".element__name").textContent = card.name;

    cardsElement.append(cardElement);
  })
}

//обработка открытия/закрытия popup
function togglePopup() {
  popup.classList.toggle("popup_opened");
}

//открытие формы редактирования профиля
function openEditForm() {
  editNameInput.value = nameElement.textContent;
  editPositionInput.value = positionElement.textContent;
  editFormElement.classList.add("popup__form-container_visible");
  addFormElement.classList.remove("popup__form-container_visible");

  togglePopup();
}

//открытие формы добавления изображения
function openAddForm() {
  addFormElement.value = "";
  addUrlInput.value = "";
  editFormElement.classList.remove("popup__form-container_visible");
  addFormElement.classList.add("popup__form-container_visible");

  togglePopup();
}

//Обработка сохрания данных формы
function editFormSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = editNameInput.value;
  positionElement.textContent = editPositionInput.value;
  togglePopup();
}

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  togglePopup();
}

editButton.addEventListener("click", openEditForm);
addButton.addEventListener("click", openAddForm);
closeButton.addEventListener("click", togglePopup);
editFormElement.addEventListener("submit", editFormSubmitHandler);
addFormElement.addEventListener("submit", addFormSubmitHandler);
//закрытие формы через escape
document.addEventListener("keydown", function (evt) {
  const escapeCode = 27;
  if (evt.keyCode == escapeCode) {
    popup.classList.remove("popup_opened");
  }
});

renderCards();
