// dragHandler.js
class DragHandler {
  constructor(element, onDragEnd) {
    this.startX = 0;
    this.currentTranslate = 0;
    this.isDragging = false;
    this.itemWidth = 0;
    this.maxTranslateX = 0;
    // parameter
    this.element = element;
    this.onDragEnd = onDragEnd;
    this.init();
  }
  init() {
    this.element.addEventListener('touchstart', this.handleStartDrag.bind(this), { passive: true });
    this.element.addEventListener('touchmove', this.handleMoveDrag.bind(this), { passive: true });
    this.element.addEventListener('touchend', this.handleEndDrag.bind(this), { passive: true });
  }
  handleStartDrag(e) {
    this.isDragging = true;
    this.startX = e.touches[0].clientX;
    this.currentTranslate = parseFloat(this.element.style.transform.match(/-?\d*\.?\d+/)[0] || 0);
  }
  handleMoveDrag(e) {
    if (!this.isDragging) return;

    const moveX = e.touches[0].clientX;
    const diffX = moveX - this.startX;
    const newTranslateX = this.currentTranslate + diffX;

    if (!this.itemWidth) {
      const itemStyle = window.getComputedStyle(this.element.children[0]);
      const marginLeft = parseFloat(itemStyle.marginLeft);
      const marginRight = parseFloat(itemStyle.marginRight);
      this.itemWidth = this.element.children[0].clientWidth + marginLeft + marginRight;
      this.maxTranslateX = -(this.element.children.length - 1) * this.itemWidth;
    }

    const minTranslateX = 0;

    // Batasi pergerakan carousel agar tidak melebihi batas
    if (newTranslateX > minTranslateX) {
      this.element.style.transform = `translateX(${minTranslateX}px)`;
    } else if (newTranslateX < this.maxTranslateX) {
      this.element.style.transform = `translateX(${this.maxTranslateX}px)`;
    } else {
      this.element.style.transform = `translateX(${newTranslateX}px)`;
    }
  }
  handleEndDrag() {
    this.isDragging = false;
    const translateX = parseFloat(this.element.style.transform.match(/-?\d*\.?\d+/)[0]);
    let newIndex = Math.round(-translateX / this.itemWidth);
    // Hitung index maksimum yang diperbolehkan
    const maxIndex = this.element.children.length - 1;
    // Pastikan newIndex tidak melebihi batas
    newIndex = Math.max(0, Math.min(newIndex, maxIndex)); // Pastikan newIndex valid
    // Perbarui posisi carousel berdasarkan newIndex
    const newTranslateX = -newIndex * this.itemWidth;
    this.element.style.transform = `translateX(${newTranslateX}px)`;
    this.element.style.transition = 'transform 0.3s ease';

    // Panggil callback onDragEnd dengan newIndex yang sudah dibatasi
    this.onDragEnd(newIndex);
  }
}

export { DragHandler };
