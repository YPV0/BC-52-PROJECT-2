import { getCharacters } from 'rickmortyapi';
import debounce from 'lodash.debounce';
import anime from 'animejs';

const refs = {
  gallery: document.querySelector('.gallery'),
  input: document.querySelector('.characters-search'),
  inputForm: document.querySelector('.gallery-form'),
  status: document.querySelector('#status-dropdown-select'),
  species: document.querySelector('#species-dropdown-select'),
  type: document.querySelector('#type-dropdown-select'),
  gender: document.querySelector('#gender-dropdown-select'),
  loadMoreBtn: document.querySelector('.load-more-btn'),
  charactersSearchForm: document.querySelector('.header-form'),
  charactersSearchInput: document.querySelector('.header-input'),
  dropdownList: document.querySelector('.dropdown-list'),
  dropdownBtn: document.querySelector('.dropdown-btn'),
  statusItem: document.querySelector('#status-item'),
  speciesItem: document.querySelector('#species-item'),
  typeItem: document.querySelector('#type-item'),
  genderItem: document.querySelector('#gender-item'),
  oopsList: document.querySelector('.oops-list'),
  charGallerySection: document.querySelector('.hero-gallery'),
};

const select = document.querySelector('.dropdown-list');

let currentPage = 1;
let itemsPerPage = window.innerWidth >= 1440 ? 20 : 10;
let totalItems = 0;
let characters = [];
let errorStatus = false;

const selectedValues = {
  status: 'all',
  species: 'all',
  type: 'all',
  gender: 'all',
};

const handleFilterChange = debounce(async (value, key) => {
  currentPage = 1;
  characters = [];

  selectedValues[key] = value;
  await fetchCharacters();

  anime({
    targets: '.gallery-card',
    opacity: [1, 0],
    duration: 250,
    easing: 'easeInOutQuad',
    complete: function () {
      refs.gallery.innerHTML = '';
      renderGallery();
    },
  });
}, 300);

async function fetchCharacters() {
  let statusValue = '';
  let speciesValue = '';
  let typeValue = '';
  let genderValue = '';

  if (
    refs.statusItem.querySelector('.dropdown-btn').textContent.trim() !== 'All'
  ) {
    statusValue = refs.statusItem.querySelector('.dropdown-btn').textContent;
  }

  if (
    refs.speciesItem.querySelector('.dropdown-btn').textContent.trim() !== 'All'
  ) {
    speciesValue = refs.speciesItem.querySelector('.dropdown-btn').textContent;
  }
  if (
    refs.typeItem.querySelector('.dropdown-btn').textContent.trim() !== 'All'
  ) {
    typeValue = refs.typeItem.querySelector('.dropdown-btn').textContent;
  }
  if (
    refs.genderItem.querySelector('.dropdown-btn').textContent.trim() !== 'All'
  ) {
    genderValue = refs.genderItem.querySelector('.dropdown-btn').textContent;
  }

  const response = await getCharacters({
    name: refs.input.value,
    status: statusValue.trim(),
    species: speciesValue.trim(),
    type: typeValue.trim(),
    gender: genderValue.trim(),
    page: currentPage,
  });

  if (response.data && Array.isArray(response.data.results)) {
    characters = [...characters, ...response.data.results];
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
    refs.oopsList.classList.add('is-hidden');
    errorStatus = false;
    renderGallery();
    updateLoadMoreButton();
  } else {
    console.log('Invalid API response:', response);
    refs.loadMoreBtn.style.display = 'none';
    refs.oopsList.classList.remove('is-hidden');
    errorStatus = true;
    updateLoadMoreButton();
  }
}

function updateSelectOptions(select, characters, selectedValue, attribute) {
  select.innerHTML = '';

  const allOption = document.createElement('li');
  allOption.classList.add('drop-down-point');
  allOption.setAttribute('data-value', 'all');
  allOption.textContent = 'All';
  select.appendChild(allOption);

  const availableOptions = [
    ...new Set(characters.map(character => character[attribute])),
  ];

  availableOptions.forEach(option => {
    if (option) {
      const optionElement = document.createElement('li');
      optionElement.classList.add('drop-down-point');
      optionElement.setAttribute('data-value', option);
      optionElement.textContent = option;
      if (option === selectedValue) {
        optionElement.selected = true; // Set selected property to true
        select.parentElement.querySelector('.dropdown-btn').textContent =
          option;
      }
      select.appendChild(optionElement);
    }
  });

  selectedValues[select.id] = select.value;
}

function handleFormSubmit(event) {
  event.preventDefault();
  if (refs.charGallerySection) {
    refs.charGallerySection.classList.remove('is-hidden');
  }
  const searchInput = refs.charactersSearchInput.value;
  refs.input.value = searchInput;
  refs.input.scrollIntoView({ behavior: 'smooth' });
  if (refs.charGallerySection.classList.contains('hidden-section')) {
    refs.charGallerySection.classList.remove('is-hidden');
  }

  handleFilterChange();
}

function renderGallery() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const charactersToRender = characters.slice(startIndex, endIndex);

  charactersToRender.forEach(character => {
    const li = renderCharacterCard(character);
    refs.gallery.appendChild(li);

    anime({
      targets: li,
      opacity: [0, 1],
      duration: 250,
      easing: 'easeInOutQuad',
    });
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
  if (errorStatus) {
    refs.loadMoreBtn.style.display = 'none';
    return;
  }

  const hasMoreItems = currentPage * itemsPerPage < totalItems;
  refs.loadMoreBtn.style.display = hasMoreItems ? 'block' : 'none';
}

async function loadMoreItems() {
  currentPage += 1;
  await fetchCharacters();
}

if (refs.charactersSearchForm && refs.input && refs.loadMoreBtn) {
  refs.charactersSearchForm.addEventListener('submit', handleFormSubmit);
  refs.input.addEventListener('input', handleFilterChange);
  refs.loadMoreBtn.addEventListener('click', loadMoreItems);
}

function handleDropdownItemClick(event) {
  if (event.target.classList.contains('drop-down-point')) {
    const selectedValue = event.target.getAttribute('data-value');
    const select = event.currentTarget.parentElement;
    const selectId = select.id;

    select.querySelector('.dropdown-btn').textContent =
      event.target.textContent;

    selectedValues[selectId] = selectedValue; // Update the selected value

    handleFilterChange(selectedValue, selectId);
  }
}

if (refs.status) {
  refs.status.addEventListener('click', handleDropdownItemClick);
  refs.species.addEventListener('click', handleDropdownItemClick);
  refs.type.addEventListener('click', handleDropdownItemClick);
  refs.gender.addEventListener('click', handleDropdownItemClick);
}
let intervalId;
const selectField = document.querySelectorAll('.dropdown-btn');
const dropList = document.querySelectorAll('.dropdown-list');

const btnPress = e => {
  const list = e.currentTarget.dataset.path;

  dropList.forEach(e => {
    const dataEl = document.querySelector(`[data-target=${list}]`);

    if (!dataEl.classList.contains('open')) {
      e.classList.remove('menu-active');
      e.classList.remove('open');
      dataEl.classList.add('menu-active');

      intervalId = setTimeout(() => {
        dataEl.classList.add('open');
      }, 0);
    }
    if (dataEl.classList.contains('open')) {
      clearTimeout(intervalId);
      dataEl.classList.remove('menu-active');

      intervalId = setTimeout(() => {
        dataEl.classList.remove('open');
      }, 0);
    }

    window.onclick = e => {
      if (
        e.target == dataEl ||
        e.target == document.querySelector(`[data-path='$(menu)']`)
      ) {
        return;
      } else {
        dataEl.classList.remove('menu-active');
        dataEl.classList.remove('open');
      }
    };
  });
};

if (refs.inputForm) {
  selectField.forEach(e => e.addEventListener('click', btnPress));

  fetchCharacters();
}
if (refs.inputForm) {
  refs.inputForm.addEventListener('submit', e => {
    e.preventDefault();
  });
}
