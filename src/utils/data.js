export const validationObj = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
  };

export const userId = 'da69a70e0f53cf1798d9c96a';

export const configUserInfo = {
  url: 'https://nomoreparties.co/v1/cohort-42/users/me',
  headers: {
      authorization: 'c5462734-0cd3-41b0-a75d-f690a2334b8f',  
      'Content-Type': 'application/json'
   }
}

export const configCards = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-42/cards',
  headers: {
      authorization: 'c5462734-0cd3-41b0-a75d-f690a2334b8f',  
      'Content-Type': 'application/json'
  }
}