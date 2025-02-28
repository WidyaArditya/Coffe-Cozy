async function createSlider(slideshow) {
  const slides = slideshow.children;
  let currentSlide = 0;
  let autoSlideIntervalId = null;
  const slideCount = slides.length;

  function showSlide(index) {
    if (index < 0 || index >= slideCount) return;
    currentSlide = index;
    slideshow.style.transform = `translateX(-${currentSlide * 100}%)`;
    slideshow.style.transition = 'transform 0.3s ease';
  }

  function nextSlide() {
    showSlide((currentSlide + 1) % slideCount);
  }

  function prevSlide() {
    showSlide((currentSlide - 1 + slideCount) % slideCount);
  }

  function startAutoSlide(interval = 5000) {
    if (autoSlideIntervalId) {
      clearInterval(autoSlideIntervalId);
    }
    autoSlideIntervalId = setInterval(() => {
      nextSlide();
    }, interval);
  }

  function stopAutoSlide() {
    if (autoSlideIntervalId) {
      clearInterval(autoSlideIntervalId);
      autoSlideIntervalId = null;
    }
  }

  showSlide(0);

  return {
    showSlide,
    nextSlide,
    prevSlide,
    startAutoSlide,
    stopAutoSlide,
  };
}

export { createSlider };
