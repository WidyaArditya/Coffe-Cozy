// Nav-bar.js
class ScrollHide {
  constructor() {
    this.lastScrollTop = 0;
    this.header = document.querySelector('#head');

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const isScrollingDown = scrollTop > this.lastScrollTop;
      const isScrollingPastThreshold = scrollTop > 50;

      if (isScrollingPastThreshold && isScrollingDown) {
        this.header.classList.remove('nav-fixed');
        this.header.classList.add('smoth-nav');
      } else {
        this.header.classList.add('nav-fixed');
        this.header.classList.remove('smoth-nav');
      }
      this.lastScrollTop = scrollTop;
    });
  }
}
const scrollHide = new ScrollHide();
