import { getCharacters } from 'rickmortyapi';
import debounce from 'lodash.debounce';
import anime from 'animejs';

const refs = {
  mainGallery: document.querySelector('.main-gallery'),
  hiddenInput: document.querySelector('.hidden-characters-search'),
  hiddenStatus: document.querySelector('#hidden-status-select'),
  hiddenSpecies: document.querySelector('#hidden-species-select'),
  hiddenType: document.querySelector('#hidden-type-select'),
  hiddenGender: document.querySelector('#hidden-gender-select'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
};

let currentPage = 1;
let itemsPerPage = window.innerWidth >= 1440 ? 20 : 10;
let totalItems = 0;
let characters = [];

const selectedValues = {
  status: 'all',
  species: 'all',
  type: 'all',
  gender: 'all',
};

const handleFilterChange = debounce(async () => {
  currentPage = 1;
  characters = [];
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
    characters.push(...response.data.results);
    totalItems = response.data.info.count;

    updateSelectOptions(
      refs.hiddenStatus,
      characters,
      selectedValues.status,
      'status'
    );
    updateSelectOptions(
      refs.hiddenSpecies,
      characters,
      selectedValues.species,
      'species'
    );
    updateSelectOptions(
      refs.hiddenType,
      characters,
      selectedValues.type,
      'type'
    );
    updateSelectOptions(
      refs.hiddenGender,
      characters,
      selectedValues.gender,
      'gender'
    );

    renderGallery();
  } else {
    console.log('Invalid API response:', response);
  }
}

function updateSelectOptions(select, characters, selectedValue, attribute) {
  const currentValue = select.value;

  select.innerHTML = '';

  const allOption = document.createElement('option');
  allOption.value = 'all';
  allOption.textContent = 'All';
  select.appendChild(allOption);

  const availableOptions = [
    ...new Set(characters.map(character => character[attribute])),
  ];

  availableOptions.forEach(option => {
    if (option) {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      select.appendChild(optionElement);
    }
  });

  if (select.querySelector(`option[value="${currentValue}"]`)) {
    select.value = currentValue;
  } else {
    select.value = selectedValue;
  }
  selectedValues[select.id] = select.value;
}

function handleFormSubmit(event) {
  event.preventDefault();
  const searchInput = refs.hiddenInput.value;
  refs.mainInput.value = searchInput;

  handleFilterChange();
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

  gallery.innerHTML = '';
  gallery.appendChild(wrapper);

  const cards = wrapper.querySelectorAll('.gallery-card');
  cards.forEach(card => {
    card.style.opacity = 0;
  });

  anime({
    targets: cards,
    opacity: [0, 1],
    translateY: [20, 0],
    easing: 'easeOutSine',
    duration: 500,
  });

  updateLoadMoreButton();

  const wrapperHeight = wrapper.offsetHeight;
  gallery.style.height = `${wrapperHeight}px`;
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
  if (characters.length < totalItems) {
    refs.loadMoreBtn.style.display = 'block';
  } else {
    refs.loadMoreBtn.style.display = 'none';
  }
}

function handleLoadMore() {
  currentPage++;
  fetchCharacters();
}

function initialize() {
  refs.hiddenInput.addEventListener('input', handleFilterChange);
  refs.hiddenStatus.addEventListener('change', handleFilterChange);
  refs.hiddenSpecies.addEventListener('change', handleFilterChange);
  refs.hiddenType.addEventListener('change', handleFilterChange);
  refs.hiddenGender.addEventListener('change', handleFilterChange);
  refs.loadMoreBtn.addEventListener('click', handleLoadMore);

  fetchCharacters();
}

initialize();
