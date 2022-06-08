import Popup from "./Popup.js";

export default class  PopupWithConfirmation extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');        
        this._submitButton = this._popup.querySelector('.popup__submit-button');        
    }

    setSubmitHandler(handleSubmit) {
        this._handleSubmit = handleSubmit;
    }

    close() {
        super.close();
        this._form.reset();
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => { 
            evt.preventDefault();
            this._handleSubmit();
            this.close();
        });
    }
}