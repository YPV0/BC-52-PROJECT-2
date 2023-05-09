import { getCharacters } from 'rickmortyapi';
import debounce from 'lodash.debounce';

const refs = {
  mainGallery: document.querySelector('.main-gallery'),
  hiddenInput: document.querySelector('.hidden-characters-search'),
  hiddenStatus: document.querySelector('#hidden-status-select'),
  hiddenSpecies: document.querySelector('#hidden-species-select'),
  hiddenType: document.querySelector('#hidden-type-select'),
  hiddenGender: document.querySelector('#hidden-gender-select'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  mainHeaderForm: document.querySelector('#main-header-form'),
  hiddenSection: document.querySelector('#hidden-section'),
  mainHeaderInput: document.querySelector('#hidden-input'),
};

let currentPage = 1;
let itemsPerPage = window.innerWidth >= 1440 ? 20 : 10;
let totalItems = 0;
let characters = [];
let remainingCharacters = [];

const selectedValues = {
  status: 'all',
  species: 'all',
  type: 'all',
  gender: 'all',
};

const handleFilterChange = debounce(async () => {
  currentPage = 1;
  characters = [];
  remainingCharacters = [];
  refs.mainGallery.innerHTML = '';

  selectedValues.status = refs.hiddenStatus.value;
  selectedValues.species = refs.hiddenSpecies.value;
  selectedValues.type = refs.hiddenType.value;
  selectedValues.gender = refs.hiddenGender.value;

  await fetchCharacters();
}, 300);

async function fetchCharacters() {
  const response = await getCharacters({
    name: refs.hiddenInput.value,
    status: selectedValues.status === 'all' ? '' : selectedValues.status,
    species: selectedValues.species === 'all' ? '' : selectedValues.species,
    type: selectedValues.type === 'all' ? '' : selectedValues.type,
    gender: selectedValues.gender === 'all' ? '' : selectedValues.gender,
    page: currentPage,
  });

  if (response.data && Array.isArray(response.data.results)) {
    if (window.innerWidth < 1440) {
      remainingCharacters = [...remainingCharacters, ...response.data.results];
      renderNextCharacters();
    } else {
      characters = [...characters, ...response.data.results];
      totalItems = response.data.info.count;
      renderGallery();
    }
  } else {
    console.log('Invalid API response:', response);
  }
}

function renderGallery() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const charactersToRender = characters.slice(startIndex, endIndex);

  const gallery = refs.mainGallery;
  const wrapper = document.createElement('div');

  charactersToRender.forEach(character => {
    const li = renderCharacterCard(character);
    wrapper.appendChild(li);
  });

  gallery.appendChild(wrapper);

  updateLoadMoreButton();
}

function renderNextCharacters() {
  const gallery = refs.mainGallery;
  const wrapper = document.createElement('div');

  const charactersToRender = remainingCharacters.slice(0, itemsPerPage);
  charactersToRender.forEach(character => {
    const li = renderCharacterCard(character);
    wrapper.appendChild(li);
  });

  gallery.appendChild(wrapper);

  remainingCharacters = remainingCharacters.slice(itemsPerPage);

  if (remainingCharacters.length === 0) {
    currentPage += 1;
    fetchCharacters();
  }

  updateLoadMoreButton();
}

function renderCharacterCard(character) {
  const li = document.createElement('li');
  li.className = 'gallery-card';

  const wrapper = document.createElement('div');
  wrapper.className = 'gallery-card-wrapper';

  wrapper.innerHTML = `
    <img src="${character.image}" alt="${character.name}" class="card-img" />
    <div class="card-info">
      <p class="card-name">${character.name}</p>
      <p class="card-origin-title">
        Origin: <span class="card-origin-info">${character.origin.name}</span>
</p>
<p class="card-location-title">
Location: <span class="card-location-info">${character.location.name}</span>
</p>
</div>
`;

  li.appendChild(wrapper);

  return li;
}

function updateLoadMoreButton() {
  if (window.innerWidth < 1440) {
    refs.loadMoreBtn.style.display =
      characters.length > 0 || remainingCharacters.length > 0
        ? 'block'
        : 'none';
  } else {
    const hasMoreItems = currentPage * itemsPerPage < totalItems;
    refs.loadMoreBtn.style.display = hasMoreItems ? 'block' : 'none';
  }
}

async function handleLoadMore() {
  if (window.innerWidth < 1440) {
    if (remainingCharacters.length < 1) {
      currentPage += 1;
      await fetchCharacters();
    }
    renderNextCharacters();
  } else {
    currentPage += 1;
    await fetchCharacters();
    renderGallery();
  }
}

function initialize() {
  refs.hiddenInput.addEventListener('input', handleFilterChange);
  refs.hiddenStatus.addEventListener('change', handleFilterChange);
  refs.hiddenSpecies.addEventListener('change', handleFilterChange);
  refs.hiddenType.addEventListener('change', handleFilterChange);
  refs.hiddenGender.addEventListener('change', handleFilterChange);
  refs.loadMoreBtn.addEventListener('click', handleLoadMore);

  refs.mainHeaderForm.addEventListener('submit', handleFormSubmit);

  fetchCharacters();
}

function handleFormSubmit(event) {
  event.preventDefault();
  const searchInput = refs.mainHeaderInput.value;
  refs.hiddenInput.value = searchInput;

  handleFilterChange();

  refs.hiddenSection.classList.remove('is-hidden');
}

if (
  refs.hiddenInput &&
  refs.hiddenStatus &&
  refs.hiddenSpecies &&
  refs.hiddenType &&
  refs.hiddenGender &&
  refs.loadMoreBtn &&
  refs.mainHeaderForm
) {
  initialize();
}

const ricksTen = await getCharacters({
  name: 'rick',
  page: 1,
  perPage: 10,
});
console.log(ricksTen);
