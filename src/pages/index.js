import './index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {initialCards, validationObj} from '../utils/data.js';
import {editButton, editPopupForm, nameInput, jobInput, addButton, addPopupForm} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const popupEditFormValidator = new FormValidator(validationObj, editPopupForm);

const popupAddFormValidator = new FormValidator(validationObj, addPopupForm);

popupEditFormValidator.enableValidation();

popupAddFormValidator.enableValidation();

const cardPopup = new PopupWithImage('#popupImage');

cardPopup.setEventListeners();

function handleCardClick(data) {  
  cardPopup.open(data);  
};

function createCard(data) {
  const card = new Card(data, '#element-template', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
};

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {        
    cardList.setItemAppend(createCard(item));
  }
}, '.elements__container');

cardList.renderItems();

function addFormSubmitHandler(data) {  
  const newCard = new Section({
    items: data,
    renderer: (data) => {
      newCard.setItemPrepend(createCard(data));
    }
  }, '.elements__container');
  newCard.renderItem(data);
  popupAdd.close();  
};

const popupAdd = new PopupWithForm('#add', addFormSubmitHandler);
popupAdd.setEventListeners();

function openPopupAdd() {
  popupAddFormValidator.toggleButtonState();
  popupAddFormValidator.resetErrors();
  popupAdd.open();
}

addButton.addEventListener('click', openPopupAdd);

const userInfo = new UserInfo('.profile__name', '.profile__job');

function editFormSubmitHandler(data) {
  userInfo.setUserInfo(data);
  popupEdit.close();
};

const popupEdit = new PopupWithForm('#edit', editFormSubmitHandler);
popupEdit.setEventListeners();

function openPopupEdit() {  
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.userName;
  jobInput.value = userData.userJob;
  popupEditFormValidator.resetErrors();
  popupEdit.open();
};

editButton.addEventListener('click', openPopupEdit);