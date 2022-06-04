const handleResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

export default class Api {
    constructor(options) {
        this._options = options;
        this._url = options.url;
        this._headers = options.headers;
    }

    getInfo() {
        return fetch(this._url, {
            headers: this._headers
        })
        .then(handleResponse);
    }

    updateUserInfo(obj) {
        return fetch(this._url, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: obj.name,
            about: obj.about
          })
        })
        .then(handleResponse);    
    }

    changeAvatar(obj) {
        return fetch(`${this._url}/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: obj.avatar 
          })
        })
        .then(handleResponse);
    }

    createCard(obj) {
        return fetch(this._url, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: obj.name,
            link: obj.link
          })
        })
        .then(handleResponse);
    }

    delCard(id) {
        return fetch(`${this._url}/${id}`, {
          method: 'DELETE',
          headers: this._headers                            
      })
      .then(handleResponse);
    }

    addCardLike(id) {
        return fetch(`${this._url}/${id}/likes`, {
          method: 'PUT',
          headers: this._headers
        })
        .then(handleResponse);
    }

    removeCardLike(id) {
      return fetch(`${this._url}/${id}/likes`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(handleResponse);
    }
}