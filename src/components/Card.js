export default class Card {
        
    constructor(data, cardSelector, handleCardClick, deleteCard, popup, handleCardLikes) {
        this._data = data;
        this._name = data.name;
        this._link = data.link;
        this._id = data._id;
        this._cardSelector = cardSelector;     
        this._handleCardClick = handleCardClick;
        this._element = this._getTemplate();     
        this._elementLike = this._element.querySelector('.element__like');
        this._elementTrash = this._element.querySelector('.element__trash');
        this._deleteCard = deleteCard;
        this._popup = popup;
        this._handleCardLikes = handleCardLikes;
        this._isLiked = false;         
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
            .then(data => this._element.querySelector('.element__likeCount').textContent = data.likes.length)
            .then(()=> this._elementLike.classList.toggle('element__like_active'))
            .then(()=> this._isLiked = true)
            .catch((err) => console.log(err));        
    }

    _removeCard = () => {    
        this._element.remove();
        this._element = null;
    }

    _setEventListeners() {
        this._elementTrash.addEventListener('click', ()=> {
            this._popup.open();
            this._popup.setSubmitHandler(()=> this._deleteCard(this._id)
            .then(()=>this._removeCard())
            .catch(err => console.log(err)))
        });
        this._elementLike.addEventListener('click', ()=> this._handleLike());
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
        
        this._elementImage = this._element.querySelector('.element__image');
        
        this._setEventListeners();
        
        this._elementImage.src = this._link;
        this._elementImage.alt = this._name;
        this._element.querySelector('.element__place').textContent = this._name;
        this._element.querySelector('.element__likeCount').textContent = data.likes.length; 
        if(data.owner._id === userId) {
            this._elementTrash.classList.add('element__trash_active');            
        }            

        return this._element;
    }
}