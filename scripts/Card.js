import { openPopup } from "./index.js";

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._popupImage = document.querySelector(".popup_type_open-image");
    this._fullImage = this._popupImage.querySelector(".popup__picture");
    this._fullText = this._popupImage.querySelector(".popup__text");
  }

  _getTemplate() {
    const templateCard = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    this._newCard = templateCard;
    return templateCard;
  }

  _setData() {
    this._textElement.textContent = this._name;

    this._imageElement.src = this._link;
    this._imageElement.alt = this._name;
  }

  _handleDeleteCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  _handleLikeCard() {
    const buttonLikeElement = this._newCard.querySelector(".element__like");
    buttonLikeElement.classList.toggle("element__like-active");
  }
  _fullImagePopup() {
    openPopup(this._popupImage);
    this._fullImage.src = this._imageElement.src;
    this._fullImage.alt = this._textElement.textContent;
    this._fullText.textContent = this._textElement.textContent;
  }
  _setListeners() {
    const buttonDelElement = this._newCard.querySelector(".element__delete");
    buttonDelElement.addEventListener(
      "click",
      this._handleDeleteCard.bind(this)
    );
    const buttonLikeElement = this._newCard.querySelector(".element__like");
    buttonLikeElement.addEventListener("click", () => {
      this._handleLikeCard();
    });

    this._imageElement.addEventListener(
      "click",
      this._fullImagePopup.bind(this)
    );
  }

  getView() {
    this._newCard = this._getTemplate();
    this._textElement = this._newCard.querySelector(".element__title");
    this._textElement.textContent = this._name;
    this._imageElement = this._newCard.querySelector(".element__image");
    this._setData();
    this._setListeners();

    return this._newCard;
  }
}
export default Card;
