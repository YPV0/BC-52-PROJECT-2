import { getCharacters } from 'rickmortyapi';
import debounce from 'lodash.debounce';

const refs = {
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('.characters-search'),
  status: document.querySelector('#status-select'),
  species: document.querySelector('#species-select'),
  type: document.querySelector('#type-select'),
  gender: document.querySelector('#gender-select'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  charactersSearchForm: document.querySelector('.header-form'),
  charactersSearchInput: document.querySelector('.header-input'),
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
  refs.gallery.innerHTML = '';

  selectedValues.status = refs.status.value;
  selectedValues.species = refs.species.value;
  selectedValues.type = refs.type.value;
  selectedValues.gender = refs.gender.value;

  await fetchCharacters();
}, 300);

async function fetchCharacters() {
  const response = await getCharacters({
    name: refs.input.value,
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
      refs.status,
      characters,
      selectedValues.status,
      'status'
    );
    updateSelectOptions(
      refs.species,
      characters,
      selectedValues.species,
      'species'
    );
    updateSelectOptions(refs.type, characters, selectedValues.type, 'type');
    updateSelectOptions(
      refs.gender,
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
  const searchInput = refs.charactersSearchInput.value;
  refs.input.value = searchInput;

  handleFilterChange();
}

function renderGallery() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const charactersToRender = characters.slice(startIndex, endIndex);

  charactersToRender.forEach(character => {
    const li = renderCharacterCard(character);
    refs.gallery.appendChild(li);
  });

  updateLoadMoreButton();
}

function renderCharacterCard(character) {
  const li = document.createElement('li');
  li.className = 'gallery-card';

  li.innerHTML = `
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

  return li;
}

function updateLoadMoreButton() {
  const hasMoreItems = currentPage * itemsPerPage < totalItems;
  refs.loadMoreBtn.style.display = hasMoreItems ? 'block' : 'none';
}

async function loadMoreItems() {
  currentPage += 1;
  await fetchCharacters();
}

if (
  refs.charactersSearchForm &&
  refs.input &&
  refs.status &&
  refs.species &&
  refs.type &&
  refs.loadMoreBtn
) {
  refs.charactersSearchForm.addEventListener('submit', handleFormSubmit);
  refs.input.addEventListener('input', handleFilterChange);
  refs.status.addEventListener('change', handleFilterChange);
  refs.species.addEventListener('change', handleFilterChange);
  refs.type.addEventListener('change', handleFilterChange);
  refs.loadMoreBtn.addEventListener('click', loadMoreItems);
}
