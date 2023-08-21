import Card from "../scripts/Card.js";
import FormValidator from "../scripts/FormValidator.js";
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];
const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
};

const formElementEdit = document.querySelector(".popup__form_type_profile");
const nameInput = document.querySelector(".popup__input_info_name");
const jobInput = document.querySelector(".popup__input_info_job");
const editButton = document.querySelector(".profile__edit-button");
const saveButton = document.querySelector(".popup__save-button");
const popupEdit = document.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-job");
const formElementAdd = document.querySelector(".popup__form_type_add");
const placeNameInput = formElementAdd.querySelector(".popup__input_place_name");
const placeLinkInput = formElementAdd.querySelector(".popup__input_place_link");
const cardsList = document.querySelector(".elements__list");
const buttonAdd = document.querySelector(".profile__add-button");
const templateElement = document
  .querySelector("#element__card")
  .content.querySelector(".element");
const popupAdd = document.querySelector(".popup_type_add");
const popupImage = document.querySelector(".popup_type_open-image");
const fullImage = document.querySelector(".popup__picture");
const fullText = document.querySelector(".popup__text");
const buttonSubmit = formElementAdd.querySelector(config.submitButtonSelector);
// открытие попапа
const openPopup = function (modal) {
  modal.classList.add("popup_opened");
  document.addEventListener("keydown", handleCloseByEsc);
};

//закрытие попапа на esc
const closePopup = function (modal) {
  modal.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleCloseByEsc);
};

//кнопка изменения данных
editButton.addEventListener("click", function () {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  let event = new Event("input");
  nameInput.dispatchEvent(event);
  jobInput.dispatchEvent(event);
});

//клик на попапедит
popupEdit.addEventListener("click", handleCloseByClick);

//заполнение попапедит
function handleFormSubmitPopupEdit(evt) {
  evt.preventDefault(); //
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}

//слушатель формы
formElementEdit.addEventListener("submit", handleFormSubmitPopupEdit);

//попап добавления
buttonAdd.addEventListener("click", function () {
  formElementAdd.reset();

  openPopup(popupAdd);
});

//клик закрытия попададд
popupAdd.addEventListener("click", handleCloseByClick);

// карточки

//рендер карточек

function renderCard(data) {
  const card = new Card(data.name, data.link, "#element__card");
  cardsList.prepend(card.getView());
}
initialCards.forEach(function (data) {
  renderCard(data, cardsList);
});
//Функция сохранения данных карточки
formElementAdd.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameValue = placeNameInput.value;
  const imageValue = placeLinkInput.value;
  renderCard({ name: nameValue, link: imageValue }, cardsList);
  formElementAdd.reset();
  closePopup(popupAdd);
});

//ф-ция закрытия овр
function handleCloseByClick(evt) {
  if (
    evt.currentTarget === evt.target ||
    evt.target.classList.contains("popup__close-button")
  )
    closePopup(evt.currentTarget);
}

function handleCloseByEsc(evt) {
  const popup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popup);
  }
}
const popups = Array.from(document.querySelectorAll(".popup"));

popups.forEach((popup) => {
  popup.addEventListener("click", handleCloseByClick);
});
//валидация
const addCardValidate = new FormValidator(config, popupAdd);
addCardValidate.enableValidation();

const profileEditValidate = new FormValidator(config, popupEdit);
profileEditValidate.enableValidation();

export { openPopup };
