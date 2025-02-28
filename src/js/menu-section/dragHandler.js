// dragHandler.js
async function setupDragHandler(element, onDragEnd) {
  let startX = 0;
  let currentTranslate = 0;
  let isDragging = false;
  let itemWidth = 0;
  let maxTranslateX = 0;

  element.addEventListener(
    'touchstart',
    (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      currentTranslate = parseFloat(element.style.transform.match(/-?\d*\.?\d+/)[0] || 0);
    },
    { passive: true }
  );

  element.addEventListener(
    'touchmove',
    (e) => {
      if (!isDragging) return;

      const moveX = e.touches[0].clientX;
      const diffX = moveX - startX;
      const newTranslateX = currentTranslate + diffX;

      if (!itemWidth) {
        const itemStyle = window.getComputedStyle(element.children[0]);
        const marginLeft = parseFloat(itemStyle.marginLeft);
        const marginRight = parseFloat(itemStyle.marginRight);
        itemWidth = element.children[0].clientWidth + marginLeft + marginRight;
        maxTranslateX = -(element.children.length - 1) * itemWidth;
      }

      const minTranslateX = 0;

      // Batasi pergerakan carousel agar tidak melebihi batas
      if (newTranslateX > minTranslateX) {
        element.style.transform = `translateX(${minTranslateX}px)`;
      } else if (newTranslateX < maxTranslateX) {
        element.style.transform = `translateX(${maxTranslateX}px)`;
      } else {
        element.style.transform = `translateX(${newTranslateX}px)`;
      }
    },
    { passive: true }
  );

  element.addEventListener(
    'touchend',
    () => {
      isDragging = false;

      const translateX = parseFloat(element.style.transform.match(/-?\d*\.?\d+/)[0]);
      let newIndex = Math.round(-translateX / itemWidth);

      // Hitung index maksimum yang diperbolehkan
      const maxIndex = element.children.length - 1;

      // Pastikan newIndex tidak melebihi batas
      newIndex = Math.max(0, Math.min(newIndex, maxIndex)); // Pastikan newIndex valid

      // Perbarui posisi carousel berdasarkan newIndex
      const newTranslateX = -newIndex * itemWidth;
      element.style.transform = `translateX(${newTranslateX}px)`;
      element.style.transition = 'transform 0.3s ease';

      // Panggil callback onDragEnd dengan newIndex yang sudah dibatasi
      onDragEnd(newIndex);
    },
    { passive: true }
  );
}

export { setupDragHandler };
