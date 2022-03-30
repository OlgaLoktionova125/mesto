const elementTemplate = document.querySelector('#element-template').content;
const elementsContainer = document.querySelector('.elements__container');
const editButton = document.querySelector('.profile__edit-button');
const editCloseButton = document.querySelector('#editCloseButton');
const edit = document.querySelector('#edit');
const editPopupForm = document.querySelector('#editPopupForm');
const nameInput = editPopupForm.querySelector('.popup__input_type_name');
const jobInput = editPopupForm.querySelector('.popup__input_type_job');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = document.querySelector('#addCloseButton');
const add = document.querySelector('#add');
const addPopupForm = document.querySelector('#addPopupForm');
const placeInput = addPopupForm.querySelector('.popup__input_type_place');
const imageInput = addPopupForm.querySelector('.popup__input_type_image');
const popupContent = document.querySelector('.popup__content');
const popupText = document.querySelector('.popup__text');
const popupImageCloseButton = document.querySelector('#popupImageCloseButton');
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

function openPopup(popup) {
  popup.classList.add('popup_opened');
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};

function elementLikeCallback (evt) {
  evt.target.classList.toggle('element__like_active');
};

function addCard(obj) {
    const card = elementTemplate.querySelector('.element').cloneNode(true);
    const cardImage = card.querySelector('.element__image');
    const cardPlace = card.querySelector('.element__place');
    const popupImage = document.querySelector('#popupImage');

    function openPopupImage () {
      popupContent.style.backgroundImage = `url(${cardImage.src})`;
      popupText.textContent = cardPlace.textContent;
      openPopup(popupImage);
    };

    function cardRemove() {
      card.remove();
    };

    cardImage.src = obj.link;
    cardPlace.textContent = obj.name;

    card.querySelector('.element__like').addEventListener('click', elementLikeCallback);

    cardImage.addEventListener('click', openPopupImage);       

    card.querySelector('.element__trash').addEventListener('click', cardRemove);

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
  openPopup(edit);
};

editButton.addEventListener('click', openEditPopup);

function clearNameInput () {
  nameInput.value = '';
};

nameInput.addEventListener('click', clearNameInput);

function clearJobInput () {
  jobInput.value = '';
};

jobInput.addEventListener('click', clearJobInput);

function closeEditPopup () {
  closePopup(edit);
};

editCloseButton.addEventListener('click', closeEditPopup);

function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileJob.textContent = jobInput.value;
    closePopup(edit);
};

editPopupForm.addEventListener('submit', editFormSubmitHandler);

function openAddPopup () {
  openPopup(add);
};

addButton.addEventListener('click', openAddPopup);

function clearPlaceInput () {
  placeInput.value = '';
};

placeInput.addEventListener('click', clearPlaceInput);

function clearImageInput () {
  imageInput.value = '';
};

imageInput.addEventListener('click', clearImageInput);

function closeAddPopup () {
  closePopup(add);
};

addCloseButton.addEventListener('click', closeAddPopup);

function addFormSubmitHandler (evt) {
  evt.preventDefault();
  let newCard = {
    name: placeInput.value,
    link: imageInput.value
  };
  const card = addCard(newCard);
  elementsContainer.prepend(card);
  closePopup(add);
};

addPopupForm.addEventListener('submit', addFormSubmitHandler);