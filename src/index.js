import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';

refs = {
  select: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  cat: document.querySelector('.cat-info'),
};

refs.select.style.display = 'none';
refs.loader.style.display = 'flex';
refs.error.style.display = 'none';

fetchBreeds()
  .then(data => {
    refs.select.style.display = 'flex';
    refs.loader.style.display = 'none';
    nameCats(data);
  })
  .catch(error => {
    refs.loader.style.display = 'none';
    refs.error.style.display = 'flex';
  });

function nameCats(cats) {
  const render = cats
    .map(cat => {
      return `<option value = ${cat.id}>${cat.name}</option>`;
    })
    .join('');
  refs.select.insertAdjacentHTML('afterbegin', render);
}

refs.select.addEventListener('change', setOutput);

function setOutput() {
  clearArticles();
  refs.error.style.display = 'none';
  refs.loader.style.display = 'flex';
  fetchCatByBreed(refs.select.value)
    .then(data => {
      refs.loader.style.display = 'none';

      renderCats(data);
    })
    .catch(error => {
      refs.error.style.display = 'flex';
      refs.loader.style.display = 'none';
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
  refs.cat.insertAdjacentHTML('afterbegin', renderCat);
}

function clearArticles() {
  refs.cat.innerHTML = '';
}
