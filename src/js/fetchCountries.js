const BASE_URL = 'https://restcountries.com/v3.1';

export default class NewsCountries {
  constructor() {
    this.searchQuery = '';
  }

  fetchCountries() {
    return fetch(
      `${BASE_URL}/name/${this.searchQuery}?fields=name,capital,population,flags,languages`,
    ).then(respons => respons.json());
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
