export default class Card {
        
    constructor(data, cardSelector, handleCardClick) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;     
        this._handleCardClick = handleCardClick;                  
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
        this._element = null;        
    }

    _setEventListeners() {
        this._element.querySelector('.element__trash').addEventListener('click', ()=> this._handleCardRemove());
        this._element.querySelector('.element__like').addEventListener('click', ()=> this._handleLike());
        this._elementImage.addEventListener('click', () => this._handleCardClick(this._data));
    }

    generateCard() {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__image');
        
        this._setEventListeners();

        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._element.querySelector('.element__place').textContent = this._name;        

        return this._element;
    }
}