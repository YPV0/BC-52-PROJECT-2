import anime from 'animejs';
import { getCharacter, getEpisodes } from 'rickmortyapi';

const refs = {
  modal: document.querySelector('.section-pop-epis'),
  container: document.querySelector('.container-pop-epis'),
  title: document.querySelector('.pop-epis-pilot-title'),
  episodeId: document.querySelector('.pop-epis-id'),
  episodeDate: document.querySelector('.pop-epis-date'),
  episodesContainer: document.querySelector('.episodes-gallery-list'),
  characterContainer: document.querySelector('.pop-epis-hero'),
  charactersModal: document.querySelector('.backdrop-popchar'),
  charactersBackdrop: document.querySelector('.backdrop-popchar'),
  closeEpisModalBtn: document.querySelector('.close-pop-epis-btn'),
  galleryList:document.querySelector('.gallery-list'),
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
    refs.container.classList.remove('is-hidden');
    refs.title.textContent = episodeName;
    refs.episodeId.textContent = currentEpisode.id;
    refs.episodeDate.textContent = currentEpisode.air_date;
    
    anime({
      targets: refs.modal,
      opacity: [0, 1],
      duration: 1000,
      easing: 'cubicBezier(0.4, 0, 0.2, 1)'
    });

    anime({
      targets: refs.container,
      opacity: [0, 1],
      
      duration: 1000,
      easing: 'cubicBezier(.4, 0, .2, 1)',
      begin: function() {
        refs.container.style.transformOrigin = '50% 50%';
        document.body.style.overflow = 'hidden';
      }
    });

    fetchClickedEpisode();
    fetchCharacters(renderHeroesInfo);
  }
}

document.addEventListener('click', function(event) {
  const episodeItem = event.target.closest('.popchar-episodes-item');

  if (episodeItem) {
    episodeName = episodeItem.querySelector('.episode-name-title').textContent;
    refs.charactersModal.classList.add('is-hidden');
    refs.charactersBackdrop.classList.add('is-hidden');
    document.body.style.overflow = 'auto';
    refs.modal.classList.remove('is-hidden');
    refs.container.classList.remove('is-hidden');
    refs.title.textContent = episodeName;
    refs.episodeId.textContent = currentEpisode.id;
    refs.episodeDate.textContent = currentEpisode.air_date;

    anime({
      targets: refs.modal,
      opacity: [0, 1],
      duration: 1000,
      easing: 'cubicBezier(0.4, 0, 0.2, 1)'
    });

    anime({
      targets: refs.container,
      opacity: [0, 1],
     
      duration: 1000,
      easing: 'cubicBezier(.4, 0, .2, 1)',
      begin: function() {
        refs.container.style.transformOrigin = '50% 50%';
        document.body.style.overflow = 'hidden';
        
      }
    });

    fetchClickedEpisode();
    fetchCharacters(renderHeroesInfo);
  }
});

function closeEpisModal() {
  anime({
    targets: refs.modal,
    opacity: [1, 0],
    duration: 1000,
    easing: 'easeInOutQuad',
    complete: function() {
      refs.modal.classList.add('is-hidden');
     document.body.style.overflow = 'hidden';
    }
  });

  anime({
    targets: refs.container,
    opacity: [1, 0],
    duration: 1000,
    easing: 'easeInOutQuad',
    complete: function() {
      refs.container.classList.add('is-hidden');
      document.body.style.overflow = 'auto';
    }
  });
}

if ( refs.modal &&
  refs.container &&
  refs.title &&
  refs.episodeId &&
  refs.episodeDate &&
  refs.episodesContainer &&
  refs.characterContainer) {
  refs.episodesContainer.addEventListener('click', handleEpisodeItemClick);
  refs.modal.addEventListener('click', function(event) {
    if (event.target === refs.modal) {
      closeEpisModal();
    }
  });
}

async function renderHeroesInfo() {
  refs.characterContainer.innerHTML = '';

  const characters = charactersArray.map(character => {
    return `
    <div class="epis-img-block">
      <img class="pop-hero-img" src="${character.image}" alt="${character.name}">
      <p class="pop-hero-name">${character.name}</p>
    </div>
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
  refs.container &&
  refs.title &&
  refs.episodeId &&
  refs.episodeDate &&
  refs.episodesContainer &&
  refs.characterContainer
) {
  refs.episodesContainer.addEventListener('click', handleEpisodeItemClick);
}

if (refs.closeEpisModalBtn) {
  refs.closeEpisModalBtn.addEventListener('click', closeEpisModal);
}

