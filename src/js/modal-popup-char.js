const openModalBtn = document.querySelector('.open-modal-js');
const closeModalBtn = document.querySelector('.close-modal-js');
const backdrop = document.querySelector('.backdrop-popchar');
const modal = document.querySelector('.modal-popchar');
const image = document.querySelector('.heroes-episode-img');
const episodeList = document.querySelector('.popchar-episodes-list');

openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', event => {
  if (event.target === backdrop) {
    closeModal();
  }
});

function openModal() {
  backdrop.classList.remove('is-hidden');
  modal.classList.remove('is-hidden');
  fetch('https://rickandmortyapi.com/api/character/?page=1')
    .then(response => response.json())
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.results.length);
      const character = data.results[randomIndex];
      image.src = character.image;
      image.alt = character.name;

      episodeList.innerHTML = '';
      character.episode.forEach(episodeUrl => {
        fetch(episodeUrl)
          .then(response => response.json())
          .then(episode => {
            const episodeItem = document.createElement('li');
            episodeItem.classList.add('episodes-item');
            episodeItem.innerText = `${episode.episode} - ${episode.name}`;
            episodeList.appendChild(episodeItem);
          });
      });
    });
}

function closeModal() {
  backdrop.classList.add('is-hidden');
  modal.classList.add('is-hidden');
}