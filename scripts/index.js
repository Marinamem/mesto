// Находим форму в DOM
let formElement = document.querySelector(".popup__form"); // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__input_info_name"); // Воспользуйтесь инструментом .querySelector()
let jobInput = document.querySelector(".popup__input_info_job"); // Воспользуйтесь инструментом .querySelector()
let editButton = document.querySelector(".profile__edit-button");
let closeButton = document.querySelector(".popup__close-button");
let saveButton = document.querySelector(".popup__save-button");
let popup = document.querySelector(".popup");
let profileName = document.querySelector(".profile__info-name");
let profileJob = document.querySelector(".profile__info-job");

const openPopup = () => {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
};

const closePopup = () => {
  popup.classList.remove("popup_opened");
};

editButton.addEventListener("click", openPopup);
closeButton.addEventListener("click", closePopup);
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет

function handleFormSubmit(evt) {
  evt.preventDefault(); //
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener("submit", handleFormSubmit);
