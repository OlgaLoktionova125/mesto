import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validationObj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

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

function openPopupImage (obj) {
  popupImg.src = obj.link;
  popupImg.alt = obj.name;
  popupText.textContent = obj.name;
  openPopup(popupImage);  
};

function addCard(obj) {
  const card = new Card(obj, '#element-template');
  const cardElement = card.generateCard();
  cardElement.querySelector('.element__image').addEventListener('click', ()=> openPopupImage(obj));
  return cardElement;
}

initialCards.forEach(item => {
  const card = addCard(item);
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
};

addButton.addEventListener('click', openAddPopup);

function addInactiveButtonClass() {
  addPopupForm.querySelector('.popup__submit-button').classList.add('popup__submit-button_disabled');
};

function closeAddPopup() {  
  closePopup(popupAddCard);
  addPopupForm.reset();
  addInactiveButtonClass();
};

addCloseButton.addEventListener('click', closeAddPopup);

function addFormSubmitHandler(evt) {
  evt.preventDefault();
  const newCard = {
    name: placeInput.value,
    link: imageInput.value
  };
  const card = addCard(newCard);
  elementsContainer.prepend(card);
  addInactiveButtonClass();
  closePopup(popupAddCard);
  addPopupForm.reset();  
};

addPopupForm.addEventListener('submit', addFormSubmitHandler);