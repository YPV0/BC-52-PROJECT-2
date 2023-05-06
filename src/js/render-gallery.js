const gallery = document.querySelector('.gallery');
 export function renderGallery(array) {
    const markup = array.map(el => {
        return`div class="search__btns">

        <div class="gallery-btn">
            <!-- <label>Name</label> -->
            <form class="search-form" id="search-form">
                <input
                type="text"
                name="searchQuery"
                autocomplete="off"
                placeholder="Enter name ">
                <svg class="search-icon" width="18" height="18">
                    <use href="./images/sprite.svg#search-icon"></use>
                </svg>
            </form>
        </div>
        <div class="dropdown">
            <button
            type="button" 
            class="dropdown-toggle" 
            data-dd-target="first" 
            aria-label="Chose status"
            placeholder="Chose status">
            </button>
            <ul id="myDropdown" class="dropdown-content">
                <li><a class="dropdown-menu" href="#">Alive</a></li>
                <li><a class="dropdown-menu__link" href="#">Dead</a></li>
                <li><a class="dropdown-menu__link" href="#">Unknown</a></li>
                <li><a class="dropdown-menu__link" href="#">---</a></li> 
            </ul>
        </div>
        <div class="dropdown">
            <button
            type="button"  
            class="dropdown-toggle" 
            data-dd-target="first" 
            aria-label="Chose species"
            placeholder="Chose species">
            </button>
            <ul id="myDropdown" class="dropdown-content">
                <li><a class="dropdown-menu" href="#">Human</a></li>
                <li><a class="dropdown-menu__link" href="#">Alien</a></li>
                <li><a class="dropdown-menu__link" href="#">Mythological Creature</a></li>
                <li><a class="dropdown-menu__link" href="#">Humanoid</a></li>
                <li><a class="dropdown-menu__link" href="#">Animal</a></li>
                <li><a class="dropdown-menu__link" href="#">Cronenberg</a></li>
                <li><a class="dropdown-menu__link" href="#">Poopybutthole</a></li>
                <li><a class="dropdown-menu__link" href="#">Robot</a></li>
                <li><a class="dropdown-menu__link" href="#">Disease</a></li>
                <li><a class="dropdown-menu__link" href="#">---</a></li>
            </ul>
        </div>
        <div class="dropdown">
            <button
            type="button"  
            class="dropdown-toggle chose-type-btn" 
            data-dd-target="first" 
            aria-label="Chose type"
            placeholder="Chose type">
            </button>
            <ul id="myDropdown" class="dropdown-content">
                <li><a class="dropdown-menu" href="#">Parasite</a></li>
                <li><a class="dropdown-menu__link" href="#">Human with ant...</a></li>
                <li><a class="dropdown-menu__link" href="#">Superhuman</a></li>
                <li><a class="dropdown-menu__link" href="#">Genetic...</a></li>
                <li><a class="dropdown-menu__link" href="#">Fish person</a></li>
                <li><a class="dropdown-menu__link" href="#">Cromulon</a></li>
                <li><a class="dropdown-menu__link" href="#">---</a></li>
            </ul>
        </div>
        <div class="dropdown">
            <button
            type="button"  
            class="dropdown-toggle chose-gender-btn" 
            data-dd-target="first" 
            aria-label="Chose gender"
            placeholder="Chose gender">
            </button>
            <ul id="myDropdown" class="dropdown-content">
                <li><a class="dropdown-menu" href="#">All</a></li>
                <li><a class="dropdown-menu__link" href="#">Female</a></li>
                <li><a class="dropdown-menu__link" href="#">Male</a></li>
                <li><a class="dropdown-menu__link" href="#">Genderless</a></li>
                <li><a class="dropdown-menu__link" href="#">Unknown</a></li>
                <li><a class="dropdown-menu__link" href="#">---</a></li>
            </ul>
        </div>
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
