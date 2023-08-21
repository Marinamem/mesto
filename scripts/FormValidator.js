class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputSelector = config.inputSelector;

    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._config.inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.submitButtonSelector
    );
  }

  _showInputError(input) {
    const errorElement = this._formElement.querySelector(
      `#${input.name}-error`
    );
    input.classList.add(this._inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(input) {
    const errorElement = this._formElement.querySelector(
      `#${input.name}-error`
    );
    input.classList.remove(this._inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._errorClass);
  }

  _isValid(input) {
    if (!input.validity.valid) {
      this._showInputError(input);
    } else {
      this._hideInputError(input);
    }
  }

  _hasInvalidValue() {
    return this._inputs.some((input) => !input.validity.valid);
  }
  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  }
  _toggleButtonState() {
    if (this._hasInvalidValue()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;
