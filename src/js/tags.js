import anime from 'animejs/lib/anime.es.js';

const container = document.querySelector('.container');
const tags = document.querySelectorAll('.tags-item');

const animateTags = () => {
  anime({
    targets: tags,
    translateX: () => {
      return anime.random(
        -container.offsetWidth / 2,
        container.offsetWidth / 2
      );
    },
    translateY: () => {
      return anime.random(
        -container.offsetHeight / 2,
        container.offsetHeight / 2
      );
    },
    scale: () => {
      return anime.random(0.5, 1.5);
    },
    rotate: () => {
      return anime.random(-360, 360);
    },
    duration: () => {
      return anime.random(1000, 3000);
    },
    easing: 'easeInOutQuad',
    direction: 'alternate',
    loop: true,
  });
};

animateTags();
