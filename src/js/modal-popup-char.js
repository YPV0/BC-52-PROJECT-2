const openModalBtn = document.querySelector('.open-modal-js');
const closeModalBtn = document.querySelector('.close-modal-js');
const backdrop = document.querySelector('.backdrop-popchar');
const modal = document.querySelector('.modal-popchar');
const img = document.querySelector('.heroes-episode-img');
const statusItems = document.querySelectorAll('.status-item');
const episodesList = document.querySelector('.popchar-episodes-list');

openModalBtn.addEventListener('click', () => {
  fetchData();
  backdrop.classList.remove('is-hidden');
  modal.classList.remove('is-hidden');
});

closeModalBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', (event) => {
  if (event.target === backdrop) {
    closeModal();
  }
});

function closeModal() {
  backdrop.classList.add('is-hidden');
  modal.classList.add('is-hidden');
  img.setAttribute('src', '');
  statusItems.forEach((item) => (item.textContent = ''));
  episodesList.innerHTML = '';
}

async function fetchData() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    const randomCharacter = data.results[Math.floor(Math.random() * data.results.length)];

    img.setAttribute('src', randomCharacter.image);
    statusItems[0].textContent = `Status: ${randomCharacter.status}`;
    statusItems[1].textContent = `Species: ${randomCharacter.species}`;
    statusItems[2].textContent = `Type: ${randomCharacter.type ? randomCharacter.type : 'unknown'}`;
    statusItems[3].textContent = `Gender: ${randomCharacter.gender}`;
    statusItems[4].textContent = `Origin: ${randomCharacter.origin.name}`;
    statusItems[5].textContent = `Location: ${randomCharacter.location.name}`;

    await Promise.all(randomCharacter.episode.slice(0, 5).map(async (episode) => {
      const response = await fetch(episode);
      const data = await response.json();

      const episodeItem = document.createElement('li');
      episodeItem.classList.add('episodes-item');
      episodeItem.textContent = `${data.episode} - ${data.name}`;

      episodesList.appendChild(episodeItem);
    }));
  } catch (error) {
    console.error(error);
  }
}