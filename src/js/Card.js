export default class Card {
  constructor(name, link, numbers) {
    this.name = name;
    this.link = link;
    this.numbers = numbers;
  }

  creat() {
    const creatCard = `<div class="place-card">
    <div class="place-card__image">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name"></h3>
      <div class="place-card__likes">
         <button class="place-card__like-icon"></button>
         <div class="place-card__numbers">0</div>
      </div>
    </div>
  </div>`;

    const elem = document.createElement('div');
    elem.insertAdjacentHTML('afterbegin', creatCard);
    const newCard = elem.firstElementChild;
    this.newCard = newCard;

    newCard.querySelector('.place-card__name').textContent = this.name;
    newCard.querySelector('.place-card__image').style.backgroundImage = `url(${this.link})`;
    newCard.querySelector('.place-card__image').dataset.url = this.link;
    newCard.querySelector('.place-card__numbers').textContent = this.numbers;

    this.setListener();

    return newCard;
  }

  like() {
    this.classList.toggle('place-card__like-icon_liked');
  }


  remove() {
    this.closest('.place-card').remove();
  }

  setListener() {
    this.newCard.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.newCard.querySelector('.place-card__delete-icon').addEventListener('click', this.remove);
  }
}