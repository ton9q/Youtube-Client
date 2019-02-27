// api key: AIzaSyDgg61Rp7mefcTkDX8MQOhY1axnva2chw0

import {
  NUMBER_VIDEOS_REQUEST,
} from './constants.js';

class Searcher {
  constructor() {
    this.key = 'key=AIzaSyDgg61Rp7mefcTkDX8MQOhY1axnva2chw0';
    this.rootRequestURLSearch = `https://www.googleapis.com/youtube/v3/search?${this.key}`;
    this.rootRequestURLVideos = `https://www.googleapis.com/youtube/v3/videos?${this.key}`;
    this.params = {
      qParam: '&q=',
      type: '&type=video',
      part: '&part=snippet',
      order: '&order=viewCount',
      id: '&id=',
    };
    this.numberResults = NUMBER_VIDEOS_REQUEST;
    this.pageToken = '';
    this.response = {};
    this.isEndOfRequest = false;
    this.requestURL = '';
  }

  getItemsFromResponse() {
    return this.response.items;
  }

  changeParamsSearching() {
    this.params.qParam = `&q=${document.getElementById('input-search').value.replace(/ /g, '+')}`;
    this.pageToken = '';
  }

  searchVideos() {
    this.requestURL = this.rootRequestURLSearch;
    const {
      type, part, order, qParam,
    } = this.params;
    this.requestURL += `${type + part}&maxResults=${this.numberResults + order + qParam}&pageToken=${this.pageToken}`;

    return new Promise((resolve) => {
      const xmlHttp = new XMLHttpRequest();
      xmlHttp.open('GET', this.requestURL, true);
      xmlHttp.onload = (res) => {
        this.pageToken = JSON.parse(res.target.response).nextPageToken;
        this.response = JSON.parse(res.target.response);
        resolve(this.response);
      };
      xmlHttp.send();
    });
  }

  searchWithStatisticsVideos() {
    const ids = [];

    return new Promise((resolve, reject) => {
      this.searchVideos()
        .then((result) => {
          result.items.forEach((element) => {
            ids.push(element.id.videoId);
          });
          const statistics = ',statistics';
          const strIds = `&id=${ids.join()}`;
          this.requestURL = this.rootRequestURLVideos;
          this.requestURL += strIds + this.params.part + statistics;

          const xmlHttp = new XMLHttpRequest();
          xmlHttp.open('GET', this.requestURL, true);
          xmlHttp.onload = (res) => {
            this.response = JSON.parse(res.target.response);
            resolve(this.response.items);
          };
          xmlHttp.onerror = (err) => {
            reject(err.status);
          };
          xmlHttp.send();
        });
    });
  }

  search() {
    return new Promise((resolve) => {
      this.searchWithStatisticsVideos()
        .then((result) => {
          resolve(result);
        });
    });
  }
}

export default Searcher;
