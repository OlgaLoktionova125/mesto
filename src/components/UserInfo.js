export default class UserInfo {
    constructor(userNameSelector, userJobSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
    }

    getUserInfo() {
        this._userData = {}

        this._userData.userName = this._userName.textContent;
        this._userData.userJob = this._userJob.textContent;

        return this._userData;
    }

    setUserInfo(newData) {
        this._userName.textContent = newData.userName;
        this._userJob.textContent = newData.userJob;
    }
}