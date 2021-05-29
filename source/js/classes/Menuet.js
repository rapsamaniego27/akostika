/* Notes:
  <a> should always be the one clickable having a full height and width

  always use max-height to transition height
*/

class Menuet {
  constructor({
    nav,
    openTrigger,
    closeTrigger,
    overlay,
    subMenus
  }) {
    /* Arguments */
    this.nav = nav;
    this.openTrigger = openTrigger;
    this.overlay = overlay;
    this.closeTrigger = closeTrigger;
    this.subMenus = subMenus

    /* Parents */
    this.header = document.querySelector('header');
    this.body = document.querySelector('body');
    this.header = document.querySelector('.header');
    this.wrapper = document.querySelector('#wrapper');
    this.main = document.querySelector('#main');


    //Automatic runs these functions
    this.open();
    this.close();
    this.stick();

  }

  // Properties

  open() {
    this.openTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const menuItems = document.querySelectorAll('.cmenu__item');

      this.nav.classList.remove('cmenu--hide');
      this.overlay.classList.remove('cmodal--hide');
      //this.closeTrigger.classList.remove('menu--disable');


     /*  menuItems.forEach(item => {
        item.firstElementChild.classList.remove('pointer-events-none');
      }); */


    }, false);
  }

  close() {
    this.closeTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      const menuItems = document.querySelectorAll('.cmenu__item');

      this.nav.classList.add('cmenu--hide');
      this.overlay.classList.add('cmodal--hide');
      //this.closeTrigger.classList.add('menu--disable');
      
      /* menuItems.forEach(item => {
        item.firstElementChild.classList.add('pointer-events-none');
      }); */

    });

    this.overlay.addEventListener('click', (e) => {
      e.preventDefault();
      const menuItems = document.querySelectorAll('.cmenu__item');

      this.nav.classList.add('cmenu--hide');
      this.overlay.classList.add('cmodal--hide');
      //this.closeTrigger.classList.add('menu--disable');

      /* menuItems.forEach(item => {
        item.firstElementChild.classList.add('pointer-events-none');
      }); */

    });
  }

  stick() {
    /* The scrollbar is in the wrapper div */
    this.wrapper.addEventListener('scroll', () => {
      let fromTop = this.wrapper.scrollTop;
      let screenWidth = document.body.clientWidth;
      const headerHeight = this.header.clientHeight;


      /* Detects if screen width is mobile or not
         then it declares a height trigger when scrolled.
      */
      const TRIGGER_HEIGHT = screenWidth > 800 ? 30 : 5;

      /* Adds fixed head and a dynamic top 
         padding for main content */
      if (fromTop >= TRIGGER_HEIGHT) {
        this.header.classList.add('header--sticky');
        /* this.main.style.paddingTop = `${headerHeight}px`; */
      } else {
        this.header.classList.remove('header--sticky');
        /* this.main.style.paddingTop = `0`; */
      }

    });
  }

  /* Checks if device is mobile */
  isMobile() {
    if (navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i))

      return true;
  }

}