import { getCharacter, getEpisodes } from 'rickmortyapi';

const refs = {
  modal: document.querySelector('.section-pop-epis'),
  title: document.querySelector('.pop-epis-pilot-title'),
  episodeId: document.querySelector('.pop-epis-id'),
  episodeDate: document.querySelector('.pop-epis-date'),
  episodesContainer: document.querySelector('.episodes-gallery-list'),
  characterContainer: document.querySelector('.pop-epis-hero'),
};

let episodeName = '';
let currentEpisode = {};
let ids = [];
let charactersArray = [];

function handleEpisodeItemClick(event) {
  const episodeItem = event.target.closest('.episodes-item');
  if (episodeItem) {
    getEpisodeNameOnClick(episodeItem);
  }

  refs.modal.classList.remove('is-hidden');
  refs.title.textContent = episodeName;
  refs.episodeId.textContent = currentEpisode.id;
  refs.episodeDate.textContent = currentEpisode.air_date;
  fetchCharacters(renderHeroesInfo);
}

async function renderHeroesInfo() {
  refs.characterContainer.innerHTML = '';

  const characters = charactersArray.map(character => {
    return `
    <img class="pop-hero-img" src="${character.image}" alt="${character.name}">
    <p class="pop-hero-name">${character.name}</p>
   `;
  });
  refs.characterContainer.insertAdjacentHTML('beforeend', characters.join(''));
}

function getEpisodeNameOnClick(episodeItem) {
  episodeName = episodeItem.querySelector('p').textContent;
  fetchClickedEpisode();
}

async function fetchClickedEpisode() {
  const getClickedEpisode = await getEpisodes({
    name: episodeName,
  });

  currentEpisode = getClickedEpisode.data.results[0];
  let lastFourCharactersUrl = currentEpisode.characters.slice(-4); // Get the last four characters
  ids = lastFourCharactersUrl.map(url => {
    const urlParts = url.split('/');
    return parseInt(urlParts[urlParts.length - 1], 10);
  });
  fetchCharacters(renderHeroesInfo);
}

async function fetchCharacters(callback) {
  const characters = await getCharacter(ids);
  charactersArray = characters.data;
  callback();
}

if (
  refs.modal &&
  refs.title &&
  refs.episodeId &&
  refs.episodeDate &&
  refs.episodesContainer &&
  refs.characterContainer
) {
  refs.episodesContainer.addEventListener('click', handleEpisodeItemClick);
}
