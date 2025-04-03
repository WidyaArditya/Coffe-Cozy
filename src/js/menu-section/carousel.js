import { DragHandler } from './dragHandler.js';
import { handlerPrevMenu } from './handlerPrevMenu.js';
import { handlerNextMenu } from './handlerNextMenu.js';

class createCarousel {
  constructor(menuCarousel, prevMenu, nextMenu) {
    this.menuCarousel = menuCarousel;
    this.prevMenu = prevMenu;
    this.nextMenu = nextMenu;
    this.currentIndex = 0;
    this.isAnimation = false;
    this.visibleItemCount = 0;
    this.initCarousel();
  }
  initCarousel() {
    this.visibleItemCount = this.calculateVisibleItemCount();
    this.updateCarousel();

    // NextButton
    this.nextMenu.addEventListener('click', async () => {
      this.visibleItemCount = this.calculateVisibleItemCount();
      const visibleItems = this.getVisibleItems();
      await handlerNextMenu(this.currentIndex, this.updateIndex.bind(this), this.visibleItemCount, this.nextMenu, visibleItems);
    });

    // prevButton
    this.prevMenu.addEventListener('click', async () => {
      this.visibleItemCount = this.calculateVisibleItemCount();
      await handlerPrevMenu(this.currentIndex, this.updateIndex.bind(this), this.visibleItemCount, this.prevMenu);
    });

    // DragHandler
    new DragHandler(this.menuCarousel, async (newIndex) => {
      const visibleItems = this.getVisibleItems();
      this.visibleItemCount = this.calculateVisibleItemCount();
      const maxIndex = Math.max(0, visibleItems.length - 1 - this.visibleItemCount);
      newIndex = Math.max(0, Math.min(newIndex, maxIndex));
      await this.updateIndex(newIndex);
      await this.updateCarousel();
    });

    // resize Handler
    window.addEventListener('resize', async () => {
      await this.handleResize();
    });
  }

  getVisibleItems() {
    return Array.from(this.menuCarousel.children).filter((item) => window.getComputedStyle(item).display !== 'none');
  }

  calculateVisibleItemCount() {
    const visibleItems = this.getVisibleItems();
    if (visibleItems.length === 0) return 0;
    const containerWidth = this.menuCarousel.parentElement.clientWidth;
    const itemStyle = window.getComputedStyle(visibleItems[0]);
    const itemWidth = visibleItems[0].clientWidth;
    const marginLeft = parseFloat(itemStyle.marginLeft);
    const marginRight = parseFloat(itemStyle.marginRight);
    const totalItemWidth = itemWidth + marginLeft + marginRight;
    return Math.floor(containerWidth / totalItemWidth);
  }
  async updateCarousel() {
    if (this.isAnimating) return;
    this.isAnimating = true;

    const visibleItems = this.getVisibleItems();
    const maxIndex = Math.max(0, visibleItems.length - this.visibleItemCount - 1);
    this.currentIndex = Math.max(0, Math.min(this.currentIndex, maxIndex));

    if (visibleItems.length === 0) {
      this.isAnimating = false;
      return; // No visible items
    }

    const itemStyle = window.getComputedStyle(visibleItems[0]);
    const marginLeft = parseFloat(itemStyle.marginLeft);
    const marginRight = parseFloat(itemStyle.marginRight);
    const itemWidth = visibleItems[0].clientWidth + marginLeft + marginRight;
    const translateX = this.currentIndex * itemWidth;

    this.menuCarousel.style.transform = `translateX(-${translateX}px)`;
    this.menuCarousel.style.transition = 'transform 0.3s ease';
    await new Promise((resolve) => setTimeout(resolve, 300));
    this.isAnimating = false;

    this.updateButtonState();
  }

  updateButtonState() {
    const visibleItems = this.getVisibleItems();
    const maxIndex = visibleItems.length - 1 - this.visibleItemCount;
    this.nextMenu.disabled = this.currentIndex >= maxIndex; // Disable next button if at the end
    this.prevMenu.disabled = this.currentIndex <= 0; // Disable previous button if at the start
  }

  async updateIndex(index) {
    const visibleItems = this.getVisibleItems();
    this.visibleItemCount = this.calculateVisibleItemCount();
    const maxIndex = Math.max(0, visibleItems.length - this.visibleItemCount);
    index = Math.max(0, Math.min(index, maxIndex));
    this.currentIndex = index; // Update currentIndex here
    await this.updateCarousel();
  }

  async handleResize() {
    const visibleItems = this.getVisibleItems();
    if (visibleItems.length === 0) return; // No visible items
    const newVisibleItemCount = this.calculateVisibleItemCount();
    const maxIndex = Math.max(0, visibleItems.length - 1 - newVisibleItemCount);

    const currentTranslateX = parseFloat(this.menuCarousel.style.transform.match(/-?\d*\.?\d+/)[0]);
    const itemWidth = visibleItems[0].clientWidth + parseFloat(window.getComputedStyle(visibleItems[0]).marginLeft) + parseFloat(window.getComputedStyle(visibleItems[0]).marginRight);
    this.currentIndex = Math.floor(-currentTranslateX / itemWidth);

    this.currentIndex = Math.max(0, Math.min(this.currentIndex, maxIndex));

    const translateX = this.currentIndex * itemWidth;
    this.menuCarousel.style.transition = 'none'; // Disable transition for immediate update
    this.menuCarousel.style.transform = `translateX(-${translateX}px)`; // Update position

    await new Promise((resolve) => setTimeout(resolve, 0)); // Allow DOM to update
    this.menuCarousel.style.transition = 'transform 0.3s ease'; // Re-enable transition

    this.updateButtonState(); // Update button states based on new index
  }
}

export { createCarousel };
