import { getEpisodes } from 'rickmortyapi';
import debounce from 'lodash.debounce';

let PAGE = 1;

const refs = {
  gallery: document.querySelector('.episodes-gallery-list'),
  btnLoadMore: document.querySelector('.btn-load-more'),
};

let seasonImg = '';
let season = '';

let loadEpisode = await getEpisodes({ page: PAGE });

localStorage.setItem('data', JSON.stringify(loadEpisode.data.results));

const media = window.matchMedia('(min-width: 1440px)');
let pageSize = media.matches ? 20 : 10;
let displayedCount = pageSize;

if (refs.gallery && refs.btnLoadMore) {
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    onCreateGalleryEpisodes(loadEpisode.data.results.slice(0, pageSize))
  );
  refs.btnLoadMore.addEventListener('click', debounce(onLoadMore, 250));
}

function onCreateGalleryEpisodes(ep) {
  return ep
    .map(({ name, air_date, id }) => {
      if (id < 12) {
        seasonImg = '/img/season-img/season-1.png';
        season = '1';
      } else if (id < 22) {
        seasonImg = '/img/season-img/season-2.png';
        season = '2';
      } else if (id < 32) {
        seasonImg = '/img/season-img/season-3.png';
        season = '3';
      } else if (id < 42) {
        seasonImg = '/img/season-img/season-4.png';
        season = '4';
      } else if (id < 52) {
        seasonImg = '/img/season-img/season-5.png';
        season = '5';
        refs.btnLoadMore.classList.add('is-hidden');
      }
      return `
             <li class="episodes-item">
        <img
          src="${seasonImg}"
          alt="${name}"
          class="episodes-item-photo"
        />
       <p class="episodes-item-name">${name}</p>
        <div class="episodes-item-info">
          <p>
            <span class="episodes-item-info-name">Season</span>
            <span class="episodes-item-info-data">${season}</span>
          </p>
          <p>
            <span class="episodes-item-info-name">Air date</span>
            <span class="episodes-item-info-data">${air_date}</span>
          </p>
        </div>
      </li>
        
        `;
    })
    .join('');
}

async function onLoadMore() {
  PAGE += 1;
  const dataLocal = localStorage.getItem('data');
  const parserData = dataLocal ? JSON.parse(dataLocal) : [];

  loadEpisode = await getEpisodes({ page: PAGE });
  pageSize = media.matches ? 20 : 10;

  displayedCount = pageSize * PAGE;
  const start = displayedCount - pageSize;

  if (parserData.length >= start + pageSize) {
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      onCreateGalleryEpisodes(parserData.slice(start, displayedCount))
    );
  } else {
    const newEpisodes = loadEpisode.data.results.slice(0, pageSize);
    refs.gallery.insertAdjacentHTML(
      'beforeend',
      onCreateGalleryEpisodes(newEpisodes)
    );
  }

  const newData = parserData.concat(loadEpisode.data.results);
  localStorage.setItem('data', JSON.stringify(newData));
}

let FILTER = {};
let searchTimeout;

async function onGalleryFilter() {
  refs.gallery.innerHTML = '';
  loadEpisode = await getEpisodes(FILTER);
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    onCreateGalleryEpisodes(loadEpisode.data.results)
  );
}

const dropdownBtn = document.getElementById('all-series-btn');
const dropdownMenu = document.getElementById('dropdown');
const input = document.getElementById('episode-name-input');

const toggleDropdown = function () {
  dropdownMenu.classList.toggle('show');
};

if (
  document.getElementById('1-season') &&
  document.getElementById('2-season') &&
  document.getElementById('3-season') &&
  document.getElementById('4-season') &&
  document.getElementById('5-season') &&
  dropdownBtn &&
  dropdownMenu &&
  document &&
  input
) {
  document.addEventListener('click', function (e) {
    if (!dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.remove('show');
    }
  });

  dropdownBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    toggleDropdown();
  });

  dropdownMenu.addEventListener('click', function (e) {
    if (e.target.nodeName !== 'LI') {
      return;
    }

    if (e.target.closest('.season-menu') === null) {
      return;
    }

    onGalleryFilter();
    toggleDropdown();
    refs.btnLoadMore.classList.add('is-hidden');
  });
  document.getElementById('1-season').addEventListener('click', e => {
    document
      .getElementById('1-season')
      .children[0].classList.toggle('season-menu');

    FILTER = { episode: 's01' };
    onGalleryFilter();
  });
  document.getElementById('2-season').addEventListener('click', () => {
    document
      .getElementById('2-season')
      .children[0].classList.toggle('season-menu');

    FILTER = { episode: 's02' };
    onGalleryFilter();
  });

  document.getElementById('3-season').addEventListener('click', () => {
    document
      .getElementById('3-season')
      .children[0].classList.toggle('season-menu');

    FILTER = { episode: 's03' };
    onGalleryFilter();
  });

  document.getElementById('4-season').addEventListener('click', () => {
    document
      .getElementById('4-season')
      .children[0].classList.toggle('season-menu');

    FILTER = { episode: 's04' };
    onGalleryFilter();
  });

  document.getElementById('5-season').addEventListener('click', () => {
    document
      .getElementById('5-season')
      .children[0].classList.toggle('season-menu');

    FILTER = { episode: 's05' };
    onGalleryFilter();
  });

  input.addEventListener('input', function (e) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      FILTER = { name: e.target.value };
      onGalleryFilter();
    }, 500);
  });
}
