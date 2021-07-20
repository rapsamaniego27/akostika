class Data{
 constructor(){
  
 }

 //Methods
 async fetchPhotos(){
    let api = '../../data/photos.json';
    let response = await fetch(api);
    let data = await response.json();
 
    return data;
  }
}

/* Run this for testing API fetching */

/* const data = new Data();

data.fetchSiblings()
    .then(data => {
     console.log(data);
    })
    .catch(err => console.log(err)); */

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
class UI{
 constructor(){
  
 }

 //Methods
 makeAlbum(album, index){
  let layout = ``;
  let currentClass = ``;

  if (index == 0){
     currentClass = `gallery__album__item--current`;
  }

  layout += `
    <a href="#" target="_blank" class="gallery__album__item ${currentClass}" data-id="${album.id}">
     ${album.album_title }

    </a>
  `;

  return layout;
 }

 makePhotoCards(album){
   let layout = ``;

   album.photos.forEach((photo, index) => {
     layout += `
     <a href="#" class="gallery__img-link" target="_blank">
      <img src="${photo.thumbnail}" alt="Sample Alt" title="Sample Title" class="gallery__img" data-index="${index}">
    </a>
   `;
   });

   

   return layout;
 }
}
let pattern;

/* Regular expression pattern */
pattern = /hello/i;

//String to match
const str = 'Hello';

//Log Results
const result = pattern.exec(str);



/* Function to test if the str passes the pattern. */
function patternTest(pattern, str){
 if(pattern.test(str)){
  console.log(`${str} matches ${pattern.source}`);
 }else{
  console.log(`${str} does NOT match ${pattern.source}`);
 }
}

/* patternTest(pattern, str); */

const galleryFilter = document.querySelector('.gallery__filter');

if (isInPage(galleryFilter)) {
  const gallery = new Gallery();
}

const navOpen = document.querySelector('#menuOpen');
const navOverlay = document.querySelector('#cmodalOverlay');
const nav = document.querySelector('#cmenu');
const navClose = document.querySelector('#menuClose');

//Instantiate
const menuet = new Menuet({
  nav: nav,
  openTrigger: navOpen,
  closeTrigger: navClose,
  overlay: navOverlay,
  subMenus: ''
});

//Display output

function isInPage(node) {
  return (node === document.body) ? false : document.body.contains(node);
}
