class UserInfo {
  constructor({nameSelector, positionSelector}) {
    this._nameElement = document.querySelector(nameSelector);
    this._positionElement = document.querySelector(positionSelector);
  }

  getUserInfo() {
    const info = {
      name: this._nameElement.textContent,
      position: this._positionElement.textContent,
    };

    return info;
  }

  setUserInfo({name, position}) {
    this._nameElement.textContent = name;
    this._positionElement.textContent = position;
  }
}

export default UserInfo;
