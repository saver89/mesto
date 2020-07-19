class UserInfo {
  constructor(selectors, props) {
    //Селекторы вывода информации пользователя
    this._nameElement = document.querySelector(selectors.nameSelector);
    this._aboutElement = document.querySelector(selectors.aboutSelector);
    this._avatarElement = document.querySelector(selectors.avatarSelector);

    //Данные пользователя
    this._name = props.name;
    this._about = props.about;
    this._id = props._id;
    this._avatar = props.avatar;
    this._cohort = props.cohort;

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
