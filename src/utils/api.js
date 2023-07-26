class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._authorization = options.headers.authorization;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      headers: {
        authorization: this._authorization,
      }
    })
      .then(this._getResponseData);
  };

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        authorization: this._authorization,
      }
    })
      .then(this._getResponseData);
  };

  setUserInfo(data) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(this._getResponseData);
  }

  createNewCard(name, link) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(this._getResponseData);
  };


  deleteCard(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    })
      .then(this._getResponseData);
  };

  addLike(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
      },
    })
      .then(this._getResponseData);
  }

  deleteLike(cardId) {
    return fetch(this._baseUrl + '/cards/' + cardId + '/likes', {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
      },
    })
      .then(this._getResponseData);
  }

  updateUserAvatar(avatar) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    })
      .then(this._getResponseData);
  }

  getUserInfoAuth(token) {
    return fetch('https://auth.nomoreparties.co/users/me', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    })
      .then(this._getResponseData);
  }

  login(email, password) {
    return fetch('https://auth.nomoreparties.co/signin', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(this._getResponseData);
  }

  register(email, password) {
    return fetch('https://auth.nomoreparties.co/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(this._getResponseData);
  }

}

export const api = new Api({
  baseUrl: 'https://auth.nomoreparties.co/v1/cohort-68',
  // baseUrl: 'https://auth.nomoreparties.co',
  headers: {
    authorization: 'd04afa61-1239-4cd9-8e4f-6ea23509e870',
    'Content-Type': 'application/json'
  }
});