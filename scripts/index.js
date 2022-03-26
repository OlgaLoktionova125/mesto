const elementTemplate = document.querySelector('#element-template').content;
const elementsContainer = document.querySelector('.elements__container');

const editButton = document.querySelector('.profile__edit-button');
const editCloseButton = document.querySelector('#editCloseButton');
const edit = document.querySelector('#edit');
const editPopupForm = document.querySelector('#editPopupForm');
let nameInput = editPopupForm.querySelector('.popup__input_type_name');
let jobInput = editPopupForm.querySelector('.popup__input_type_job');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');

const addButton = document.querySelector('.profile__add-button');
const addCloseButton = document.querySelector('#addCloseButton');
const add = document.querySelector('#add');
const addPopupForm = document.querySelector('#addPopupForm');
let placeInput = addPopupForm.querySelector('.popup__input_type_place');
let imageInput = addPopupForm.querySelector('.popup__input_type_image');

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

function addCard(obj) {
    const card = elementTemplate.querySelector('.element').cloneNode(true);
    const cardImage = card.querySelector('.element__image');
    const cardPlace = card.querySelector('.element__place');
    const popupImage = document.querySelector('#popupImage');

    cardImage.src = obj.link;
    cardPlace.textContent = obj.name;

    card.querySelector('.element__like').addEventListener('click', evt => {
      evt.target.classList.toggle('element__like_active');
    });

    cardImage.addEventListener('click', () => {
      popupImage.classList.add('popup_opened');
      document.querySelector('.popup__content').style.backgroundImage = `url(${cardImage.src})`; 
      document.querySelector('.popup__text').textContent = cardPlace.textContent;
    });

    document.querySelector('#popupImageCloseButton').addEventListener('click', () => {
      popupImage.classList.remove('popup_opened');
    })

    elementsContainer.prepend(card);

    card.querySelector('.element__trash').addEventListener('click', () => {
      card.remove();
    } )

    console.log(cardImage.style.width);
};

initialCards.forEach(addCard);

function openEditPopup() {
    edit.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;
}

editButton.addEventListener('click', openEditPopup);

function closeEditPopup() {
    edit.classList.remove('popup_opened');    
}

editCloseButton.addEventListener('click', closeEditPopup);

function editFormSubmitHandler(evt) {
    evt.preventDefault(); 
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closeEditPopup();    
}

editPopupForm.addEventListener('submit', editFormSubmitHandler); 

function openAddPopup() {
  add.classList.add('popup_opened');
  placeInput.value = "Название";
  imageInput.value = "Ссылка на картинку";
}

addButton.addEventListener('click', openAddPopup);

function closeAddPopup() {
  add.classList.remove('popup_opened');
}

addCloseButton.addEventListener('click', closeAddPopup);

function addFormSubmitHandler (evt) {
  evt.preventDefault();
  let newCard = {
    name: placeInput.value,
    link: imageInput.value
  };
  addCard(newCard);
  closeAddPopup();
}

addPopupForm.addEventListener('submit', addFormSubmitHandler);