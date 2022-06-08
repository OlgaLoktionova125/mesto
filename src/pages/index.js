import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import {validationObj, config} from '../utils/data.js';
import {editButton, editPopupForm, nameInput, jobInput, addButton, addPopupForm, editAvatarPopupForm, editAvatarButton} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

const popupEditFormValidator = new FormValidator(validationObj, editPopupForm);
const popupAddFormValidator = new FormValidator(validationObj, addPopupForm);
const popupEditAvatarFormValidator = new FormValidator(validationObj, editAvatarPopupForm);
popupEditFormValidator.enableValidation();
popupAddFormValidator.enableValidation();
popupEditAvatarFormValidator.enableValidation();

const userInfo = new UserInfo('.profile__name', '.profile__job', '.profile__avatar');

const api = new Api(config);
const popupDeleteCard = new PopupWithConfirmation('#deleteCard');
popupDeleteCard.setEventListeners();

function deleteCard(id) {
  return api.delCard(id);
}

Promise.all([api.getUserInfo(), api.getCardsInfo()])
  .then(data => {
    const userData = data[0];
    const cardsData = data[1];
    const userId = userData._id;
    
    userInfo.setUserInfo(userData);

    function createCard(item) {
      const card = new Card(item, '#element-template', handleCardClick, deleteCard, popupDeleteCard, handleCardLikes);
               
        const cardElement = card.generateCard(item, userId);

        cardList.setItem(cardElement);                
    }

    const cardList = new Section({
      items: cardsData,
      renderer: (item) => createCard(item, userId)}, '.elements__container');

    cardList.renderItems();
    
    function addFormSubmitHandler(data) {  
      popupAdd.renderLoading(true)
      return api.createCard(data)    
        .then(data => createCard(data))
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

  })  
  .catch(err => console.log(err));

const cardPopup = new PopupWithImage('#popupImage');
cardPopup.setEventListeners();
  
function handleCardClick(data) {  
  cardPopup.open(data);  
};
  
function handleCardLikes(id, element) {
  if(element.classList.contains('element__like_active')){
    return api.removeCardLike(id);    
  } else {
    return api.addCardLike(id);
  }  
}

const popupEditAvatar = new PopupWithForm('#editAvatar', popupEditAvatarSubmitHandler);
popupEditAvatar.setEventListeners();

function popupEditAvatarSubmitHandler(data) {
  popupEditAvatar.renderLoading(true);
  return api.changeAvatar(data)
    .then(data => userInfo.setUserInfo(data))
    .then(() => popupEditAvatar.close())
    .catch(err => console.log(err))
    .finally(() =>popupEditAvatar.renderLoading(false));
}

editAvatarButton.addEventListener('click', ()=> popupEditAvatar.open());

function editFormSubmitHandler(data) {
  popupEdit.renderLoading(true);
  return api.updateUserInfo(data)
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