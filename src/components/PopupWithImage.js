import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(data, popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__img');
        this._text = this._popup.querySelector('.popup__text');
        this._link = data.link;
        this._name = data.name;
    }

    open() {
        this._image.src = this._link;
        this._image.alt = this._name;
        this._text.textContent = this._name;
        super.open();        
    }
}