class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  getInitialsCards(successHandler, errorHandler) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: { ...this._headers, "Content-Type": "application/json" },
    }).then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status} - ${res.statusText}`);
      })
      .then(res => successHandler(res))
      .catch(err => errorHandler(err));
  }
}

export default Api;
