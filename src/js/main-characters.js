import anime from 'animejs';

const firstImg = document.querySelector('#default-img');
const mortyImg = document.querySelector('#morty-img');
const summerImg = document.querySelector('#summer-img');
const linkEls = document.querySelectorAll('.main-link');
let currentAnimation = null;

function animateImage(img) {
  const duration = 200;

  if (currentAnimation) {
    currentAnimation.pause();
  }

  const animProperties = {
    targets: img,
    opacity: [0, 1],
    translateY: ['100%', '0%'],
    easing: 'easeInOutQuad',
    duration,
    complete: () => {
      currentAnimation = null;
    },
  };

  currentAnimation = anime(animProperties);
}

function handleImageTransition(imgId) {
  const img = document.querySelector(`#${imgId}`);

  if (img.classList.contains('img-hidden')) {
    const currentImg = document.querySelector(
      '.img-component:not(.img-hidden)'
    );

    animateImage(currentImg);
    currentImg.classList.add('img-hidden');

    animateImage(img);
    img.classList.remove('img-hidden');
  }
}

function handleMouseEnter() {
  const imgId = this.getAttribute('data-img');
  handleImageTransition(imgId);
}

function handleMouseLeave() {
  const imgId = this.getAttribute('data-img');
  const img = document.querySelector(`#${imgId}`);

  if (img.classList.contains('img-hidden')) {
    animateImage(img);
    img.classList.remove('img-hidden');
    animateImage(firstImg);
    firstImg.classList.add('img-hidden');
  }
}

linkEls.forEach(linkEl => {
  linkEl.addEventListener('mouseenter', handleMouseEnter);
  linkEl.addEventListener('mouseleave', handleMouseLeave);
});
