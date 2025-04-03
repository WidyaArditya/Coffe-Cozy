// handlerPrevMenu.js
const handlerPrevMenu = async (currentIndex, updateIndex, visibleItemCount, prevButton) => {
  // Jika belum mencapai item pertama, geser ke item sebelumnya
  prevButton.disabled = currentIndex == 0;
  updateIndex(currentIndex - visibleItemCount);
};

export { handlerPrevMenu };
