// Nav-bar.js
let lastScrollTop = 0;
const header = document.querySelector('#head');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const isScrollingDown = scrollTop > lastScrollTop;
  const isScrollingPastThreshold = scrollTop > 50;

  if (isScrollingPastThreshold && isScrollingDown) {
    header.classList.remove('nav-fixed');
    header.classList.add('smoth-nav');
  } else {
    header.classList.add('nav-fixed');
    header.classList.remove('smoth-nav');
  }
  lastScrollTop = scrollTop;
});
