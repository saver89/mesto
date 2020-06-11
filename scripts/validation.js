const showInputError = (inputElement, errorMessage, inputContainerSelector, inputErrorSelector, errorClass) => {
  const errorElement = inputElement.closest(inputContainerSelector).querySelector(inputErrorSelector);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (inputElement, inputContainerSelector, inputErrorSelector, errorClass) => {
  const errorElement = inputElement.closest(inputContainerSelector).querySelector(inputErrorSelector);
  inputElement.classList.remove(inputErrorSelector);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (inputElement, inputContainerSelector, inputErrorSelector, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputElement.validationMessage, inputContainerSelector, inputErrorSelector, errorClass);
  } else {
    hideInputError(inputElement, inputContainerSelector, inputErrorSelector, errorClass);
  }
};

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", true);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setEventListeners = (formElement, configObject) => {
  const inputList = Array.from(formElement.querySelectorAll(configObject.inputSelector));
  const buttonElement = formElement.querySelector(configObject.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, configObject.inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(inputElement, configObject.inputContainerSelector, configObject.inputErrorSelector, configObject.errorClass);
      toggleButtonState(inputList, buttonElement, configObject.inactiveButtonClass);
    });
  });
};

const enableValidation = (configObject) => {
  const formList = Array.from(
    document.querySelectorAll(configObject.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, configObject);
  });
};

enableValidation({
  formSelector: ".popup__form-container",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorSelector: ".popup__input-error",
  inputContainerSelector: ".popup__form-field",
  errorClass: "popup__input-error_active",
});
