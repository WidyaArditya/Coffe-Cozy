class NavToggle {
  constructor() {
    this.hamburger = document.querySelector('#hamburger');
    this.navMenu = document.querySelector('#nav-menu');
    this.isHidden = true;
    this.animating = false;
    this.hamburger.addEventListener('click', this.toggle.bind(this));
    document.addEventListener('click', this.handleDocumentClick.bind(this));
    window.addEventListener('resize', this.handleWindowsResize.bind(this));
  }

  showMenu() {
    this.hamburger.classList.add('hamburger-active');
    this.navMenu.classList.remove('hidden', 'menu-leave', 'menu-leave-active');
    this.navMenu.classList.add('menu-enter');
    setTimeout(() => {
      this.navMenu.classList.remove('menu-enter');
      this.navMenu.classList.add('menu-enter-active');
      this.animating = false;
    }, 100);
  }
  hideMenu() {
    this.navMenu.classList.remove('menu-enter', 'menu-enter-active');
    this.navMenu.classList.add('menu-leave');
    setTimeout(() => {
      this.navMenu.classList.remove('menu-leave');
      this.navMenu.classList.add('menu-leave-active');
      this.hamburger.classList.remove('hamburger-active');
      setTimeout(() => {
        this.navMenu.classList.add('hidden');
        this.animating = false;
      }, 300);
    }, 300);
  }
  toggle() {
    if (this.animating) return;
    this.animating = true;
    this.isHidden = !this.isHidden;
    if (!this.isHidden) {
      this.showMenu();
    } else {
      this.hideMenu();
    }
  }
  handleDocumentClick(e) {
    if (e.target !== this.hamburger && !this.navMenu.contains(e.target) && !this.isHidden && !this.animating) {
      this.toggle();
      e.preventDefault();
      e.stopPropagation();
    }
  }
  handleWindowsResize() {
    if (window.innerWidth > 768) {
      this.showMenu();
      this.isHidden = false;
    } else if (window.innerWidth <= 768) {
      this.hideMenu();
      this.isHidden = true;
    }
  }
}
const navToggle = new NavToggle();
