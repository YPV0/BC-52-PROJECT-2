const btnDown = document.querySelector('.hero-btn-down');
const btnUp = document.querySelector('.hero-btn-rotate');
const footerEl = document.querySelector('#footer');
const heroEl = document.querySelector('#hero');

let currentSection = document.querySelector('section');
let nextSection = currentSection.nextElementSibling;
let currentNewSection = '';

function callbackFoo() {
  if (currentNewSection.id == 'slider') {
    currentNewSection = '';
    nextSection = currentSection.nextElementSibling;
    nextSection.scrollIntoView({ behavior: 'smooth' });
    currentNewSection = nextSection;
    return currentNewSection;
  } else if (currentNewSection) {
    nextSection = currentNewSection.nextElementSibling;
    if (nextSection.classList.contains('is-hidden')) {
      nextSection = nextSection.nextElementSibling;
      nextSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
    currentNewSection = nextSection;
    return currentNewSection;
  } else {
    nextSection.scrollIntoView({ behavior: 'smooth' });
    if (nextSection.classList.contains('is-hidden')) {
      currentNewSection = nextSection.nextElementSibling;
    } else currentNewSection = nextSection;
    return currentNewSection;
  }
}

btnDown.addEventListener('click', callbackFoo);

const observer = new IntersectionObserver(entry);
observer.observe(footerEl);

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

btnUp.addEventListener('click', scrollUp);
