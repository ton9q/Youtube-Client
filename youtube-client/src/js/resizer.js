import {
  SMALL,
  MEDIUM,
  SMALL_NUMBER_CARD,
  MEDIUM_NUMBER_CARD,
  LARGE_NUMBER_CARD,
} from './constants.js';

function Resizer() {}

function objToStr(object) {
  let str = '';

  for (let prop in object) { // eslint-disable-line
    str += `${prop}: ${object[prop]}; `;
  }

  return str;
}

function getNumberFromString(str) {
  return parseInt(str, 10);
}

function constHeightElements() {
  const searchBox = document.querySelector('.search-box');
  const heightSearchBox = getNumberFromString(window.getComputedStyle(searchBox).getPropertyValue('height'));
  const pages = document.querySelector('.pages');
  const heightPages = getNumberFromString(window.getComputedStyle(pages).getPropertyValue('height'));
  return heightSearchBox + heightPages;
}

Resizer.prototype.listen = function listen() {
  window.addEventListener('resize', this.resize);
};

Resizer.prototype.resize = function calculate() {
  const listCards = document.getElementsByClassName('card');
  const cards = document.getElementById('cards');
  const heightBusy = constHeightElements();

  if (listCards.length > 0) {
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
    const coeffWrapperCard = 0.7;
    let numberCardsOnPage;
    let cssTextforCard = {
      width: '',
      margin: '',
      height: '',
    };

    if (displayWidth < SMALL) {
      numberCardsOnPage = SMALL_NUMBER_CARD;
      if (displayHeight > 800) {
        cssTextforCard.height = `${(displayHeight - heightBusy) * 0.9}px`;
      }
      cssTextforCard.height = '400px';
    } else if (displayWidth < MEDIUM) {
      numberCardsOnPage = MEDIUM_NUMBER_CARD;
      cssTextforCard.height = '400px';
      if (displayHeight > 800) {
        cssTextforCard.height = `${(displayHeight - heightBusy) * 0.6}px`;
      }
    } else {
      numberCardsOnPage = LARGE_NUMBER_CARD;
      cssTextforCard.height = '400px';
    }

    cssTextforCard.width = `${Math.floor(displayWidth * 0.8 / numberCardsOnPage)}px`;

    cssTextforCard.margin = `
    ${displayHeight > getNumberFromString(cssTextforCard.height)
    ? (displayHeight * coeffWrapperCard - getNumberFromString(cssTextforCard.height)) / 2 : 0}px 
    ${(displayWidth - numberCardsOnPage * getNumberFromString(cssTextforCard.width))
      / (2 * numberCardsOnPage)}px
    `;

    const widthImg = cssTextforCard.width;
    const heightCard = cssTextforCard.height;

    let heightImg;

    if (displayHeight > 800) {
      heightImg = `${getNumberFromString(widthImg) * 0.6}px`;
    } else {
      heightImg = '150px';
    }

    cssTextforCard = objToStr(cssTextforCard);

    for (let i = 0; i < listCards.length; i++) {
      listCards[i].setAttribute('style', cssTextforCard);

      listCards[i]
        .querySelector('img')
        .setAttribute(
          'style',
          `width: ${widthImg}; height: ${heightImg}`,
        );

      listCards[i]
        .querySelector('.description')
        .setAttribute(
          'style',
          `height: ${getNumberFromString(heightCard) - getNumberFromString(heightImg) - 92 - 32}px`,
        );

      listCards[i]
        .querySelector('.header')
        .setAttribute(
          'style',
          `width: ${getNumberFromString(widthImg) - 10}px`,
        );
    }
    cards.setAttribute('style', `height: ${displayHeight * 0.7}px`);
  }
};

export default Resizer;
