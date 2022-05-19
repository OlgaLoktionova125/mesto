import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {initialCards, validationObj} from '../utils/data.js';
import {elementsContainer, editButton, editPopupForm, nameInput, jobInput, addButton, addPopupForm} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const PopupEditFormValidator = new FormValidator(validationObj, editPopupForm);

const PopupAddFormValidator = new FormValidator(validationObj, addPopupForm);

PopupEditFormValidator.enableValidation();

PopupAddFormValidator.enableValidation();

function handleCardClick(data) {
  const CardPopup = new PopupWithImage(data,'#popupImage');
  CardPopup.open();
  CardPopup.setEventListeners();
}

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#element-template', handleCardClick);
    const cardElement = card.generateCard();
    cardList.setItem(cardElement);
  }
}, '.elements__container');

cardList.renderItems();

function addFormSubmitHandler(data) {
  const card = new Card(data, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  elementsContainer.prepend(cardElement);
}
const popupAdd = new PopupWithForm('#add', addFormSubmitHandler);
popupAdd.setEventListeners();

addButton.addEventListener('click', ()=> popupAdd.open());

const userInfo = new UserInfo('.profile__name', '.profile__job');

function editFormSubmitHandler(data) {
  userInfo.setUserInfo(data);
}

const popupEdit = new PopupWithForm('#edit', editFormSubmitHandler);
popupEdit.setEventListeners();

function openPopupEdit() {  
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userJob;
  popupEdit.open();
}

editButton.addEventListener('click', openPopupEdit);