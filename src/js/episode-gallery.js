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

refs.gallery.insertAdjacentHTML(
  'beforeend',
  onCreateGalleryEpisodes(loadEpisode.data.results)
);

refs.btnLoadMore.addEventListener('click', debounce(onLoadMore, 250));

function onCreateGalleryEpisodes(ep) {
  return ep
    .map(({ name, air_date, id }) => {
      if (id < 12) {
        seasonImg = '../img/season-img/season-1.png';
        season = '1';
      } else if (id < 22) {
        seasonImg = '../img/season-img/season-2.png';
        season = '2';
      } else if (id < 32) {
        seasonImg = '../img/season-img/season-3.png';
        season = '3';
      } else if (id < 42) {
        seasonImg = '../img/season-img/season-4.png';
        season = '4';
      } else if (id < 52) {
        seasonImg = '../img/season-img/season-5.png';
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
  loadEpisode = await getEpisodes({ page: PAGE });
  console.log('test.data.results222:', loadEpisode.data.results);
  refs.gallery.insertAdjacentHTML(
    'beforeend',
    onCreateGalleryEpisodes(loadEpisode.data.results)
  );
}
