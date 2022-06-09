export default class Card {
        
    constructor(data, cardSelector, handleCardClick, deleteCard, handleCardLike) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._cardSelector = cardSelector;     
        this._handleCardClick = handleCardClick;
        this._element = this._getTemplate();    
        this._elementImage = this._element.querySelector('.element__image'); 
        this._elementLike = this._element.querySelector('.element__like');
        this._elementTrash = this._element.querySelector('.element__trash');
        this._place = this._element.querySelector('.element__place')
        this._deleteCard = deleteCard;
        this._handleCardLike = handleCardLike;
        this._elementLikeCount = this._element.querySelector('.element__likeCount');         
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector)
        .content
        .querySelector('.element')
        .cloneNode(true);

        return cardElement;
    }

    getCardId() {
        return this._id;
    }

    isLiked() {
        if(this._elementLike.classList.contains('element__like_active')){
            return false;
        } else {
            return true;
        }
    }

    updateLikes(data) {        
        this._elementLike.classList.toggle('element__like_active');
        this._elementLikeCount.textContent = data.likes.length;        
    }

    removeCard = () => {    
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._elementTrash.addEventListener('click', () => this._deleteCard(this));
        this._elementLike.addEventListener('click', ()=> this._handleCardLike(this));
        this._elementImage.addEventListener('click', () => this._handleCardClick(this._data));                       
    }

    generateCard(data, userId) {
        
        if ( data.likes.length>0) {
            data.likes.forEach(element => {
                if(element._id === userId) {
                    this._elementLike.classList.add('element__like_active');
                }
            });
        }        
        
        this._setEventListeners();
        
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._place.textContent = this._name;
        this._elementLikeCount.textContent = data.likes.length; 
        if(data.owner._id === userId) {
            this._elementTrash.classList.add('element__trash_active');            
        }            

        return this._element;
    }
}