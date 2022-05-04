import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards} from './initialCards.js';
import {validationObj} from './validationObj.js';

const elementsContainer = document.querySelector('.elements__container');
const elementTemplate = document.querySelector('#element-template').content;
const editButton = document.querySelector('.profile__edit-button');
const editCloseButton = document.querySelector('#editCloseButton');
const popupProfileEdit = document.querySelector('#edit');
const editPopupForm = document.querySelector('#editPopupForm');
const nameInput = editPopupForm.querySelector('.popup__input_type_name');
const jobInput = editPopupForm.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = document.querySelector('#addCloseButton');
const popupAddCard = document.querySelector('#add');
const addPopupForm = document.querySelector('#addPopupForm');
const placeInput = addPopupForm.querySelector('.popup__input_type_place');
const imageInput = addPopupForm.querySelector('.popup__input_type_image');
const popupImg = document.querySelector('.popup__img');
const popupText = document.querySelector('.popup__text');
const popupImageCloseButton = document.querySelector('#popupImageCloseButton');
const popupImage = document.querySelector('#popupImage');
const popups = Array.from(document.querySelectorAll('.popup'));
const editPopupFormValidator = new FormValidator(validationObj, editPopupForm);
const addPopupFormValidator = new FormValidator(validationObj, addPopupForm);

editPopupFormValidator.enableValidation();

addPopupFormValidator.enableValidation();

function closePopupEsc(evt) {  
  if(evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  };
};

popups.forEach(popup => popup.addEventListener('click', evt => { 
  if(evt.target.classList.contains('popup_opened')) {
    closePopup(popup);
  };
})); 

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);  
};

function openPopupImage(obj) {
  popupImg.src = obj.link;
  popupImg.alt = obj.name;
  popupText.textContent = obj.name;
  openPopup(popupImage);  
};

function createCard(obj) {
  const card = new Card(obj, '#element-template', openPopupImage);
  const cardElement = card.generateCard();  
  return cardElement;
}

initialCards.forEach(item => {
  const card = createCard(item);
  elementsContainer.append(card);
});

function closePopupImage() {
  closePopup(popupImage);
};

popupImageCloseButton.addEventListener('click', closePopupImage);

function openEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfileEdit);
  addPopupFormValidator.toggleButtonState();
};

editButton.addEventListener('click', openEditPopup);

function closeEditPopup() {
  closePopup(popupProfileEdit);
};

editCloseButton.addEventListener('click', closeEditPopup);

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(popupProfileEdit);
};

editPopupForm.addEventListener('submit', editFormSubmitHandler);

function openAddPopup () {
  openPopup(popupAddCard);
  addPopupFormValidator.toggleButtonState();
};

addButton.addEventListener('click', openAddPopup);

function closeAddPopup() {  
  closePopup(popupAddCard);
  addPopupForm.reset();  
};

addCloseButton.addEventListener('click', closeAddPopup);

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeInput.value,
    link: imageInput.value
  };
  const card = createCard(newCard);
  elementsContainer.prepend(card);
  closePopup(popupAddCard);
  addPopupForm.reset();  
};

addPopupForm.addEventListener('submit', addFormSubmitHandler);