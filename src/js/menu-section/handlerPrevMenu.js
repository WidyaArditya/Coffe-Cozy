// handlerPrevMenu.js
const handlerPrevMenu = async (currentIndex, updateIndex, visibleItemCount, prevButton) => {
  // Jika belum mencapai item pertama, geser ke item sebelumnya
  if (currentIndex > 0) {
    updateIndex(currentIndex - visibleItemCount);
    prevButton.disabled = false; // Aktifkan tombol prevButton
  } else {
    prevButton.disabled = true;
  }
};

export { handlerPrevMenu };
