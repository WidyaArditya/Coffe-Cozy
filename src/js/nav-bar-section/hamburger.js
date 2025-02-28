const navToggle = {
  hamburger: document.querySelector('#hamburger'),
  navMenu: document.querySelector('#nav-menu'),
  isHidden: true,
  animating: false,
  toggle: function () {
    if (this.animating) return;
    this.animating = true;
    this.isHidden = !this.isHidden;
    if (!this.isHidden && this.navMenu.classList.contains('hidden')) {
      this.hamburger.classList.add('hamburger-active');
      this.navMenu.classList.remove('hidden', 'menu-leave', 'menu-leave-active');
      this.navMenu.classList.add('menu-enter');
      setTimeout(() => {
        this.navMenu.classList.remove('menu-enter');
        this.navMenu.classList.add('menu-enter-active');
        this.animating = false;
      }, 100);
    } else {
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
  },
  init: function () {
    this.hamburger.addEventListener('click', this.toggle.bind(this));

    document.addEventListener('click', (e) => {
      if (e.target !== this.hamburger && !this.navMenu.contains(e.target) && !this.isHidden && !this.animating) {
        this.toggle();
        e.preventDefault();
        e.stopPropagation();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && !this.isHidden) {
        this.toggle();
      }
    });
  },
};
navToggle.init();
