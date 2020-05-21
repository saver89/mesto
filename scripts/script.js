function openEditForm() {
  const popup = document.querySelector(".popup");
  popup.classList.add("popup_opened");

  const nameValue = document.querySelector(".profile__name").textContent,
    positionValue = document.querySelector(".profile__position").textContent;

  let nameInput = document.querySelector(".popup__input_edit_name"),
    positionInput = document.querySelector(".popup__input_edit_position");

  nameInput.value = nameValue;
  positionInput.value = positionValue;
}

const editButton = document.querySelector(".profile__edit-button");
editButton.addEventListener("click", openEditForm);

function closeForm() {
  const popup = document.querySelector(".popup");
  popup.classList.remove("popup_opened");
}
const closeButton = document.querySelector(".popup__close-button");
closeButton.addEventListener("click", closeForm);

let formElement = document.querySelector(".popup__container");

function formSubmitHandler(evt) {
  evt.preventDefault();

  let nameInput = document.querySelector(".popup__input_edit_name"),
    positionInput = document.querySelector(".popup__input_edit_position");

  let nameValue = nameInput.value,
    positionValue = positionInput.value;

  const nameElement = document.querySelector(".profile__name"),
    positionElement = document.querySelector(".profile__position");

  nameElement.textContent = nameValue;
  positionElement.textContent = positionValue;
  closeForm();
}

formElement.addEventListener("submit", formSubmitHandler);
