import './css/styles.css';
import NewsCountries from './js/fetchCountries.js';
import debounce from 'lodash.debounce';
import countryCard from './templates/country.hbs';
import countriesList from './templates/countries.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const newCountries = new NewsCountries();
const creatMarkupCountries = countries => {
  refs.countryList.insertAdjacentHTML('afterbegin', countriesList(countries));
};
const creatMarkupCountry = country => {
  refs.countryInfo.insertAdjacentHTML('afterbegin', countryCard(country));
};

const onFetchCountries = async () => {
  try {
    const data = await newCountries.fetchCountries();

    if (data.length > 10) {
      Notify.info('Too many matches found. Please enter a more specific name.');
      refs.countryInfo.innerHTML = '';
      refs.countryList.innerHTML = '';

      return;
    }
    if (data.length > 1 && data.length <= 10) {
      creatMarkupCountries(data);
      refs.countryInfo.innerHTML = '';
      return;
    }
    if (data.length === 1) {
      creatMarkupCountry(data);
      refs.countryList.innerHTML = '';
      return;
    }
  } catch (error) {
    Notify.failure(`Oops, there is no country with that name!!!${error.message}`);
  }
};
//

const onSearch = async e => {
  refs.countryInfo.innerHTML = '';
  refs.countryList.innerHTML = '';

  newCountries.query = e.target.value.trim('');
  onFetchCountries();
};

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));
