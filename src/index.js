import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const cat = document.querySelector('.cat-info');

select.style.display = 'none';
loader.style.display = 'flex';

fetchBreeds()
  .then(data => {
    select.style.display = 'flex';
    loader.style.display = 'none';

    nameCats(data);
    new SlimSelect({
      select: '.breed-select',
    });
  })
  .catch(error => {
    loader.style.display = 'none';
    Notiflix.Notify.failure(
      `❌ Oops! Something went wrong! Try reloading the page!`
    );
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

  loader.style.display = 'flex';
  fetchCatByBreed(select.value)
    .then(data => {
      if (data.length === 1) {
        loader.style.display = 'none';
        renderCats(data);
      } else {
        Notiflix.Notify.failure(
          `❌ Oops! Something went wrong! Try reloading the page!`
        );
        loader.style.display = 'none';
      }
    })
    .catch(error => {
      Notiflix.Notify.failure(
        `❌ Oops! Something went wrong! Try reloading the page!`
      );
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
