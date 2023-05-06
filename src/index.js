'use strict'
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import ImgsFetcher from './js/fetch-hero-gallery';
// import { markupBuilder } from './js/markupBuilder';
import { renderGallery } from './js/render-gallery';

const gallery = document.querySelector('.gallery');
const searchField = document.querySelector('.header-input');
const loadMoreBtn = document.querySelector('.load-more');
const heroFetcher = new ImgsFetcher();
// const lightbox = new SimpleLightbox('.gallery');

let perPage = 20;
let page = 0;
let name = searchField.value;
getHeroImgs("Rick");


async function getHeroImgs(name){
    try {
        const response = await heroFetcher.getRequest();
        const data = response.data;
        console.log(data);
        renderGallery(data);
        // lightbox.refresh();
        
    } catch (err) {
        console.log(err);
    }
};
console.log("After getHeroImgs");

async function onInputSearchField(e) {
    e.preventDefault();
    console.log('OnInputSearchField');
    clearMarkup();
    heroFetcher.query = searchField.value;
    console.log(heroFetcher.query);
    try {
        const galleryData = await heroFetcher.getRequest();
        console.log(galleryData);

        const galleryMarkup = renderGallery(galleryData);
        gallery.insertAdjacentHTML('beforeend', galleryMarkup);
        // lightbox.refresh();
    } catch {
        Notify.failure('RenderGallery method error');}

    if(heroFetcher.page === heroFetcher.totalPage) {
        Notify.info("We're sorry, but Nothing was found for your request.");
        return;
    } else  if (heroFetcher.page < heroFetcher.totalPage) {
        heroFetcher.page += 1;
        showLoadMoreBtn();
        lightbox.refresh(); 
    }

}
clearSearchField(); 

async function onLoadMoreBtnClick() {
    if (heroFetcher.page === heroFetcher.totalPage) { 
      Notify.info("We're sorry, but you've reached the end of search results.");
      hideLoadMoreBtn();
    }
      else if (heroFetcher.page < heroFetcher.totalPage) {
        heroFetcher.page += 1; 
        heroFetcher.query = this.heroFetcherQuery;
        const data = await heroFetcher.getRequest();
        const pageMarkup = renderGallery(data);
        console.log(pageMarkup);

        gallery.insertAdjacentHTML('beforeend', pageMarkup);
        showLoadMoreBtn();
        // lightbox.refresh();
     } try {
      const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: "smooth",
    });
   } catch (err) {
      Notify.failure('RenderGallery method error');}      
};


function clearSearchField() {
    searchField.value = "";
    searchField.addEventListener('input', onInputSearchField);
}

function showLoadMoreBtn() {
    loadMoreBtn.style.display = 'block';
    loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
};

function hideLoadMoreBtn() {
    loadMoreBtn.style.display = 'none';
    loadMoreBtn.removeEventListener('click', onLoadMoreBtnClick);
   
};