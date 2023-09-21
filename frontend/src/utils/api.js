class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }

  // Проверку статуса ответа сервера
  _checkStatus(res) {
    return res.ok ? res.json() : Promise.reject()
  }

  // Загрузка карточек с сервера
  getInitialCards(token) {
    return fetch(`${this._url}/cards`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(this._checkStatus)
  }

  // Загрузка информации о пользователе с сервера
  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(this._checkStatus)
  }

  // Редактирование профиля
  setUserInfo(data, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: data.title,
        about: data.about,
      })
    })
    .then(this._checkStatus)
  }

  // Обновление аватара пользователя
  setAvatar(data, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
    .then(this._checkStatus)
  }

  // Добавление новой карточки
  addNewCard(data, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    })
    .then(this._checkStatus)
  }

  // Постановка и снятие лайка
  likeCard(cardId, like, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: like ? 'DELETE' : 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(this._checkStatus)
  }

  // Удаление карточки
  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(this._checkStatus)
  }
}

const api = new Api({
  baseUrl: 'https://api.react.mesto.api.full.nomoredomainsrocks.ru',
});

export default api;