// handlerPrevMenu.js
async function handlerPrevMenu(currentIndex, updateIndex, visibleItemCount, prevButton) {
  // Jika belum mencapai item pertama, geser ke item sebelumnya
  if (currentIndex > 0) {
    updateIndex(currentIndex - visibleItemCount);
    prevButton.disabled = false; // Aktifkan tombol prevButton
  } else {
    // Jika sudah di item pertama, nonaktifkan tombol prevButton
    prevButton.disabled = true;
  }
}

export { handlerPrevMenu };
