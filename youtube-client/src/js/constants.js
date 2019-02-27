export const SMALL = 700;
export const MEDIUM = 1050;

export const SMALL_NUMBER_CARD = 1;
export const MEDIUM_NUMBER_CARD = 2;
export const LARGE_NUMBER_CARD = 4;

export const NUMBER_DOTS = 4;

export const NUMBER_VIDEOS_REQUEST = 16;

export function cardsOnPage() {
  let cards;
  if (window.innerWidth < SMALL) {
    cards = SMALL_NUMBER_CARD;
  } else if (window.innerWidth < MEDIUM) {
    cards = MEDIUM_NUMBER_CARD;
  } else {
    cards = LARGE_NUMBER_CARD;
  }
  return cards;
}
