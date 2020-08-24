export default class Popup {
    constructor() {}
    open(popup) {
        popup.classList.add('popup_is-opened');
    }

    close(popup) {
        popup.classList.remove('popup_is-opened');
    }
}