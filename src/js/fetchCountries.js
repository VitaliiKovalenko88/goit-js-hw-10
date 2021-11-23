import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';
axios.defaults.baseURL = BASE_URL;

export default class NewsCountries {
  constructor() {
    this.searchQuery = '';
  }

  async fetchCountries() {
    const response = await axios.get(
      `/name/${this.searchQuery}?fields=name,capital,population,flags,languages`,
    );
    const dataNames = await response.data;

    return dataNames;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
