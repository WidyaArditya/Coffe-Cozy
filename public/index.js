// index.js
import { createSlider } from '../src/js/menu-section/slider.js';
import { createCarousel } from '../src/js/menu-section/carousel.js';
import { createFilter } from '../src/js/menu-section/filter.js';
import '../src/js/nav-bar-section/hamburger.js';
import '../src/js/nav-bar-section/nav-bar.js';
import '../src/js/nav-bar-section/search.js';
import '../src/js/nav-bar-section/shopping-cart.js';
// index.js
const menuLinks = document.querySelectorAll('.text-line');

menuLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const sectionId = link.getAttribute('href');
    const section = document.querySelector(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
  });
});
async function init() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const menuItems = document.querySelectorAll('.menu-item');
  const slideshow = document.getElementById('slideshow');
  const prevSlide = document.getElementById('prevSlide');
  const nextSlide = document.getElementById('nextSlide');
  const prevMenu = document.getElementById('prevMenu');
  const nextMenu = document.getElementById('nextMenu');
  const menuCarousel = document.getElementById('menuCarousel');

  // Inisialisasi slider
  const slider = await createSlider(slideshow);
  prevSlide.addEventListener('click', slider.prevSlide);
  nextSlide.addEventListener('click', slider.nextSlide);
  slider.startAutoSlide();

  // Inisialisasi carousel
  const { updateIndex } = await createCarousel(menuCarousel, prevMenu, nextMenu);

  // Inisialisasi filter
  await createFilter(filterButtons, menuItems, updateIndex);
}

init();
