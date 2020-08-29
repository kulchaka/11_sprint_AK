//??-----------------------Impots JS---------------------------
import Api from './Api.js';
import Card from './Card.js';
import CardList from './CardList.js';
import FormValidator from './FormValidator.js';
import Popup from './Popup.js';
import UserInfo from './UserInfo.js';

//??-----------------------Values---------------------------
const placesList = document.querySelector('.places-list');
const buttonAdd = document.querySelector('.user-info__button');
const buttonEdit = document.querySelector('.user-info__place-edit');
const addPopup = document.querySelector('.popup_add');
const editPopup = document.querySelector('.popup-edit');
const closePopup = document.querySelector('.popup__close');
const closePopupEdit = document.querySelector('.popup-edit__close');
const imagePopup = document.querySelector('.popup-image');
const closeImagePopup = document.querySelector('.popup-image__close');
const formEdit = document.querySelector('.popup-edit__form');
const nameEditInput = document.querySelector('.popup-edit__input_type_name')
const aboutEditInput = document.querySelector('.popup-edit__input-dscr')
const formAddCard = document.querySelector('.popup__form');
const nameInfo = document.querySelector('.user-info__name');
const dscrInfo = document.querySelector('.user-info__job');
const avatar = document.querySelector('.user-info__photo')
const popupImage = document.querySelector('.popup-image__picture');
const popUpAvatar = document.querySelector('.popup-avatar');
const closeAvatar = document.querySelector('.popup-avatar__close');
const openAvatar = document.querySelector('.user-info__photo');
const formAvatar = document.querySelector('.popup-avatar__form');
const avatarInput = document.querySelector('.popup-avatar__input_type_link-url');



//??-----------------------Functions------------------------

//reset Spans
function resetSpans(event) {
  let spanErrors = event.target.parentNode.querySelectorAll('span');
  [...spanErrors].forEach(elem => elem.textContent = '');
}

//!!------------------------9sprint
//?? - Cards
const headers = {
  authorization: '7390d4ed-f62e-4546-96f8-a025e7f7b13e',
};

const apiCards = new Api('https://nomoreparties.co/cohort12/cards', headers);

//?? - UserInfo
const apiUser = new Api('https://nomoreparties.co/cohort12/users/me', headers);


//!!------------------------

//creatCallBack Function
function createCardCallBack(name, link, numbers) {
  return new Card(name, link, numbers).creat();
}
//CradList Render
const cardList = new CardList(placesList, apiCards, createCardCallBack);
cardList.render();

const addPop = new Popup();

const formValidation = new FormValidator();

const userInfo = new UserInfo(apiUser, nameInfo, dscrInfo, avatar, addPop, formValidation);



//Update User Info
userInfo.updateUserInfo();




//??-----------------------Listeners------------------------

//Open PopUpAdd Card
buttonAdd.addEventListener('click', () => {
  formAddCard.querySelector('button').classList.remove('popup__button_valid');
  formAddCard.querySelector('button').setAttribute('disabled', true);
  addPop.open(addPopup);
});

//Open PopEdit
buttonEdit.addEventListener('click', () => {

  userInfo.updateUserInfoForm(formEdit, nameInfo, dscrInfo);
  addPop.open(editPopup);
});

placesList.addEventListener('click', (event) => {
  if (event.target.classList.contains('place-card__image')) {
    addPop.open(imagePopup);
    popupImage.setAttribute('src', `${event.target.dataset.url}`);
  }
});

//Open PopUP Avatar
openAvatar.addEventListener('click', () => {
  formAvatar.querySelector('button').classList.remove('popup__button_valid');
  formAvatar.querySelector('button').setAttribute('disabled', true);
  addPop.open(popUpAvatar);
});

//Close PopUpAdd
closePopup.addEventListener('click', (event) => {
  addPop.close(addPopup);
  formAddCard.reset();
  resetSpans(event);
});

//Close PopUpEdit
closePopupEdit.addEventListener('click', (event) => {
  addPop.close(editPopup);
  formEdit.reset();
  resetSpans(event);
});

//Close Image
closeImagePopup.addEventListener('click', () => {
  addPop.close(imagePopup);
});

//Close Avatar Popup
closeAvatar.addEventListener('click', (event) => {
  addPop.close(popUpAvatar);
  formAvatar.reset();
  resetSpans(event);
});

//Add Card
formAddCard.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = formAddCard.elements.name;
  const link = formAddCard.elements.link;
  cardList.sendCardServer(name, link);
  formAddCard.reset();
  addPop.close(addPopup);
});

//Add UserInfo
formEdit.addEventListener('submit', (event) => {
  event.preventDefault();
  userInfo.setUserInfo(nameEditInput, aboutEditInput, editPopup);
});

//EditForm inputs
formEdit.addEventListener('input', (event) => formValidation.setEventListeners(event.target));

//AvatarForm input
formAvatar.addEventListener('input', (event) => formValidation.setEventListeners(event.target));

//AddCardForm inputs
formAddCard.addEventListener('input', (event) => formValidation.setEventListeners(event.target));

//Send Avatar
formAvatar.addEventListener('submit', (event) => {
  event.preventDefault();
  userInfo.setUserInfoAvatar(avatarInput, popUpAvatar);
  formAvatar.reset();
});