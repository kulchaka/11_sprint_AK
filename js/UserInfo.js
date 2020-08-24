export default class UserInfo {
    constructor(info, inputName, inputInfo, avatar, popClass, validation) {
        this.info = info;
        this.inputName = inputName;
        this.inputInfo = inputInfo;
        this.avatar = avatar;
        this.popClass = popClass;
        this.validation = validation;
    }

    setUserInfo(name, about, popup) {
        this.info.setInfoUser(name, about)
            .then((res) => {
                this.inputName.textContent = res.name;
                this.inputInfo.textContent = res.about;
                this.popClass.close(popup);

            })
            .catch((err) => {
                console.log(err);
            });

    }

    setUserInfoAvatar(avatar, closePopup) {
        this.info.setAvatar(avatar)
            .then((res) => {
                this.avatar.style.backgroundImage = `url("${res.avatar}")`;
                this.popClass.close(closePopup);
            })
            .catch((err) => {
                console.log(err);
            });

    }

    updateUserInfo() {
        this.info.getTasks()
            .then((res) => {
                this.inputName.textContent = res.name;
                this.inputInfo.textContent = res.about;
                this.avatar.style.backgroundImage = `url(${res.avatar})`;
            })
            .catch((err) => {
                console.log(err);
            });
    }


    updateUserInfoForm(form, name, info) {
        form.elements.name.setAttribute('value', `${name.textContent}`);
        form.elements.link.setAttribute('value', `${info.textContent}`);
        form.querySelectorAll('input').forEach(el => this.validation.setEventListeners(el));
    }
}