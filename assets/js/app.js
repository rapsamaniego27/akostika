class Data{
 constructor(){
  
 }

 //Methods
 async fetchSiblings(){
    let api = '../data/siblings.json';
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
class Gallery{
 constructor(){
  this.photos = document.querySelectorAll('.gallery__img'); 


  /* Modal */
  this.modal = document.querySelector('.cmodal');
  this.modalOverlay = document.querySelector('#cmodalOverlay');
  this.modalClose = document.querySelector('#cmodalClose');
  this.modalPrev = document.querySelector('.cmodal__prev');
  this.modalNext = document.querySelector('.cmodal__next');
  

   this.modalImg = document.querySelector('.cmodal-img');

  this.openModal();
  this.closeModal();
  this.generatePhotosArray();
  this.bindNavigations();
  this.bindMediaType();
 }

 //Methods
 openModal(){

  let photosArr = this.generatePhotosArray(this.photos);
  

  this.photos.forEach((photo, index) => {

    photo.addEventListener('click', (elem)=> {

      this.modalImg.src = photosArr[index];
      this.modalImg.dataset.index = index;

      this.modal.classList.remove('cmodal--hide');
      this.modalOverlay.classList.remove('cmodal--hide');
      
    });
  });
 }

 closeModal(){
  this.modalClose.addEventListener('click', (e)=> {
    e.preventDefault();
    this.modal.classList.add('cmodal--hide');
    this.modalOverlay.classList.add('cmodal--hide');
  });

   this.modalOverlay.addEventListener('click', (e)=> {
     console.log(e.target);
     this.modal.classList.add('cmodal--hide');
     this.modalOverlay.classList.add('cmodal--hide');
  });

 }

 generatePhotosArray(arr){
  let photosArr = [];
  const photos = document.querySelectorAll('.gallery__img');
   
  photos.forEach(photo => {
    
    photosArr.push(photo.src);
  });


  return photosArr;

 }

 bindNavigations(){
   const photosArr = this.generatePhotosArray(this.photos);
   let current = 0;

   this.modalNext.addEventListener('click', (e)=> {
    e.preventDefault();


     this.modalImg.src = photosArr[parseInt(this.modalImg.dataset.index) + 1];
     this.modalImg.dataset.index = parseInt(this.modalImg.dataset.index) + 1;

     if (this.modalImg.dataset.index > photosArr.length - 1){ 
       this.modalImg.dataset.index = 0;
       this.modalImg.src = photosArr[0];
     }

     
  });

   this.modalPrev.addEventListener('click', (e) => {
     e.preventDefault();

     this.modalImg.src = photosArr[parseInt(this.modalImg.dataset.index) - 1];
     this.modalImg.dataset.index = parseInt(this.modalImg.dataset.index) - 1;

     if (this.modalImg.dataset.index < 0 ) {
       this.modalImg.dataset.index = photosArr.length - 1;
       this.modalImg.src = photosArr[photosArr.length - 1];
     }


   });
 }

 bindMediaType(){
   const mediaSelect = document.querySelector('.gallery__filter-select');

    mediaSelect.addEventListener('input', (e)=> {
      const mediaType = e.target.value;

      const videoModal = document.querySelector('.cmodal-content__video');
      const photoModal = document.querySelector('.cmodal-content__image');

      if(mediaType == 'videos'){
       
        videoModal.classList.remove('cmodal--hide');
        photoModal.classList.add('cmodal--hide');
      }
      
      if (mediaType == 'photos') {
        videoModal.classList.add('cmodal--hide');
        photoModal.classList.remove('cmodal--hide');
      }
    });
 }
}
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
