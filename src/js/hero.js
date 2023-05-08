const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');

smoothScrollLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();

    const targetId = link.getAttribute('href');

    const targetSection = document.querySelector(targetId);

    targetSection.scrollIntoView({
      behavior: 'smooth',
    });
  });
});

const btnDown = document.querySelector('.hero-btn-down');
const btnUp = document.querySelector('.hero-btn-rotate');
const footerEl = document.querySelector('#footer');

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
