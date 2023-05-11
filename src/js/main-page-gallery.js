// import { getCharacters } from 'rickmortyapi';
// import debounce from 'lodash.debounce';

// const refs = {
//   galleryMain: document.querySelector('.main-gallery'),
//   inputMain: document.querySelector('.hidden-characters-search'),
//   statusMain: document.querySelector('#hidden-status-select'),
//   speciesMain: document.querySelector('#hidden-species-select'),
//   typeMain: document.querySelector('#hidden-type-select'),
//   genderMain: document.querySelector('#hidden-gender-select'),
//   loadMoreBtn: document.querySelector('.load-more-btn'),
//   charactersSearchForm: document.querySelector('#main-header-form'),
//   charactersSearchInput: document.querySelector('#hidden-input'),
//   hiddenSection: document.querySelector('#hidden-section'),
//   oopsList: document.querySelector('.oops-list'),
// };

// let currentPage = 1;
// let itemsPerPage = window.innerWidth >= 1440 ? 20 : 10;
// let totalItems = 0;
// let characters = [];

// const selectedValues = {
//   status: 'all',
//   species: 'all',
//   type: 'all',
//   gender: 'all',
// };

// const handleFilterChange = debounce(async () => {
//   currentPage = 1;
//   characters = [];
//   refs.galleryMain.innerHTML = '';

//   selectedValues.status = refs.statusMain.value;
//   selectedValues.species = refs.speciesMain.value;
//   selectedValues.type = refs.typeMain.value;
//   selectedValues.gender = refs.genderMain.value;

//   await fetchCharacters();
// }, 300);

// async function fetchCharacters() {
//   const response = await getCharacters({
//     name: refs.inputMain.value,
//     status: selectedValues.status === 'all' ? '' : selectedValues.status,
//     species: selectedValues.species === 'all' ? '' : selectedValues.species,
//     type: selectedValues.type === 'all' ? '' : selectedValues.type,
//     gender: selectedValues.gender === 'all' ? '' : selectedValues.gender,
//     page: currentPage,
//   });

//   if (response.data && Array.isArray(response.data.results)) {
//     characters.push(...response.data.results);
//     totalItems = response.data.info.count;

//     updateSelectOptions(
//       refs.statusMain,
//       characters,
//       selectedValues.status,
//       'status'
//     );
//     updateSelectOptions(
//       refs.speciesMain,
//       characters,
//       selectedValues.species,
//       'species'
//     );
//     updateSelectOptions(refs.typeMain, characters, selectedValues.type, 'type');
//     updateSelectOptions(
//       refs.genderMain,
//       characters,
//       selectedValues.gender,
//       'gender'
//     );

//     renderGallery();
//   } else {
//     console.log('Invalid API response:', response);
//     refs.loadMoreBtn.style.display = 'none';
//     refs.oopsList.classList.remove('is-hidden');
//   }
// }

// function updateSelectOptions(select, characters, selectedValue, attribute) {
//   const currentValue = select.value;

//   select.innerHTML = '';

//   const allOption = document.createElement('option');
//   allOption.value = 'all';
//   allOption.textContent = 'All';
//   select.appendChild(allOption);

//   const availableOptions = [
//     ...new Set(characters.map(character => character[attribute])),
//   ];

//   availableOptions.forEach(option => {
//     if (option) {
//       const optionElement = document.createElement('option');
//       optionElement.value = option;
//       optionElement.textContent = option;
//       select.appendChild(optionElement);
//     }
//   });

//   if (select.querySelector(`option[value="${currentValue}"]`)) {
//     select.value = currentValue;
//   } else {
//     select.value = selectedValue;
//   }
//   selectedValues[select.id] = select.value;
// }

// function handleFormSubmit(event) {
//   event.preventDefault();
//   refs.hiddenSection.classList.remove('is-hidden');
//   const searchInput = refs.charactersSearchInput.value;
//   refs.inputMain.value = searchInput;
//   refs.inputMain.scrollIntoView({ behavior: 'smooth' });
//   handleFilterChange();
// }

function renderGallery() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const charactersToRender = characters.slice(startIndex, endIndex);

  charactersToRender.forEach(character => {
    const li = renderCharacterCard(character);
    refs.galleryMain.appendChild(li);
  });

  updateLoadMoreButton();
}

// function renderCharacterCard(character) {
//   const li = document.createElement('li');
//   li.className = 'gallery-card';

//   li.innerHTML = `
//     <img src="${character.image}" alt="${character.name}" class="card-img" />
//     <div class="card-info">
//       <p class="card-name">${character.name}</p>
//       <p class="card-origin-title">
//         Origin: <span class="card-origin-info">${character.origin.name}</span>
//       </p>
//       <p class="card-location-title">
//         Location: <span class="card-location-info">${character.location.name}</span>
//       </p>
//     </div>
//   `;

//   return li;
// }

// function updateLoadMoreButton() {
//   const hasMoreItems = currentPage * itemsPerPage < totalItems;
//   refs.loadMoreBtn.style.display = hasMoreItems ? 'block' : 'none';
// }

// async function loadMoreItems() {
//   currentPage += 1;
//   await fetchCharacters();
// }

// if (
//   refs.charactersSearchForm &&
//   refs.inputMain &&
//   refs.statusMain &&
//   refs.speciesMain &&
//   refs.typeMain &&
//   refs.loadMoreBtn &&
//   refs.genderMain
// ) {
//   refs.charactersSearchForm.addEventListener('submit', handleFormSubmit);
//   refs.inputMain.addEventListener('input', handleFilterChange);
//   refs.statusMain.addEventListener('change', handleFilterChange);
//   refs.speciesMain.addEventListener('change', handleFilterChange);
//   refs.genderMain.addEventListener('change', handleFilterChange);
//   refs.typeMain.addEventListener('change', handleFilterChange);
//   refs.loadMoreBtn.addEventListener('click', loadMoreItems);
// }
