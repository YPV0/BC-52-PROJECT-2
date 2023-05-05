const gallery = document.querySelector('.gallery');
 export function renderGallery(array) {
    const markup = array.map(el => {
        return`div class="search__btns">
        
        <div class="search__btn">
        </div>

        <div class="gallery__item">
  
          <a class="hero__item">
            <img
              class="hero__image"
              src="${el.imageURL}"
              loading="lazy"
          /></a>
  
          <div class="info">
            <p class="hero__name">"${el.name.toLocaleString()}"</p>
            <p class="hero__origin"><b>Origin: </b>"${el.origin.name.toLocaleString()}"</p> 
            <p class="hero__location"><b>Location: </b>${el.location.name.toLocaleString()}</p>
        </div>

        </div>`;
      })
      .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    // console.log(gallery);
    // console.log(markup);
  } 