import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(image, link) {
    const descriptionImagePopup = this._popup.querySelector(".popup__text");
    const imgElementPopup = this._popup.querySelector(".popup__picture");
    imgElementPopup.src = link;
    imgElementPopup.alt = image;
    descriptionImagePopup.textContent = image;
    super.open();
  }
}
