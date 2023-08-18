class FormValidator {
  constructor(config, templateSelector) {
    this.config = config;
    this._templateSelector = templateSelector;
    this._formSelector = config._formSelector;
    this._inputSelector = config._inputSelector;
    this._submitButtonSelector = config._submitButtonSelector;
    this._inactiveButtonClass = config._inactiveButtonClass;
    this._inputErrorClass = config._inputErrorClass;
    this._errorClass = config._errorClass;
  }

  enableValidation() {}
}
