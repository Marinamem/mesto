import { initialCards, config } from "../scripts/constans.js";
import { FormValidator } from "../scripts/FormValidator.js";
import { Card } from "../scripts/Card.js";
import { PopupWithImage } from "../scripts/PopupWithImage.js";
import { UserInfo } from "../scripts/UserInfo.js";
import { PopupWithForm } from "../scripts/PopupWithForm.js";
import { Section } from "../scripts/Section.js";

//edit popup

const nameInput = document.querySelector(".popup__input_info_name");
const jobInput = document.querySelector(".popup__input_info_job");
const buttonEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const formElementEdit = document.querySelector(".popup__form_type_edit");

//add popup
const formElementAdd = document.querySelector(".popup__form_type_add");
const buttonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_add");
const imageInput = document.querySelector(".popup__input_place_name");
const linkInput = document.querySelector(".popup__input_place_link");
//cards block
const cardsList = document.querySelector(".elements__list");

//form
const addCardValidate = new FormValidator(config, popupAdd);
addCardValidate.enableValidation();

const profileEditValidate = new FormValidator(config, popupEdit);
profileEditValidate.enableValidation();

const popupWithImage = new PopupWithImage(".popup_type_open-image");
popupWithImage.setEventListeners();

const openImagePopup = (image, link) => {
  popupWithImage.open(image, link);
};

const profileSelectors = {
  profileNameSelector: ".profile__info-name",
  profileJobSelector: ".profile__info-job",
};

const userInfo = new UserInfo(profileSelectors);

const popupEditProfile = new PopupWithForm(
  {
    handleFormSubmit: (userData) => {
      userInfo.setUserInfo(userData);
    },
  },
  ".popup_type_edit"
);
popupEditProfile.setEventListeners();

//CREATE ELEMENT
const createElement = (element) => {
  const cardElement = new Card(element, "#element__card", openImagePopup);
  const card = cardElement.createCard();
  return card;
};

const popupAddCard = new PopupWithForm(
  {
    handleFormSubmit: (data) => {
      const newCard = {
        name: data[imageInput.name],
        link: data[linkInput.name],
      };
      const cardAddElement = createElement(newCard);
      cardSection.addItem(cardAddElement);
    },
  },
  ".popup_type_add"
);
popupAddCard.setEventListeners();

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardSection.addItem(createElement(item));
    },
  },
  cardsList
);
cardSection.renderItems();

buttonEdit.addEventListener("click", () => {
  popupEditProfile.open();
  const inputValues = userInfo.getUserInfo();
  nameInput.value = inputValues.name;
  jobInput.value = inputValues.job;
  const event = new Event("input");
  nameInput.dispatchEvent(event);
  jobInput.dispatchEvent(event);
});

buttonAdd.addEventListener("click", () => {
  popupAddCard.open();
  addCardValidate.disableSubmitButton();
});
