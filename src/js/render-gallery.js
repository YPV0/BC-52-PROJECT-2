import { getCharacters } from 'rickmortyapi';


const refs = {
  input: document.querySelector('.search__input'),
  form: document.querySelector('.search__form'),
  gallery: document.querySelector('.gallery'),
  button: document.querySelector('.submit__button'),
};

let timeoutId;

export function renderGallery (data) {
  const markup = data.results.map(item => {
    console.log(item);
    return `<li class="gallery__item">
        <img class="gallery__img" src="${item.image}" alt="${item.name}" />
        <div class="gallery__text">
          <h2 class="gallery__name">${item.name}</h2>
          <p class="gallery__species">${item.species}</p>
        </div>
    </li>
</ul>`;
  });

  refs.gallery.insertAdjacentHTML('beforeend', markup.join(''));
};

const clearGallery = () => {
  refs.gallery.innerHTML = '';
};

const fetchCharacters = async name => {
  try {
    const response = await getCharacters({ name });
    const data = response.data;
    console.log(data.results);
    clearGallery();
    renderGallery(data);
  } catch (error) {
    console.log(error);
  }
};

const handleInput = event => {
  const name = event.target.value;

  clearTimeout(timeoutId);

  timeoutId = setTimeout(() => {
    fetchCharacters(name);
  }, 500);
};

refs.input.addEventListener('input', handleInput);