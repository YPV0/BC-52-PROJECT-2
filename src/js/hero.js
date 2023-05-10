const btnDown = document.querySelector('.hero-btn-down');
const btnUp = document.querySelector('.hero-btn-rotate');
const footerEl = document.querySelector('#footer');
const heroEl = document.querySelector('#hero');

let currentSection = document.querySelector('section');
let nextSection = '';
let currentNewSection = '';

function callbackFoo() {
  if (currentNewSection.id == 'slider') {
    footerEl.scrollIntoView({ behavior: 'smooth' });
    currentNewSection = '';
    return currentNewSection;
  } else if (currentNewSection) {
    nextSection = currentNewSection.nextElementSibling;
    if (nextSection.classList.contains('is-hidden')) {
      nextSection = nextSection.nextElementSibling;
      return nextSection;
    }
    nextSection.scrollIntoView({ behavior: 'smooth' });
    currentNewSection = nextSection;
    return currentNewSection;
  } else {
    nextSection = currentSection.nextElementSibling;
    if (nextSection.classList.contains('is-hidden')) {
      currentNewSection = nextSection.nextElementSibling;
      return currentNewSection;
    } else {
      currentNewSection = nextSection.nextElementSibling;
    }
    currentNewSection.scrollIntoView({ behavior: 'smooth' });
    return currentNewSection;
  }
}

function entry(entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      btnDown.classList.remove('is-hidden');
      btnUp.classList.add('is-hidden');
    } else {
      btnDown.classList.add('is-hidden');
      btnUp.classList.remove('is-hidden');
    }
  });
}

const scrollUp = () => {
  heroEl.scrollIntoView({ behavior: 'smooth' });
};

if (btnDown && btnUp) {
  btnDown.addEventListener('click', callbackFoo);
  const observer = new IntersectionObserver(entry);
  observer.observe(footerEl);
  btnUp.addEventListener('click', scrollUp);
}
