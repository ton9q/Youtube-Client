import Searcher from './searcher.js';
import Render from './render.js';
import Listener from './listener.js';
import Swipe from './swipe.js';
import Reformator from './reformator.js';
import Resizer from './resizer.js';

import {
  NUMBER_DOTS,
} from './constants.js';

require('../css/style.css');

const searcher = new Searcher();
const resizer = new Resizer();
const listener = new Listener(searcher, resizer);

const root = document.getElementById('root');
resizer.listen();

async function startSearch() {
  let cardsComponents = [];
  let cardsBundle = [];
  let items = [];

  Render.deleteElementById('cards');
  Render.deleteElementById('pages');

  searcher.changeParamsSearching();

  await searcher.search().then((videos) => {
    items = videos;
  });

  cardsComponents = Reformator.DataRequestToComponents(items);
  cardsBundle = Render.createCardsBundle(cardsComponents);
  root.appendChild(cardsBundle);

  Render.addPages(NUMBER_DOTS);
  Render.createDiv();
  listener.listenPrev();
  listener.listenNext();
  listener.listenPages();

  const swipe = new Swipe(searcher); // eslint-disable-line
  resizer.resize();

  const pages = document.getElementById('pages');
  pages.classList.remove('none');
}

(function init() {
  function onkeydownInput(e) {
    e = e || window.event;
    switch (e.keyCode) {
      case 13:
        e.preventDefault();
        startSearch();
        break;
      default:
        break;
    }
  }

  const inputData = {
    placeholder: 'Type your query',
    id: 'input-search',
    className: 'input-search',
    onkeydown: onkeydownInput,
  };

  const buttonData = {
    inner: 'Search',
    id: 'button-search',
    className: 'button-search',
    onClick: startSearch,
  };

  Render.addSearchBox(inputData, buttonData);
}());
