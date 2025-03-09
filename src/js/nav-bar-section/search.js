const searchButton = document.querySelector('#search');
const overlay = document.getElementById('overlay');
const fullscreenSearchBox = document.getElementById('fullscreen-search-box');
const arrowUpCircle = document.getElementById('arrow-up-circle');

// class
const bodyClasses = ['overflow-hidden', 'pointer-events-none'];

// efek DOM
const toggleSearch = () => {
  overlay.classList.toggle('hidden');
  document.body.classList.toggle(...bodyClasses);
};

const exitSearch = () => {
  setTimeout(() => {
    overlay.classList.add('hidden');
    document.body.classList.remove(...bodyClasses);
  }, 400);
};

const styleSearchEnter = () => {
  overlay.classList.remove('search-leave', 'search-leave-active');
  overlay.classList.add('search-enter');
  setTimeout(() => {
    overlay.classList.remove('search-enter');
    overlay.classList.add('search-enter-active');
  }, 100);
};

const styleSearchExit = () => {
  overlay.classList.remove('search-enter', 'search-enter-active');
  overlay.classList.add('search-leave');
  setTimeout(() => {
    overlay.classList.remove('search-leave');
    overlay.classList.add('search-leave-active');
  }, 300);
};

// eventListener
searchButton.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleSearch();
  styleSearchEnter();
  fullscreenSearchBox.focus();
});

arrowUpCircle.addEventListener('click', (e) => {
  e.stopPropagation();
  styleSearchExit();
  setTimeout(() => {
    exitSearch();
  }, 300);
});

document.addEventListener('mousedown', (e) => {
  if (overlay.classList.contains('search-enter-active') && !e.target.closest('#search-box, #fullscreen-search-box, #arrow-up-circle')) {
    styleSearchExit();
    setTimeout(() => {
      exitSearch();
    }, 300);
  }
});

// Add event listener to close search when pressing escape key or enter key
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Escape' || e.key === 'Enter') && overlay.classList.contains('search-enter-active')) {
    styleSearchExit();
    setTimeout(() => {
      exitSearch();
    }, 300);
  }
});
