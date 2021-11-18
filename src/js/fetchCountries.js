const BASE_URL = 'https://restcountries.com/v3.1';

const fetchCountries = country => {
  return fetch(`${BASE_URL}/name/${country}?fields=name,capital,population,flags,languages`).then(
    response => {
      return response.json();
    },
  );
};

export { fetchCountries };
