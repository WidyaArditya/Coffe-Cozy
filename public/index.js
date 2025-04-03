// index.js
import { createSlider } from '../src/js/menu-section/slider.js';
import { createCarousel } from '../src/js/menu-section/carousel.js';
import { createFilter } from '../src/js/menu-section/filter.js';
import '../src/js/nav-bar-section/hamburger.js';
import '../src/js/nav-bar-section/scroll-up-hidden.js';
import '../src/js/nav-bar-section/search.js';
import '../src/js/nav-bar-section/shopping-cart.js';

class App {
  constructor() {
    this.menuLinks = document.querySelectorAll('.text-line');
    this.filterButtons = document.querySelectorAll('.filter-button');
    this.menuItems = document.querySelectorAll('.menu-item');
    this.slideshow = document.getElementById('slideshow');
    this.prevSlide = document.getElementById('prevSlide');
    this.nextSlide = document.getElementById('nextSlide');
    this.prevMenu = document.getElementById('prevMenu');
    this.nextMenu = document.getElementById('nextMenu');
    this.menuCarousel = document.getElementById('menuCarousel');

    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.initializeSlider();
    this.initializeCarousel();
    this.initializeFilter();
  }

  setupSmoothScrolling() {
    this.menuLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href');
        const section = document.querySelector(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  initializeSlider() {
    if (this.slideshow) {
      const slider = new createSlider(this.slideshow);

      this.prevSlide.addEventListener('click', () => slider.prevSlide());

      this.nextSlide.addEventListener('click', () => slider.nextSlide());

      slider.startAutoSlide();
    } else {
      console.error('Error: Elemen slideshow tidak ditemukan');
    }
  }

  async initializeCarousel() {
    if (this.menuCarousel) {
      const carousel = new createCarousel(this.menuCarousel, this.prevMenu, this.nextMenu);
      const { updateIndex } = carousel;
      return updateIndex;
    } else {
      console.error('Error: Elemen menuCarousel tidak ditemukan');
    }
  }

  initializeFilter() {
    if (this.filterButtons.length > 0 && this.menuItems.length > 0) {
      new createFilter(this.filterButtons, this.menuItems);
    } else {
      console.error('Error: Elemen filterButtons atau menuItems tidak ditemukan');
    }
  }
}

// Pastikan DOM siap sebelum membuat instance App
document.addEventListener('DOMContentLoaded', () => {
  new App();
});
