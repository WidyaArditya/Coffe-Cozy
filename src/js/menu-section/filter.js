// filter.js
const createFilter = async (filterButtons, menuItems, updateIndex) => {
  // Event listener untuk tombol filter
  filterButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const category = button.getAttribute('data-category');
      await filterMenu(category, menuItems);

      // Setel ulang indeks carousel ke 0 (indeks awal)
      resetCarouselIndex();
    });
  });

  // Fungsi untuk memfilter menu
  const filterMenu = async (category, menuItems) => {
    if (category === 'all') {
      menuItems.forEach((item) => {
        item.style.display = 'block';
      });
    } else {
      menuItems.forEach((item) => {
        item.style.display = item.classList.contains(category) ? 'block' : 'none';
      });
    }
  };

  // Fungsi untuk mengatur ulang indeks carousel ke 0
  function resetCarouselIndex() {
    updateIndex(0); // Setel indeks ke 0 (indeks awal)
  }
};

export { createFilter };
