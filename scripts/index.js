const elementTemplate = document.querySelector('#element-template').content;
const elementsContainer = document.querySelector('.elements__container');
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

function closePopupEsc(evt) {
  const popup = document.querySelector('.popup_opened');
  if(evt.key === 'Escape') {
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

function handleLikeCallback (evt) {
  evt.target.classList.toggle('element__like_active');
};

function openPopupImage (obj) {
  popupImg.src = obj.link;
  popupImg.alt = obj.name;
  popupText.textContent = obj.name;
  openPopup(popupImage);  
};

function handleCardRemove(card) {
  card.remove();
};

function addCard(obj) {
    const card = elementTemplate.querySelector('.element').cloneNode(true);
    const cardImage = card.querySelector('.element__image');
    const cardPlace = card.querySelector('.element__place');    

    cardImage.src = obj.link;
    cardPlace.textContent = obj.name;
    cardImage.alt = obj.name;

    card.querySelector('.element__like').addEventListener('click', handleLikeCallback);

    cardImage.addEventListener('click', () => openPopupImage(obj));     

    card.querySelector('.element__trash').addEventListener('click', () => handleCardRemove(card));

    return card;    
};

initialCards.forEach(obj => {
  const card = addCard(obj);
  elementsContainer.append(card);
});

function closePopupImage () {
  closePopup(popupImage);
};

popupImageCloseButton.addEventListener('click', closePopupImage);

function openEditPopup () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfileEdit);
};

editButton.addEventListener('click', openEditPopup);

function closeEditPopup () {
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

function closeAddPopup () {  
  closePopup(popupAddCard);
  addPopupForm.reset();
  addInactiveButtonClass();
};

addCloseButton.addEventListener('click', closeAddPopup);

function addFormSubmitHandler (evt) {
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