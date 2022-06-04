export default class Card {
        
    constructor(data, cardSelector, handleCardClick, popup, deleteCard, handleCardLikes) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._cardSelector = cardSelector;     
        this._handleCardClick = handleCardClick;
        this._element = this._getTemplate();     
        this._elementLike = this._element.querySelector('.element__like');
        this._elementTrash = this._element.querySelector('.element__trash');
        this._popup = popup;
        this._deleteCard = deleteCard;
        this._handleCardLikes = handleCardLikes;         
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    _handleLike() {
        this._handleCardLikes(this._id, this._elementLike)
            .then(this._elementLike.classList.toggle('element__like_active'))
            .then(data => this._element.querySelector('.element__likeCount').textContent = data.likes.length)
            .catch((err) => {
                console.log(err); 
            });        
    }

    _handlePopup() {
        this._popup.open();       
    }

    removeCard() {        
        document.querySelector('.popup__delete-button')
            .addEventListener('click', 
            ()=> {this._deleteCard(this._id)
            .then(this._popup.close())
            .then(this._element.remove())});        
    }

    _setEventListeners() {
        this._elementTrash.addEventListener('click', ()=> this._handlePopup());
        this._elementLike.addEventListener('click', ()=> this._handleLike());
        this._elementImage.addEventListener('click', () => this._handleCardClick(this._data));                       
    }

    generateCard(data, cardOwnerId, userId) {
        
        this._elementImage = this._element.querySelector('.element__image');
        
        this._setEventListeners();
        
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._element.querySelector('.element__place').textContent = this._name;
        this._element.querySelector('.element__likeCount').textContent = data.likes.length; 
        if(cardOwnerId !== userId) {
            this._elementTrash.remove();            
        }       

        return this._element;
    }
}