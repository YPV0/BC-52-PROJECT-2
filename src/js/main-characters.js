
const firstImg = document.querySelector('#default-img');
const mortyImg = document.querySelector('#morty-img');
const summerImg = document.querySelector('#summer-img');
const linkEls = document.querySelectorAll('.main-link');

linkEls.forEach(linkEl => {
  linkEl.addEventListener('mouseenter', function () {
    const imgId = this.getAttribute('data-img');
    const img = document.querySelector(`#${imgId}`);

    firstImg.classList.add('img-hidden', 'img-transition');
    img.classList.remove('img-hidden', 'img-transition');

    if (img === firstImg) {
      firstImg.classList.remove('img-hidden', 'img-transition');
    }
  });

  linkEl.addEventListener('mouseleave', function () {
    const imgId = this.getAttribute('data-img');
    const img = document.querySelector(`#${imgId}`);

    img.classList.add('img-hidden', 'img-transition');
    firstImg.classList.remove('img-hidden', 'img-transition');

    if (img === firstImg && img === null) {
      firstImg.classList.remove('img-hidden', 'img-transition');
    }
  });
});


