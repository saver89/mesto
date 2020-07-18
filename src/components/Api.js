class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _fetchApi(url, method, additionalHeaders, body) {
    let fetchOptions = {
      method: method,
      headers: { ... this._headers, ...additionalHeaders },
    };
    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }

    return fetch(`${this._baseUrl}${url}`, fetchOptions).then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
      });
  }

  //Операции с карточками
  getInitialsCards() {
    return this._fetchApi("/cards", "GET");
  }

  postCard(card) {
    return this._fetchApi("/cards", "POST", {"Content-Type": "application/json"}, card);
  }

  removeCard(cardId) {
    return this._fetchApi(`/cards/${cardId}`, "DELETE");
  }

  likeCard(cardId) {
    return this._fetchApi(`/cards/likes/${cardId}`, "PUT");
  }

  unlikeCard(cardId) {
    return this._fetchApi(`/cards/likes/${cardId}`, "DELETE");
  }

  //Операции с данными пользователя
  getUserInfo() {
    return this._fetchApi("/users/me", "GET");
  }

  editUserInfo(info) {
    return this._fetchApi("/users/me", "PATCH", {"Content-Type": "application/json"}, info);
  }
}

export default Api;
