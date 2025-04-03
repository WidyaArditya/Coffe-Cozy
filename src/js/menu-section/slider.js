class createSlider {
  constructor(slideshow) {
    this.slideshow = slideshow;
    this.slides = slideshow.children;
    this.currentSlide = 0;
    this.autoSlideIntervalId = null;
    this.slideCount = this.slides.length;

    this.showSlide(this.currentSlide);
  }
  showSlide(index) {
    if (index < 0 || index >= this.slideCount) return;
    this.currentSlide = index;
    this.updatePosition();
  }
  updatePosition() {
    this.slideshow.style.transform = `translateX(-${this.currentSlide * 100}%)`;
    this.slideshow.style.transition = 'transform 0.3s ease';
  }
  nextSlide() {
    this.stopAutoSlide();
    this.showSlide((this.currentSlide + 1) % this.slideCount);
    this.restartAutoSlide();
  }

  prevSlide() {
    this.stopAutoSlide();
    this.showSlide((this.currentSlide - 1 + this.slideCount) % this.slideCount);
    this.restartAutoSlide();
  }

  startAutoSlide(interval = 5000) {
    if (this.autoSlideIntervalId) {
      this.stopAutoSlide();
    }
    this.autoSlideIntervalId = setInterval(() => {
      this.nextSlide();
    }, interval);
  }

  stopAutoSlide() {
    if (this.autoSlideIntervalId) {
      clearInterval(this.autoSlideIntervalId);
      this.autoSlideIntervalId = null;
    }
  }
  restartAutoSlide(delay = 10000) {
    setTimeout(() => {
      this.startAutoSlide();
    }, delay);
  }
}

export { createSlider };
