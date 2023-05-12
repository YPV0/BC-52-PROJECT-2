import { getEpisodes } from 'rickmortyapi';
import anime from 'animejs';
import debounce from 'lodash.debounce';
import season1 from '/img/season1.png';
import season2 from '/img/season2.png';
import season3 from '/img/season3.png';
import season4 from '/img/season4.png';
import season5 from '/img/season5.png';

let PAGE = 1;

const refs = {
  gallery: document.querySelector('.episodes-gallery-list'),
  btnLoadMore: document.querySelector('.btn-load-more'),
  episodesSearchInput: document.querySelector('#episodes-search-input'),
  episodesSearchForm: document.querySelector('#episodes-search-form'),
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
        seasonImg = season1;
        season = '1';
      } else if (id < 22) {
        seasonImg = season2;
        season = '2';
      } else if (id < 32) {
        seasonImg = season3;
        season = '3';
      } else if (id < 42) {
        seasonImg = season4;
        season = '4';
      } else if (id < 52) {
        seasonImg = season5;
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
  const savedScroll = window.pageYOffset;

  anime({
    targets: '.episodes-item',
    opacity: [1, 0],
    duration: 250,
    easing: 'easeInOutQuad',
    complete: async function () {
      refs.gallery.innerHTML = '';
      loadEpisode = await getEpisodes(FILTER);
      refs.gallery.insertAdjacentHTML(
        'beforeend',
        onCreateGalleryEpisodes(loadEpisode.data.results)
      );
      toggleOopsList();

      window.scrollTo(0, savedScroll);
    },
  });
}

const dropdownBtn = document.getElementById('all-series-btn');
const dropdownMenu = document.getElementById('dropdown');
const input = document.getElementById('episode-name-input');
const allEpisodes = document.querySelector('.all-season');
const toggleArrow = document.getElementById('arrow');

const toggleDropdown = function () {
  dropdownMenu.classList.toggle('show');
  toggleArrow.classList.toggle('arrow');
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
  input &&
  allEpisodes
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
    FILTER = { episode: `${e.target.dataset.episode}` };
    onGalleryFilter();
    toggleDropdown();
    refs.btnLoadMore.classList.add('is-hidden');
  });
  document.getElementById('1-season').addEventListener('click', e => {
    document
      .getElementById('1-season')
      .children[0].classList.toggle('season-menu');
    if (e.target.hasAttribute('data-episode')) {
      return;
    }
    FILTER = { episode: 's01' };
    onGalleryFilter();
  });
  document.getElementById('2-season').addEventListener('click', e => {
    document
      .getElementById('2-season')
      .children[0].classList.toggle('season-menu');
    if (e.target.hasAttribute('data-episode')) {
      return;
    }
    FILTER = { episode: 's02' };
    onGalleryFilter();
  });

  document.getElementById('3-season').addEventListener('click', e => {
    document
      .getElementById('3-season')
      .children[0].classList.toggle('season-menu');
    if (e.target.hasAttribute('data-episode')) {
      return;
    }
    FILTER = { episode: 's03' };
    onGalleryFilter();
  });

  document.getElementById('4-season').addEventListener('click', e => {
    document
      .getElementById('4-season')
      .children[0].classList.toggle('season-menu');
    if (e.target.hasAttribute('data-episode')) {
      return;
    }
    FILTER = { episode: 's04' };
    onGalleryFilter();
  });

  document.getElementById('5-season').addEventListener('click', e => {
    document
      .getElementById('5-season')
      .children[0].classList.toggle('season-menu');
    if (e.target.hasAttribute('data-episode')) {
      return;
    }
    FILTER = { episode: 's05' };
    onGalleryFilter();
  });

  input.addEventListener('input', function (e) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      FILTER = { name: e.target.value };
      onGalleryFilter();
      toggleOopsList();
    }, 500);
  });

  allEpisodes.addEventListener('click', function () {
    const seasonMenus = document.querySelectorAll('.seasons-gap');
    seasonMenus.forEach(function (seasonMenu) {
      seasonMenu.classList.add('season-menu');
    });

    FILTER = { page: PAGE };
    onGalleryFilter();
    refs.btnLoadMore.classList.remove('is-hidden');
  });
}

if (refs.episodesSearchForm) {
  refs.episodesSearchForm.addEventListener('submit', onHeaderFormSubmit);
}

function onHeaderFormSubmit(e) {
  e.preventDefault();
  const inputVal = refs.episodesSearchInput.value.trim().toLowerCase();
  input.value = inputVal;
  input.scrollIntoView({ behavior: 'smooth' });
  input.dispatchEvent(new Event('input'));
}

function toggleOopsList() {
  const inputVal = input.value.trim().toLowerCase();
  const hasSearchResults = loadEpisode.data.results.some(episode =>
    episode.name.toLowerCase().includes(inputVal)
  );

  const oopsList = document.querySelector('.oops-list');
  if (!hasSearchResults) {
    oopsList.classList.remove('is-hidden');
    refs.btnLoadMore.classList.add('is-hidden');
  } else {
    oopsList.classList.add('is-hidden');
    if (loadEpisode.data.results.length > 12) {
      refs.btnLoadMore.classList.remove('is-hidden');
    } else {
      refs.btnLoadMore.classList.add('is-hidden');
    }
  }
}
