import Render from './render.js';

export default {
  DataRequestToComponents: function DataRequestToComponents(itemsFromReq) {
    const cardsComponents = [];
    const cardsInfo = [];
    const items = itemsFromReq;

    for (let i = 0; i < items.length; i++) {
      cardsInfo[i] = {};
      cardsInfo[i].videoId = items[i].id;
      cardsInfo[i].title = items[i].snippet.title;
      cardsInfo[i].image = items[i].snippet.thumbnails.medium.url;
      cardsInfo[i].channel = items[i].snippet.channelTitle;
      cardsInfo[i].date = items[i].snippet.publishedAt;
      cardsInfo[i].viewCount = items[i].statistics.viewCount;
      cardsInfo[i].description = items[i].snippet.description;
    }

    for (let i = 0; i < items.length; i++) {
      const card = Render.createCard(cardsInfo[i]);
      cardsComponents.push(card);
    }

    return cardsComponents;
  },
};
