import Reformator from './reformator.js';

import {
  NUMBER_DOTS,
  cardsOnPage,
} from './constants.js';

let position = 0;

function checkPage() {
  const pages = [...document.getElementsByClassName('page-number')];
  let numberOfPage;

  for (let i = 0; i < pages.length; i++) {
    if (pages[i].classList.contains('active')) {
      numberOfPage = Number(pages[i].innerHTML) - 1;
    }
  }

  const list = document.getElementById('wrapper');

  position = -window.innerWidth * numberOfPage;
  list.style.transition = 'transform 0.5s';
  list.style.transform = `translate3D(${position}px, 0px, 0px)`;
}

const Listener = function Listener(searcher, listener) {
  this.searcher = searcher;
  this.listener = listener;
};

Listener.prototype.listenPrev = function listenPrev() {
  const prev = document.getElementById('prev');
  const pages = [...document.getElementsByClassName('page-number')];

  prev.addEventListener('click', () => {
    const count = Number(pages[0].innerHTML);

    if (count >= NUMBER_DOTS) {
      for (let i = 0; i < NUMBER_DOTS; i++) {
        pages[i].innerHTML = i - NUMBER_DOTS + count;
      }
      checkPage();
    }
  });
};

Listener.prototype.listenNext = async function listenNext() {
  const next = document.getElementById('next');
  const pages = [...document.getElementsByClassName('page-number')];

  next.addEventListener('click', async () => {
    const count = Number(pages[NUMBER_DOTS - 1].innerHTML);

    const wrapper = document.getElementById('wrapper');
    const active = document.querySelector('.active');
    const numberOfPage = active.innerHTML;
    const numberOfCards = wrapper.childNodes.length;
    const maxCardsOnPage = cardsOnPage();

    for (let i = 0; i < NUMBER_DOTS; i++) {
      pages[i].innerHTML = i + 1 + count;
    }

    checkPage();

    // request on new part videos
    if (numberOfCards <= maxCardsOnPage * (Number(numberOfPage) + 3)) {
      let cardsComponents = [];
      let items = [];

      await this.searcher.search().then((videos) => {
        items = videos;
      });

      cardsComponents = Reformator.DataRequestToComponents(items);

      for (let i = 0; i < cardsComponents.length; i++) {
        wrapper.appendChild(cardsComponents[i]);
      }

      this.listener.resize();
    }
  });
};

Listener.prototype.listenPages = function listenPages() {
  const pages = [...document.getElementsByClassName('page-number')];

  pages.forEach((item, id) => {
    item.addEventListener('click', () => {
      pages.forEach((page, index) => {
        if (index === id) {
          page.classList.add('active');
        } else {
          page.classList.remove('active');
        }
      });
      checkPage();
    });
  });
};

export default Listener;
