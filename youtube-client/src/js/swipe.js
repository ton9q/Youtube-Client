import {
  cardsOnPage,
} from './constants.js';

function checkLastPage() {
  const wrapper = document.getElementById('wrapper');
  const active = document.querySelector('.active');
  const numberOfPage = active.innerHTML;
  const numberOfCards = wrapper.childNodes.length;
  const maxCardsOnPage = cardsOnPage();

  if (numberOfCards <= maxCardsOnPage * Number(numberOfPage)) { // request on new part videos
    const next = document.getElementById('next');
    next.click(); // next.dispatchEvent(new Event('click'));
  }
}

function Swipe(searcher) {
  this.videos = document.getElementById('wrapper');
  this.searcher = searcher;

  const active = document.querySelector('.active');
  let numberOfPage;
  if (active == null) {
    numberOfPage = 0;
  } else {
    numberOfPage = active.innerHTML - 1;
  }

  this.activatePage(numberOfPage);
  this.videos.addEventListener('mousedown', this.clickHandler.bind(this), false);
  this.videos.addEventListener('touchstart', this.clickHandler.bind(this), false);
}

Swipe.prototype.activatePage = function activatePage(number) {
  // number - next page number
  const pages = document.querySelectorAll('.page-number');
  // number of page in 4 dots [0 1 2 3]
  const bufNumber = ((number + 1) % 4) - 1 >= 0 ? ((number + 1) % 4) - 1 : 3;
  // number of pagelist
  const numberOfPageList = Math.floor(number / 4);
  for (let i = 0; i < pages.length; i++) {
    // console.log(number, i, bufNumber);
    pages[i].innerHTML = i + (numberOfPageList * 4) + 1;
    if (i === bufNumber) {
      pages[i].classList.add('active');
    } else {
      pages[i].classList.remove('active');
    }
  }
};

Swipe.prototype.clickHandler = function clickHandler(event) {
  const active = document.querySelector('.active');
  const videos = document.querySelector('.wrapper');
  let trans;
  let shiftX;
  let numberOfPage;

  if (active == null) {
    numberOfPage = 0;
  } else {
    numberOfPage = active.innerHTML - 1;
  }

  trans = document.body.clientWidth * numberOfPage;

  if (event.changedTouches === undefined) {
    shiftX = event.pageX;
  } else {
    shiftX = event.changedTouches[0].pageX;
  }

  videos.style.transition = 'transform 0s';

  function clickMoveAt(event) {
    let pageX1;
    if (event.changedTouches === undefined) {
      pageX1 = event.pageX;
    } else {
      pageX1 = event.changedTouches[0].pageX;
    }
    videos.style.transform = `translate3D(${-trans + pageX1 - shiftX}px, 0px, 0px)`;
  }

  document.addEventListener('mousemove', clickMoveAt);
  document.addEventListener('touchmove', clickMoveAt);

  const activatePage = this.activatePage; // eslint-disable-line

  function endHandler(event) {
    const active = document.querySelector('.active');
    let numberOfpage;

    if (active == null) {
      numberOfpage = 0;
    } else {
      numberOfpage = active.innerHTML - 1;
    }

    const videos = document.querySelector('.wrapper');
    let pageX2;

    if (event.changedTouches === undefined) {
      pageX2 = event.pageX;
    } else {
      pageX2 = event.changedTouches[0].pageX;
    }

    document.removeEventListener('mousemove', clickMoveAt);
    document.removeEventListener('touchmove', clickMoveAt);

    if (pageX2 < shiftX) {
      numberOfpage += 1;
      checkLastPage();
    } else if (pageX2 > shiftX && numberOfpage !== 0) {
      numberOfpage -= 1;
    }

    activatePage(numberOfpage);

    trans = window.innerWidth * numberOfpage;
    videos.style.transition = 'transform 0.5s';
    videos.style.transform = `translate3D(${-trans}px, 0px, 0px)`;

    document.removeEventListener('mouseup', endHandler, false);
    document.removeEventListener('touchend', endHandler, false);
  }

  document.addEventListener('mouseup', endHandler, false);
  document.addEventListener('touchend', endHandler, false);
};

export default Swipe;
