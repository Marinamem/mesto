export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const templateCard = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return templateCard;
  }

  createCard() {
    this._card = this._getTemplate();
    this._card.querySelector(".element__title").textContent = this._name;
    this._card.querySelector(".element__image").src = this._link;
    this._card.querySelector(".element__image").alt = this._name;
    this._setEventListeners();
    return this._card;
  }

  _handleLikeCard() {
    this._card
      .querySelector(".element__like")
      .classList.toggle("element__like-active");
  }
  _handleDeleteCard() {
    this._card = null;
  }

  _setEventListeners() {
    this._card.querySelector(".element__like").addEventListener("click", () => {
      this._handleLikeCard();
    });
    this._card
      .querySelector(".element__delete")
      .addEventListener("click", () => {
        this._card.remove();
      });
    this._card
      .querySelector(".element__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }
}
