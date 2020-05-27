const editButton = document.querySelector(".profile__edit-button"),
  addButton = document.querySelector(".profile__add-button");
  nameElement = document.querySelector(".profile__name"),
  positionElement = document.querySelector(".profile__position"),
  popup = document.querySelector(".popup"),
  closeButton = popup.querySelector(".popup__close-button"),
  editFormElement = popup.querySelector(".popup__form-container_edit-form"),
  editNameInput = editFormElement.querySelector(".popup__input_edit_name"),
  editPositionInput = editFormElement.querySelector(".popup__input_edit_position"),
  addFormElement = popup.querySelector(".popup__form-container_add-form"),
  addNameInput = addFormElement.querySelector(".popup__input_add_name"),
  addUrlInput = addFormElement.querySelector(".popup__input_add_url");

//обработка открытия/закрытия окна редактирования
function togglePopup() {
  popup.classList.toggle("popup_opened");
}

function openEditForm() {
  editNameInput.value = nameElement.textContent;
  editPositionInput.value = positionElement.textContent;
  editFormElement.classList.add("popup__form-container_visible");
  addFormElement.classList.remove("popup__form-container_visible");

  togglePopup();
}

function openAddForm() {
  addFormElement.value = "";
  addUrlInput.value = "";
  editFormElement.classList.remove("popup__form-container_visible");
  addFormElement.classList.add("popup__form-container_visible");

  togglePopup();
}

//Обработка сохрания данных формы
function editformSubmitHandler(evt) {
  evt.preventDefault();

  nameElement.textContent = editNameInput.value;
  positionElement.textContent = editPositionInput.value;
  togglePopup();
}


editButton.addEventListener("click", openEditForm);
addButton.addEventListener("click", openAddForm);
closeButton.addEventListener("click", togglePopup);
editFormElement.addEventListener("submit", editformSubmitHandler);
addFormElement.addEventListener("submit", editformSubmitHandler);
//закрытие формы через escape
document.addEventListener("keydown", function(evt) {
  if (evt.keyCode == 27) {
    popup.classList.remove("popup_opened");
  }
});
