class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}, {name, about, _id, avatar, cohort}) {
    //Селекторы вывода информации пользователя
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);

    //Данные пользователя
    this._name = name;
    this._about = about;
    this._id = _id;
    this._avatar = avatar;
    this._cohort = cohort;

    this._renderInfo();
  }

  _renderInfo() {
    this._nameElement.textContent = this._name;
    this._aboutElement.textContent = this._about;
    this._avatarElement.src = this._avatar;
  }

  getUserInfo() {
    const info = {
      name: this._name,
      about: this._about,
      _id: this._id,
      avatar: this._avatar,
      cohort: this._cohort
    };

    return info;
  }

  setUserInfo({name, about}) {
    this._name = name;
    this._about = about;

    this._renderInfo();
  }

  getUserId() {
    return this._id;
  }

  setUserAvatar(avatarLink) {
    this._avatar = avatarLink;

    this._renderInfo();
  }

  getUserAvatar() {
    return this._avatar;
  }
}

export default UserInfo;
