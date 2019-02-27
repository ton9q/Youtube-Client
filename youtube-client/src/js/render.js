import Button from './components/button.js';
import Header from './components/header.js';
import Icon from './components/icon.js';
import Image from './components/image.js';
import Input from './components/input.js';
import Link from './components/link.js';
import Paragraph from './components/paragraph.js';
import Wrapper from './components/wrapper.js';

const root = document.getElementById('root');

class Worker {
  static deleteElementById(id) {
    const element = document.getElementById(id);
    if (element !== null) {
      element.remove();
    }
  }

  static addSearchBox(inputData, buttonData) {
    const inputSearch = Input(inputData);
    const buttonSearch = Button(buttonData);
    const searchBox = Wrapper([inputSearch, buttonSearch], 'search-box');
    root.appendChild(searchBox);
  }

  static addPages(pageNumbers, startNumeration) {
    const pages = [];
    const pagesNumber = [];
    const page = Wrapper(null, 'page-number');
    const prev = Wrapper(null, 'prev', 'prev');
    const next = Wrapper(null, 'next', 'next');
    prev.classList.add('none');
    next.classList.add('none');
    if (typeof startNumeration === 'undefined') {
      startNumeration = 0;
    }
    for (let i = startNumeration; i < pageNumbers; i++) {
      const pageClone = page.cloneNode(true);
      if (i === startNumeration) pageClone.classList.add('active');
      pageClone.innerHTML = i + 1;
      pagesNumber.push(pageClone);
    }
    const pagesNumberBundle = Wrapper(pagesNumber, 'numbers', 'numbers');

    pages.push(prev);
    pages.push(pagesNumberBundle);
    pages.push(next);

    const pagesBundle = Wrapper(pages, 'pages', 'pages');
    pagesBundle.classList.add('none');
    root.appendChild(pagesBundle);
  }

  static createCard(data) {
    const iconMan = Icon(['fas', 'fa-male']);
    const iconCalendar = Icon(['far', 'fa-calendar-alt']);
    const iconViews = Icon(['far', 'fa-eye']);

    const link = `https://www.youtube.com/watch?v=${data.videoId}`;
    const dateWithoutTime = data.date.slice(0, data.date.indexOf('T'));

    const a = Link({ href: link, text: data.title });
    const header = Header({ title: a, number: '3' }, 'header');
    const image = Image({ src: data.image, alt: 'preview-image' });
    const description = Paragraph(data.description, 'description');
    const channel = Paragraph(data.channel, 'title');
    const date = Paragraph(dateWithoutTime, 'title');
    const views = Paragraph(data.viewCount, 'title');
    const channelBundle = Wrapper([iconMan, channel], 'channel');
    const dateBundle = Wrapper([iconCalendar, date], 'date');
    const viewsBundle = Wrapper([iconViews, views], 'views');
    const aboutBundle = Wrapper([channelBundle, dateBundle, viewsBundle], 'about');

    return Wrapper([header, image, aboutBundle, description], 'card');
  }

  static createCardsBundle(cardsComponents) {
    const cards = Wrapper(cardsComponents, 'wrapper', 'wrapper');
    const cardsBundle = Wrapper(cards, 'cards', 'cards');
    return cardsBundle;
  }

  static createDiv() {
    root.appendChild(Wrapper(null, 'pagination', 'pagination'));
  }
}

export default Worker;
