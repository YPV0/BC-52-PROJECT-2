import { getCharacter, getEpisodes } from 'rickmortyapi';
console.log('object');
const refs = {
  modal: document.querySelector('.section-pop-epis'),
  title: document.querySelector('.pop-epis-pilot-title'),
  episodeId: document.querySelector('.pop-epis-id'),
  episodeDate: document.querySelector('.pop-epis-date'),
  episodesContainer: document.querySelector('.episodes-gallery-list'),
  characterContainer: document.querySelector('.pop-epis-hero'),
  modalEpisodesList: document.querySelector('.popchar-episodes-list'),
  charactersModal: document.querySelector('.backdrop-popchar'),
  charactersBackdrop: document.querySelector('.backdrop-popchar'),
};

let episodeName = '';
let currentEpisode = {};
let ids = [];
let charactersArray = [];

function handleEpisodeItemClick(event) {
  const episodeItem = event.target.closest('.episodes-item');

  if (episodeItem) {
    episodeName = episodeItem.querySelector('p').textContent;
    refs.modal.classList.remove('is-hidden');
    refs.title.textContent = episodeName;
    refs.episodeId.textContent = currentEpisode.id;
    refs.episodeDate.textContent = currentEpisode.air_date;
    fetchClickedEpisode();
    fetchCharacters(renderHeroesInfo);
  }
}

function handleCharModalClick(event) {
  const episodeItem = event.target.closest('.popchar-episodes-item');

  if (episodeItem) {
    episodeName = episodeItem.querySelector('.episode-name-title').textContent;
    refs.charactersModal.classList.add('is-hidden');
    refs.charactersBackdrop.classList.add('is-hidden');
    document.body.style.overflow = 'auto';
    refs.modal.classList.remove('is-hidden');
    refs.title.textContent = episodeName;
    refs.episodeId.textContent = currentEpisode.id;
    refs.episodeDate.textContent = currentEpisode.air_date;
    fetchClickedEpisode();
    fetchCharacters(renderHeroesInfo);
  }
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

async function fetchClickedEpisode() {
  const getClickedEpisode = await getEpisodes({
    name: episodeName,
  });

  currentEpisode = getClickedEpisode.data.results[0];
  refs.title.textContent = episodeName;
  refs.episodeId.textContent = currentEpisode.id;
  refs.episodeDate.textContent = currentEpisode.air_date;
  let lastFourCharactersUrl = currentEpisode.characters;
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

if (refs.modalEpisodesList) {
  refs.modalEpisodesList.addEventListener('click', handleCharModalClick);
}
