import { setupDragHandler } from './dragHandler.js';
import { handlerPrevMenu } from './handlerPrevMenu.js';
import { handlerNextMenu } from './handlerNextMenu.js';

async function createCarousel(menuCarousel, prevMenu, nextMenu) {
  let currentIndex = 0;
  let isAnimating = false;
  let visibleItemCount = 0;

  function getVisibleItems() {
    return Array.from(menuCarousel.children).filter((item) => item.style.display !== 'none');
  }

  function calculateVisibleItemCount() {
    const visibleItems = getVisibleItems();
    if (visibleItems.length === 0) return 0;

    const containerWidth = menuCarousel.parentElement.clientWidth;
    const itemStyle = window.getComputedStyle(visibleItems[0]);
    const itemWidth = visibleItems[0].clientWidth;
    const marginLeft = parseFloat(itemStyle.marginLeft);
    const marginRight = parseFloat(itemStyle.marginRight);
    const totalItemWidth = itemWidth + marginLeft + marginRight;
    return Math.floor(containerWidth / totalItemWidth);
  }

  async function updateCarousel() {
    if (isAnimating) return;
    isAnimating = true;

    const visibleItems = getVisibleItems();
    currentIndex = Math.max(0, Math.min(currentIndex, visibleItems.length - 1));
    if (visibleItems.length === 0) {
      isAnimating = false;
      return; // No visible items
    }

    const itemStyle = window.getComputedStyle(visibleItems[0]);
    const marginLeft = parseFloat(itemStyle.marginLeft);
    const marginRight = parseFloat(itemStyle.marginRight);
    const itemWidth = visibleItems[0].clientWidth + marginLeft + marginRight;

    const maxTranslateX = Math.max(0, (visibleItems.length - visibleItemCount) * itemWidth); // Pastikan maxTranslateX tidak negatif
    const translateX = Math.min(currentIndex * itemWidth, maxTranslateX);

    menuCarousel.style.transform = `translateX(-${translateX}px)`;
    menuCarousel.style.transition = 'transform 0.3s ease';

    await new Promise((resolve) => setTimeout(resolve, 300));
    isAnimating = false;
    updateButtonState();
  }

  function updateButtonState() {
    const visibleItems = getVisibleItems();
    const maxIndex = visibleItems.length - visibleItemCount;

    nextMenu.disabled = currentIndex >= maxIndex; // Disable next button if at the end
    prevMenu.disabled = currentIndex <= 0; // Disable previous button if at the start
  }

  async function updateIndex(index) {
    const visibleItems = getVisibleItems();
    const maxIndex = Math.max(0, visibleItems.length - 1 - visibleItemCount); // Pastikan maxIndex tidak negatif
    index = Math.max(0, Math.min(index, maxIndex)); // Batasi indeks agar tidak melebihi batas
    currentIndex = index;
    await updateCarousel();

    // Prevent overscrolling
    if (currentIndex >= maxIndex) {
      const itemStyle = window.getComputedStyle(visibleItems[0]);
      const marginLeft = parseFloat(itemStyle.marginLeft);
      const marginRight = parseFloat(itemStyle.marginRight);
      const itemWidth = visibleItems[0].clientWidth + marginLeft + marginRight;

      menuCarousel.style.transform = `translateX(-${maxIndex * itemWidth}px)`;
      menuCarousel.style.transition = 'none'; // Disable animation
      currentIndex = maxIndex; // Update currentIndex
    }
  }

  // Event listener for next button
  nextMenu.addEventListener('click', async () => {
    visibleItemCount = calculateVisibleItemCount();
    await handlerNextMenu(currentIndex, menuCarousel, updateIndex, visibleItemCount, nextMenu);
  });

  // Event listener for previous button
  prevMenu.addEventListener('click', async () => {
    visibleItemCount = calculateVisibleItemCount();
    await handlerPrevMenu(currentIndex, updateIndex, visibleItemCount, prevMenu);
  });

  // Setup drag handler
  setupDragHandler(menuCarousel, async (newIndex) => {
    const visibleItems = getVisibleItems();
    const visibleItemCount = calculateVisibleItemCount();
    const maxIndex = Math.max(0, visibleItems.length - 1 - visibleItemCount); // Pastikan maxIndex tidak negatif

    newIndex = Math.max(0, Math.min(newIndex, maxIndex)); // Batasi indeks agar tidak melebihi batas
    await updateIndex(newIndex);
    await updateCarousel();
  });
  // Event listener for resize
  window.addEventListener('resize', async () => {
    visibleItemCount = calculateVisibleItemCount();
    const visibleItems = getVisibleItems();

    if (visibleItems.length === 0) return; // No visible items

    const itemStyle = window.getComputedStyle(visibleItems[0]);
    const marginLeft = parseFloat(itemStyle.marginLeft);
    const marginRight = parseFloat(itemStyle.marginRight);
    const itemWidth = visibleItems[0].clientWidth + marginLeft + marginRight;

    // Ensure currentIndex does not exceed bounds
    const maxIndex = visibleItemCount;
    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

    // Update carousel position
    menuCarousel.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    menuCarousel.style.transition = 'none'; // Disable animation during resize

    // After resize, enable animation again
    await new Promise((resolve) => setTimeout(resolve, 0));
    menuCarousel.style.transition = 'transform 0.3s ease';
    updateButtonState(); // Update button states
  });

  // Initialize carousel
  visibleItemCount = calculateVisibleItemCount();
  await updateCarousel();
  updateButtonState();
  return { updateIndex };
}

export { createCarousel };
