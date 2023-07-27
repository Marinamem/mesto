// Находим форму в DOM
const formElementEdit = document.querySelector(".popup__form_type_profile"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector(".popup__input_info_name"); // Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector(".popup__input_info_job"); // Воспользуйтесь инструментом .querySelector()
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close-button");
const saveButton = document.querySelector(".popup__save-button");
const popupEdit = document.querySelector(".popup_type_edit");
const profileName = document.querySelector(".profile__info-name");
const profileJob = document.querySelector(".profile__info-job");

const openPopup = function (modal) {
  modal.classList.add("popup_opened");
};

const closePopup = function (modal) {
  modal.classList.remove("popup_opened");
};

editButton.addEventListener("click", function () {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  let event = new Event("input");
  nameInput.dispatchEvent(event);
  jobInput.dispatchEvent(event);
});
popupEdit.addEventListener("click", closeOverlay);
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handleFormSubmitPopupEdit(evt) {
  evt.preventDefault(); //
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupEdit);
}
formElementEdit.addEventListener("submit", handleFormSubmitPopupEdit);

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

buttonAdd.addEventListener("click", function () {
  formElementAdd.reset();
  disabledButton(buttonSubmit, config);
  openPopup(popupAdd);
});
popupAdd.addEventListener("click", closeOverlay);

formElementAdd.addEventListener("submit", function (e) {
  e.preventDefault();
  const nameValue = placeNameInput.value;
  const imageValue = placeLinkInput.value;
  renderCard({ name: nameValue, link: imageValue }, cardsList);
  formElementAdd.reset();
  closePopup(popupAdd);
});

function createCards({ name, link }) {
  const card = templateElement.cloneNode(true);
  const textElement = card.querySelector(".element__title");
  const imageElement = card.querySelector(".element__image");
  const buttonDelElement = card.querySelector(".element__delete");
  const buttonLikeElement = card.querySelector(".element__like");
  textElement.textContent = name;
  imageElement.src = link;
  imageElement.alt = name;

  buttonDelElement.addEventListener("click", function () {
    card.remove();
  });

  buttonLikeElement.addEventListener("click", function () {
    buttonLikeElement.classList.toggle("element__like-active");
  });

  imageElement.addEventListener("click", function () {
    openPopup(popupImage);
    fullImage.src = imageElement.src;
    fullImage.alt = textElement.textContent;
    fullText.textContent = textElement.textContent;
  });

  return card;
}

function renderCard(data, container) {
  container.prepend(createCards(data));
}

initialCards.forEach(function (item) {
  renderCard(item, cardsList);
});

function closeOverlay(evt) {
  if (
    evt.currentTarget === evt.target ||
    evt.target.classList.contains("popup__close-button")
  )
    closePopup(evt.currentTarget);
}
document.addEventListener("keydown", function (evt) {
  const popup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popup);
  }
});
