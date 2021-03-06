export default class UserInfo {
    constructor(userNameSelector, userJobSelector, userAvatarSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._userJob = document.querySelector(userJobSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
    }

    getUserInfo() {
        this._userData = {}

        this._userData.name = this._userName.textContent;
        this._userData.about = this._userJob.textContent;

        return this._userData;
    }    

    setUserInfo(newData) {
        this._userName.textContent = newData.name;
        this._userJob.textContent = newData.about;
        this._userAvatar.src = newData.avatar;
        this._userId = newData._id;        
    }    
}