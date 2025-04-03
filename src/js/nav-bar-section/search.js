class SearchManager {
  constructor() {
    this.searchButton = document.querySelector('#search');
    this.overlay = document.getElementById('overlay');
    this.fullscreenSearchBox = document.getElementById('fullscreen-search-box');
    this.arrowUpCircle = document.getElementById('arrow-up-circle');
    // css class
    this.bodyClasses = ['overflow-hidden', 'pointer-events-none'];
    // eventlistener
    this.searchButton.addEventListener('click', this.toggleSearch.bind(this));
    this.arrowUpCircle.addEventListener('click', this.exitSearch.bind(this));
    document.addEventListener('mousedown', this.handleMousedown.bind(this));
    document.addEventListener('keydown', this.handleKeydown.bind(this));
  }

  toggleSearch() {
    this.overlay.classList.toggle('hidden');
    document.body.classList.toggle(...this.bodyClasses);
    this.styleSearchEnter();
    this.fullscreenSearchBox.focus();
  }

  exitSearch() {
    this.styleSearchExit();
    setTimeout(() => {
      this.overlay.classList.add('hidden');
      document.body.classList.remove(...this.bodyClasses);
    }, 400);
  }

  styleSearchEnter() {
    this.overlay.classList.remove('search-leave', 'search-leave-active');
    this.overlay.classList.add('search-enter');
    setTimeout(() => {
      this.overlay.classList.remove('search-enter');
      this.overlay.classList.add('search-enter-active');
    }, 200);
  }

  styleSearchExit() {
    this.overlay.classList.remove('search-enter', 'search-enter-active');
    this.overlay.classList.add('search-leave');
    setTimeout(() => {
      this.overlay.classList.remove('search-leave');
      this.overlay.classList.add('search-leave-active');
    }, 200);
  }

  handleMousedown(e) {
    if (this.overlay.classList.contains('search-enter-active') && !e.target.closest('#search-box, #fullscreen-search-box, #arrow-up-circle')) {
      this.styleSearchExit();
      setTimeout(() => {
        this.exitSearch();
      }, 300);
    }
  }

  handleKeydown(e) {
    if ((e.key === 'Escape' || e.key === 'Enter') && this.overlay.classList.contains('search-enter-active')) {
      this.styleSearchExit();
      setTimeout(() => {
        this.exitSearch();
      }, 300);
    }
  }
}

const searchManager = new SearchManager();
