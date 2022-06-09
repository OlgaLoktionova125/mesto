export default class Api {
  
    constructor(options) {
        this._options = options;
        this._url = options.url;
        this._headers = options.headers;
    }

    _handleResponse = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    };

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers
        })
        .then(this._handleResponse);
    }

    getCardsInfo() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers
      })
        .then(this._handleResponse);
  }

    updateUserInfo(obj) {
        return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: obj.name,
            about: obj.about
          })
        })
        .then(this._handleResponse);    
    }

    changeAvatar(obj) {
        return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: obj.avatar 
          })
        })
        .then(this._handleResponse);
    }

    createCard(obj) {
        return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: obj.name,
            link: obj.link
          })
        })
        .then(this._handleResponse);
    }

    delCard(id) {
        return fetch(`${this._url}/cards/${id}`, {
          method: 'DELETE',
          headers: this._headers                            
      })
      .then(this._handleResponse);
    }

    addCardLike(id) {
        return fetch(`${this._url}/cards/${id}/likes`, {
          method: 'PUT',
          headers: this._headers
        })
        .then(this._handleResponse);
    }

    removeCardLike(id) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._handleResponse);
    }
}