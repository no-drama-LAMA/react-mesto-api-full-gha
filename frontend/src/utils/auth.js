export const BASE_URL = 'https://api.react.mesto.api.full.nomoredomainsrocks.ru';

function checkStatus(res) {
  return res.ok ? res.json() : Promise.reject(`${res.status}`)
}

export function registration(password, email) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: password, email: email })
  })
    .then((res) => checkStatus(res))
}

export function authorization(password, email) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password: password, email: email })
  })
    .then((res) => checkStatus(res))
}

export function getUserInfo(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => checkStatus(res))
}