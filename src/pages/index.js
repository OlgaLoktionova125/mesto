import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {validationObj, config} from '../utils/data.js';
import {editButton, addButton, editAvatarButton} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)
    const formName = formElement.getAttribute('name')   
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(validationObj);

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

const api = new Api(config);

const popupDeleteCard = new PopupWithConfirmation('#deleteCard');
popupDeleteCard.setEventListeners();

function deleteCard(card) {
  popupDeleteCard.open();
  popupDeleteCard.setSubmitHandler(() => {
    return api.delCard(card.getCardId())
    .then(() => card.removeCard())
    .then(() => popupDeleteCard.close())
    .catch(err => console.log(err))
  })
}

Promise.all([api.getUserInfo(), api.getCardsInfo()])
  .then(([userData, cardsData]) => {

    const userId = userData._id;
    
    userInfo.setUserInfo(userData);

    function createCard(item) {
      const card = new Card(item, '#element-template', handleCardClick, deleteCard, handleCardLike);               
      const cardElement = card.generateCard(item, userId);
      cardList.setItem(cardElement);                
    }

    const cardList = new Section({
      items: cardsData,
      renderer: (item) => createCard(item)}, '.elements__container');

    cardList.renderItems();
    
    function handleAddFormSubmit(data) {  
      popupAdd.renderLoading(true)
      return api.createCard(data)    
        .then(data => createCard(data))
        .then(() => popupAdd.close())
        .catch(err => console.log(err))
        .finally(() => popupAdd.renderLoading(false));
    };

    const popupAdd = new PopupWithForm('#add', handleAddFormSubmit);
    popupAdd.setEventListeners();

    function openPopupAdd() {
      formValidators['addPopupForm'].resetValidation();
      popupAdd.open();
    }

    addButton.addEventListener('click', openPopupAdd);    

  })  
  .catch(err => console.log(err));

const cardPopup = new PopupWithImage('#popupImage');
cardPopup.setEventListeners();
  
function handleCardClick(data) {  
  cardPopup.open(data);  
};
  
function handleCardLike(card) {
  if (card.isLiked()) {
    return api.addCardLike(card.getCardId())
      .then((res) => {
          card.updateLikes(res)
      })
      .catch((err) => {
          console.log(err);
      });
  } else {
    return api.removeCardLike(card.getCardId())
      .then((res) => {
          card.updateLikes(res)
      })
      .catch((err) => {
          console.log(err);
      });
  }  
}

const popupEditAvatar = new PopupWithForm('#editAvatar', handlePopupEditAvatarSubmit);
popupEditAvatar.setEventListeners();

function handlePopupEditAvatarSubmit(data) {
  popupEditAvatar.renderLoading(true);
  return api.changeAvatar(data)
    .then(data => userInfo.setUserInfo(data))
    .then(() => popupEditAvatar.close())
    .catch(err => console.log(err))
    .finally(() =>popupEditAvatar.renderLoading(false));
}

function openPopupEditAvatar() {
  formValidators['editAvatarPopupForm'].resetValidation();  
  popupEditAvatar.open();
}

editAvatarButton.addEventListener('click', openPopupEditAvatar);

function handleEditFormSubmit(data) {
  popupEdit.renderLoading(true);
  return api.updateUserInfo(data)
    .then(data => {
      userInfo.setUserInfo(data);
    })
    .then(() => popupEdit.close())
    .catch(err => console.log(err))
    .finally(() =>popupEdit.renderLoading(false));   
};

const popupEdit = new PopupWithForm('#edit', handleEditFormSubmit);
popupEdit.setEventListeners();

function openPopupEdit() {  
  const userData = userInfo.getUserInfo();
  popupEdit.setInputValues(userData);
  formValidators['editPopupForm'].resetValidation();
  popupEdit.open();
};

editButton.addEventListener('click', openPopupEdit);