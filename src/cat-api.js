const BASE_URL = 'https://api.thecatapi.com/v1/breeds';
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_HU608P4W5RF0pEJpR6OyDEpXlSYJrLdy6pdu3wXOLHTHyoN74Z27R7vPHQFrhNxd';

export function fetchBreeds() {
  return axios.get(BASE_URL).then(response => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => {
      return response.data;
    });
}
