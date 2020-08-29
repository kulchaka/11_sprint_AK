export default class Api {
    constructor(url, headers) {
        this.url = url;
        this.headers = headers;
    }

    getTasks() {
        return fetch(this.url, {
                headers: this.headers
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    sendCard(name, link) {
        return fetch('https://nomoreparties.co/cards', {
                method: 'POST',
                headers: {
                    authorization: '7390d4ed-f62e-4546-96f8-a025e7f7b13e',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name.value,
                    link: link.value
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    setInfoUser(nameInput, aboutInput) {
        return fetch(this.url, {
                method: 'PATCH',
                headers: {
                    authorization: '7390d4ed-f62e-4546-96f8-a025e7f7b13e',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: nameInput.value,
                    about: aboutInput.value
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }

    setAvatar(avatar) {
        return fetch('https://nomoreparties.co/cohort12/users/me/avatar', {
                method: 'PATCH',
                headers: {
                    authorization: '7390d4ed-f62e-4546-96f8-a025e7f7b13e',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    avatar: avatar.value
                })
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
    }
}