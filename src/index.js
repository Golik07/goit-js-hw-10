import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const cat = document.querySelector('.cat-info');

select.style.display = 'none';
loader.style.display = 'flex';
error.style.display = 'none';

fetchBreeds()
  .then(data => {
    select.style.display = 'flex';
    loader.style.display = 'none';
    nameCats(data);
  })
  .catch(error => {
    loader.style.display = 'none';
    error.style.display = 'flex';
  });

function nameCats(cats) {
  const render = cats
    .map(cat => {
      return `<option value = ${cat.id}>${cat.name}</option>`;
    })
    .join('');
  select.insertAdjacentHTML('afterbegin', render);
}

select.addEventListener('change', setOutput);

function setOutput() {
  clearArticles();
  error.style.display = 'none';
  loader.style.display = 'flex';
  fetchCatByBreed(select.value)
    .then(data => {
      loader.style.display = 'none';

      renderCats(data);
    })
    .catch(error => {
      error.style.display = 'flex';
      loader.style.display = 'none';
    });
}

function renderCats(cats) {
  const renderCat = cats.map(
    ({
      url,
      breeds: [{ name, description, temperament }],
    }) => `<img src="${url}" alt="${name}" height="auto" width="800"/>
      <div class="description">
      <h2>${name}</h2>
      <p class ="text">${description}</p>
      <p><span class="temperament">Temperament: </span>${temperament}</p>
      </div>`
  );
  cat.insertAdjacentHTML('afterbegin', renderCat);
}

function clearArticles() {
  cat.innerHTML = '';
}
