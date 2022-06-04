import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {validationObj, configUserInfo, configCards, userId} from '../utils/data.js';
import {editButton, editPopupForm, nameInput, jobInput, addButton, addPopupForm, editAvatarPopupForm, editAvatarButton} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import Popup from '../components/Popup';

const popupEditFormValidator = new FormValidator(validationObj, editPopupForm);
const popupAddFormValidator = new FormValidator(validationObj, addPopupForm);
const popupEditAvatarFormValidator = new FormValidator(validationObj, editAvatarPopupForm);
popupEditFormValidator.enableValidation();
popupAddFormValidator.enableValidation();
popupEditAvatarFormValidator.enableValidation();

const apiUser = new Api(configUserInfo);

const popupEditAvatar = new PopupWithForm('#editAvatar', popupEditAvatarSubmitHandler);
popupEditAvatar.setEventListeners();

function popupEditAvatarSubmitHandler(data) {
  popupEditAvatar.renderLoading(true);
  return apiUser.changeAvatar(data)
    .then(data => userInfo.setUserInfo(data))
    .then(popupEditAvatar.close())
    .catch(err => console.log(err))
    .finally(() =>popupEditAvatar.renderLoading(false));
}

editAvatarButton.addEventListener('click', ()=> popupEditAvatar.open());

const cardPopup = new PopupWithImage('#popupImage');
cardPopup.setEventListeners();

function handleCardClick(data) {  
  cardPopup.open(data);  
};

const apiCards = new Api(configCards);

apiCards.getInfo()
  .then(data => {
    const cardList = new Section({
      items: data,
      renderer: (item) => { 
        const card = new Card(item, '#element-template', handleCardClick, popupDeleteCard, deleteCard, handleCardLikes);
        if(item.owner._id === userId) {
          card.removeCard();
        }        
        const cardElement = card.generateCard(item, item.owner._id, userId);        
        cardList.setItemAppend(cardElement);                
      }
    }, '.elements__container');
    cardList.renderItems();    
  })
  .catch((err) => {
    console.log(err); 
  }); 

function handleCardLikes(id, element) {
  if(element.classList.contains('element__like_active')){
    return apiCards.removeCardLike(id);    
  } else {
    return apiCards.addCardLike(id);
  }  
}

function addFormSubmitHandler(data) {  
  popupAdd.renderLoading(true)
  return apiCards.createCard(data)    
    .then(data => {
      const newCard = new Section({
          items: data,
          renderer: (data) => {
            const card = new Card(data, '#element-template', handleCardClick, popupDeleteCard, deleteCard, handleCardLikes);
            card.removeCard();
            const cardElement = card.generateCard(data, data.owner._id, userId);
            newCard.setItemPrepend(cardElement);            
          }
        }, '.elements__container');
        newCard.renderItem(data);               
    })
    .then(() => popupAdd.close())
    .catch(err => console.log(err))
    .finally(() => popupAdd.renderLoading(false));
};

const popupAdd = new PopupWithForm('#add', addFormSubmitHandler);
popupAdd.setEventListeners();

function openPopupAdd() {
  popupAddFormValidator.toggleButtonState();
  popupAddFormValidator.resetErrors();
  popupAdd.open();
}

addButton.addEventListener('click', openPopupAdd);

const popupDeleteCard = new Popup('#deleteCard');
popupDeleteCard.setEventListeners();


function deleteCard(id) {
  return apiCards.delCard(id);    
}

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

apiUser.getInfo()
  .then(data => {
    userInfo.setUserInfo(data);    
  })
  .catch((err) => {
    console.log(err); 
  }); 

function editFormSubmitHandler(data) {
  popupEdit.renderLoading(true);
  return apiUser.updateUserInfo(data)
    .then(data => {
      userInfo.setUserInfo(data);
    })
    .then(() => popupEdit.close())
    .catch(err => console.log(err))
    .finally(() =>popupEdit.renderLoading(false));   
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