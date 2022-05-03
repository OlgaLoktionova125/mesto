export class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    _handleLike () {
        this._element.querySelector('.element__like').classList.toggle('element__like_active');
    }

    _handleCardRemove() {
        this._element.remove();        
    }

    _setEventListeners() {
        this._element.querySelector('.element__trash').addEventListener('click', ()=> this._handleCardRemove());
        this._element.querySelector('.element__like').addEventListener('click', ()=> this._handleLike());
    }

    generateCard() {
        this._element = this._getTemplate();
        
        this._setEventListeners();

        this._element.querySelector('.element__image').src = this._link;
        this._element.querySelector('.element__place').textContent = this._name;
        this._element.querySelector('.element__image').alt = this._name;

        return this._element;
    }
}