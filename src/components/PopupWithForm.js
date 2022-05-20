import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(popupSelector, submitForm) {
        super(popupSelector);
        this._submitForm = submitForm;
        this._form = this._popup.querySelector('.popup__form');
        this._formInputs = this._form.querySelectorAll('.popup__input');
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _getInputValues() {
       this._formData = {};
       this._formInputs.forEach(input => {
           this._formData[input.name] = input.value;
       });
       return this._formData;              
    }

    _handleSubmit(evt) {
        evt.preventDefault();
        this._submitForm(this._getInputValues());        
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleSubmit);
    }

    close() {
        super.close();
        this._form.reset();
    }
}