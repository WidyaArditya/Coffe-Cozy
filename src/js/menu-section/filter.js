// filter.js
class createFilter {
  constructor(filterButtons, menuItems, updateIndex) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.filter(menuItems, button.dataset.category);
        updateIndex(0);
      });
    });
  }
  filter(items, category) {
    items.forEach((item) => {
      item.style.display = category === 'all' || item.classList.contains(category) ? 'block' : 'none';
    });
  }
}

export { createFilter };
