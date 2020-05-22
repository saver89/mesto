const editButton = document.querySelector(".profile__edit-button"),
  closeButton = document.querySelector(".popup__close-button"),
  formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__input_edit_name"),
  positionInput = document.querySelector(".popup__input_edit_position"),
  nameElement = document.querySelector(".profile__name"),
  positionElement = document.querySelector(".profile__position");;

//обработка открытия/закрытия окна редактирования
function toggleEditForm() {
  const popup = document.querySelector(".popup");

  if (!popup.classList.contains("popup_opened")) {
    const nameValue = nameElement.textContent,
      positionValue = positionElement.textContent;

    nameInput.value = nameValue;
    positionInput.value = positionValue;
  }

  popup.classList.toggle("popup_opened");
}

//Обработка сохрания данных формы
function formSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = nameInput.value;
  positionElement.textContent = positionInput.value;
  toggleEditForm();
}

editButton.addEventListener("click", toggleEditForm);
closeButton.addEventListener("click", toggleEditForm);
formElement.addEventListener("submit", formSubmitHandler);
