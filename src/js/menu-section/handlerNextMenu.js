const handlerNextMenu = async (currentIndex, menuCarousel, updateIndex, visibleItemCount, nextButton) => {
  const visibleItems = Array.from(menuCarousel.children).filter((item) => item.style.display !== 'none');

  // Hitung index maksimum yang diperbolehkan
  const maxIndex = visibleItems.length - 1 - visibleItemCount;
  currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
  // Perbarui currentIndex dengan nilai minimum antara currentIndex + 1 dan maxIndex
  const newIndex = Math.min(currentIndex + 1, maxIndex);

  // Jika sudah mencapai index terakhir, nonaktifkan tombol nextButton
  if (newIndex >= maxIndex) {
    nextButton.disabled = true;
    currentIndex = maxIndex; // Perbarui nilai currentIndex
  } else {
    nextButton.disabled = false;
  }
  // Perbarui posisi carousel dengan newIndex yang dibatasi
  await updateIndex(newIndex);
};
export { handlerNextMenu };
