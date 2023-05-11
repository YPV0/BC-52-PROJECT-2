import anime from 'animejs';

const closeModalBtn = document.querySelector('.close-modal-js');
const backdrop = document.querySelector('.backdrop-popchar');
const modal = document.querySelector('.modal-popchar');
const episodesModal = document.querySelector('.section-pop-epis');
const img = document.querySelector('.heroes-episode-img');
const statusItems = document.querySelectorAll('.status-item');
const episodesList = document.querySelector('.popchar-episodes-list');
const galleryElements = document.querySelectorAll('.gallery, .main-gallery, .pop-epis-hero');

if (
  closeModalBtn &&
  backdrop &&
  modal &&
  episodesModal &&
  img &&
  statusItems.length > 0 &&
  episodesList &&
  galleryElements.length > 0
) {
 galleryElements.forEach(gallery => {
  gallery.addEventListener('click', async event => {
    const clickedCard = event.target.closest('.gallery-card, .epis-img-block');
    if (clickedCard) {
      const cardName = clickedCard.querySelector('.card-name, .pop-hero-name').textContent;
      await fetchData(cardName);
      
      anime({
        targets: backdrop,
        opacity: [0, 1],
        duration: 1000,
        easing: 'cubicBezier(0.4, 0, 0.2, 1)',
        begin: function() {
          backdrop.classList.remove('is-hidden');
          document.body.style.overflow = 'hidden';
        }
      });

    anime({
  targets: modal,
  opacity: [0, 1],
  duration: 1000,
  easing: 'cubicBezier(.4, 0, .2, 1)',
  begin: function() {
    modal.style.transformOrigin = '50% 50%';  // Устанавливаем начало трансформации в центр модального окна
    modal.classList.remove('is-hidden');
    episodesModal.classList.add('is-hidden');
  }
});
    }
  });
});

  closeModalBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', event => {
    if (event.target === backdrop) {
      closeModal();
    }
  });
}

function closeModal() {
  anime({
    targets: backdrop,
    opacity: [1, 0],
    duration: 1000,
    easing: 'easeInOutQuad',
    complete: function() {
      backdrop.classList.add('is-hidden');
      document.body.style.overflow = 'auto';
    }
  });

  anime({
    targets: modal,
    opacity: [1, 0],
    translateX: ['-50%', '-50%'],
    translateY: ['-50%', '-50%'],
    duration: 1000,
    easing: 'easeInOutQuad',
    complete: function() {
      modal.classList.add('is-hidden');
      img.setAttribute('src', '');
      statusItems.forEach(item => (item.textContent = ''));
      episodesList.innerHTML = '';
    }
  });
}
async function fetchData(characterName) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(
        characterName
      )}`
    );
    const data = await response.json();
    const randomCharacter = data.results[0];

    img.setAttribute('src', randomCharacter.image);
    statusItems[0].innerHTML = `<span class="status-key">Status:</span><span class="status-value">${
      randomCharacter.status.split(' ')[0] === 'unknown'
        ? ''
        : randomCharacter.status.split(' ')[0]
    }</span>`;
    statusItems[1].innerHTML = `<span class="status-key">Species:</span><span class="status-value">${
      randomCharacter.species.split(' ')[0] === 'unknown'
        ? ''
        : randomCharacter.species.split(' ')[0]
    }</span>`;
    statusItems[2].innerHTML = `<span class="status-key">Gender:</span><span class="status-value">${
      randomCharacter.gender === 'unknown'
        ? ''
        : randomCharacter.gender     }</span>`;
    statusItems[3].innerHTML = `<span class="status-key">Origin:</span><span class="status-value">${
      randomCharacter.origin.name === 'unknown'
        ? ''
        : randomCharacter.origin.name}</span>`;
    statusItems[4].innerHTML = `<span class="status-key">Location:</span><span class="status-value">${
      randomCharacter.location.name === 'unknown'
        ? ''
        : randomCharacter.location.name}</span>`;
    statusItems[6].innerHTML = `<span class="status-key">Type:</span><span class="status-value">${
      randomCharacter.type && randomCharacter.type.split(' ')[0] !== 'unknown'
        ? randomCharacter.type: ''
    }</span>`;

    const episodeUrls = randomCharacter.episode;
    const episodeNumbers = episodeUrls.map(url => url.match(/(\d+)$/)[0]);
    statusItems[5].innerHTML = `<span class="status-key">Episodes:</span><span class="status-value episodes-count">${episodeNumbers.join(
      ', '
    )}</span>`;

    episodesList.innerHTML = '';
    await Promise.all(
      episodeUrls.map(async episodeUrl => {
        const response = await fetch(episodeUrl);
        const data = await response.json();
        const seasonEpisode = data.episode.match(/S(\d+)E(\d+)/);
        const season = parseInt(seasonEpisode[1], 10);
        const episodeItem = document.createElement('li');
        episodeItem.classList.add('popchar-episodes-item');

        const episodeName = document.createElement('span');
        episodeName.classList.add('episode-name-title');
        episodeName.textContent = data.name;
        episodeItem.appendChild(episodeName);

        const seasonData = document.createElement('div');
        seasonData.classList.add('season-data');
        episodeItem.appendChild(seasonData);
        const seasonCount = document.createElement('div');
        seasonCount.classList.add('season-count');
        seasonCount.innerHTML = `<span>Season</span><span>${season}</span>`;
        seasonData.appendChild(seasonCount);

        const airData = document.createElement('div');
        airData.classList.add('air-data');
        airData.innerHTML = `<span>Air date</span><span>${data.air_date}</span>`;
        seasonData.appendChild(airData);

        episodesList.appendChild(episodeItem);
      })
    );
  } catch (error) {
    console.error(error);
  }
}








