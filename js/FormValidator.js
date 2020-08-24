export default class FormValidator {
    constructor() {

    }

    checkInputValidity(input) {
        let inputValid;
        if (input.validity.valid) {
            input.nextElementSibling.textContent = '';
            inputValid = true;
        }

        if (input.validity.valueMissing) {
            input.nextElementSibling.textContent = 'Это обязательное поле';
            inputValid = false;
        }

        if (input.validity.tooShort || input.validity.tooLong) {
            input.nextElementSibling.textContent = 'Должно быть от 2 до 30 символов';
            inputValid = false;
        }
        if (input.validity.patternMismatch) {
            input.nextElementSibling.textContent = 'Здесь должна быть ссылка';
            inputValid = false;
        }
        return inputValid;
    }


    setSubmitButtonState(button, state) {
        if (state) {
            button.removeAttribute('disabled');
            button.classList.add('popup__button_valid');

        } else {
            button.setAttribute('disabled', true);
            button.classList.remove('popup__button_valid');
        }
    }

    setEventListeners(input) {
        const [...inputs] = input.parentNode.querySelectorAll('input');
        const button = input.parentNode.querySelector('button');
        if (inputs.every((el) => this.checkInputValidity(el))) {
            this.setSubmitButtonState(button, true);
        } else {
            this.setSubmitButtonState(button, false);
        }
        this.checkInputValidity(input);
    }
}