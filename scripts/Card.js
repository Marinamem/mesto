import { openPopup } from "./index.js";

class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const templateCard = document
      .querySelector("#element__card")
      .content.querySelector(".element")
      .cloneNode(true);
    this._newCard = templateCard;
    return templateCard;
  }

  _setData() {
    const textElement = this._newCard.querySelector(".element__title");
    textElement.textContent = this._name;
    const imageElement = this._newCard.querySelector(".element__image");
    imageElement.src = this._link;
    imageElement.alt = this._name;
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
    const textElement = this._newCard.querySelector(".element__title");
    const popupImage = document.querySelector(".popup_type_open-image");
    const fullImage = popupImage.querySelector(".popup__picture");
    const fullText = popupImage.querySelector(".popup__text");
    const imageElement = this._newCard.querySelector(".element__image");
    openPopup(popupImage);
    fullImage.src = imageElement.src;
    fullImage.alt = textElement.textContent;
    fullText.textContent = textElement.textContent;
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
    const imageElement = this._newCard.querySelector(".element__image");
    imageElement.addEventListener("click", this._fullImagePopup.bind(this));
  }

  getView() {
    this._newCard = this._getTemplate();
    this._setData();
    this._setListeners();

    return this._newCard;
  }
}
export default Card;
