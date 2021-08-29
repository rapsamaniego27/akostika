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

  async fetchVideos() {
    let api = '../../data/videos.json';
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
  this.UI = new UI();
  this.photos = document.querySelectorAll('.gallery__img-link'); 

   this.filterAlbumList = document.querySelector('.gallery__filter-album__list');

  /* Modal */
  this.modal = document.querySelector('.cmodal');
  this.modalOverlay = document.querySelector('#cmodalOverlay');
  this.modalClose = document.querySelector('#cmodalClose');
  this.modalPrev = document.querySelector('.cmodal__prev');
  this.modalNext = document.querySelector('.cmodal__next');

  this.galleryPhotos = document.querySelector('.gallery__photos');
  this.galleryVideos = document.querySelector('.gallery__videos');
  

   this.modalImg = document.querySelector('.cmodal-img');
   this.modalVideo = document.querySelector('.cmodal-content__video');

  /* this.bindOpenModal(this.photos);
  this.generatePhotosArray(this.photos); */
  this.bindCloseModal();
/*   this.bindNavigations(); */
  this.bindMediaType();
  this.bindMediaYear();


  /* Can be attached and detached dpends if the next photo is clicked or when modal is Closed */

  /* Please see bindNavigations and bindCloseModal */
  this.nextPhoto = function(event){
    event.preventDefault();

    const current = document.querySelector('.current--photo');
    const photos = document.querySelectorAll('.gallery__img-link');
    

    const next = current.nextElementSibling;
    const modalImg = document.querySelector('.cmodal-img');

    /* Checks if its the last picture which returns null */
    /* Else it will just keep looking for next element sibling */
    if (next == null) {
      photos[0].classList.add('current--photo');
      modalImg.src = photos[0].firstElementChild.src;
    }else{
      next.classList.add('current--photo');
      modalImg.src = next.firstElementChild.currentSrc;
    }
    current.classList.remove('current--photo');

    
    
  }

  /* function Previous Photo */
   this.prevPhoto = function (event) {
     event.preventDefault();

     const current = document.querySelector('.current--photo');
     const photos = document.querySelectorAll('.gallery__img-link');


     const prev = current.previousElementSibling;
     const modalImg = document.querySelector('.cmodal-img');


     /* Checks if its the last picture which returns null */
     /* Else it will just keep looking for next element sibling */
     if (prev == null) {
       photos[photos.length - 1].classList.add('current--photo');
       modalImg.src = photos[photos.length - 1].firstElementChild.src;
     } else {
       prev.classList.add('current--photo');
       modalImg.src = prev.firstElementChild.currentSrc;
     }
     current.classList.remove('current--photo');

     

   }

   /* Function nextVideo */
   this.nextVideo = function (event) {
     event.preventDefault();

     const current = document.querySelector('.current--video');
     const videos = document.querySelectorAll('.gallery__video-wrapper');

     const modalVideo = document.querySelector('.cmodal-content__video');
     const next = current.nextElementSibling;



     /* Checks if its the last picture which returns null */
     /* Else it will just keep looking for next element sibling */
     if (next == null) {
       videos[0].classList.add('current--video');
       modalVideo.innerHTML = `${htmlDecode(videos[0].dataset.embed)}`;
     } else {
       next.classList.add('current--video');
       modalVideo.innerHTML = `${htmlDecode(next.dataset.embed)}`;
     }
     current.classList.remove('current--video');


   }

   this.prevVideo = function (event) {
     event.preventDefault();

     const current = document.querySelector('.current--video');
     const videos = document.querySelectorAll('.gallery__video-wrapper');

     const modalVideo = document.querySelector('.cmodal-content__video');
     const prev = current.previousElementSibling;



     /* Checks if its the last picture which returns null */
     /* Else it will just keep looking for next element sibling */
     if (prev == null) {
       videos[videos.length - 1].classList.add('current--video');
       modalVideo.innerHTML = `${htmlDecode(videos[videos.length - 1].dataset.embed)}`;
     } else {
       prev.classList.add('current--video');
       modalVideo.innerHTML = `${htmlDecode(prev.dataset.embed)}`;
     }
     current.classList.remove('current--video');


   }
 }

 //Methods

 bindOpenModal(photos){

  let photosArr = this.generatePhotosArray(photos);

  photos.forEach((photo, index) => {

    photo.addEventListener('click', (elem)=> {
      elem.preventDefault();

      this.modalImg.src = photosArr[index];
      this.modalImg.dataset.index = index;

      this.modal.classList.remove('cmodal--hide');
      this.modalOverlay.classList.remove('cmodal--hide');
      
    });
  });
 }

 bindCloseModal(){
  this.modalClose.addEventListener('click', (e)=> {
    e.preventDefault();
    this.modal.classList.add('cmodal--hide');
    this.modalOverlay.classList.add('cmodal--hide');
  

    this.modalNext.removeEventListener('click', this.nextPhoto, false);
    this.modalPrev.removeEventListener('click', this.prevPhoto, false);

    this.modalNext.removeEventListener('click', this.nextVideo, false);
    this.modalPrev.removeEventListener('click', this.prevVideo, false);
  });
  

   this.modalOverlay.addEventListener('click', (e)=> {
     console.log(e.target);
     this.modal.classList.add('cmodal--hide');
     this.modalOverlay.classList.add('cmodal--hide');

    
  });

 }

 generatePhotosArray(photos){
  const photosArr = [];
   
  photos.forEach(photo => {
    photosArr.push(photo.children[0].currentSrc);
  });

  return photosArr;

 }

 bindNavigations(photosArr = '', clickedPhoto, photoIndex){

   this.modalNext.addEventListener('click', this.nextPhoto, false);
   this.modalPrev.addEventListener('click', this.prevPhoto, false);

 }

 bindMediaType(){
   const mediaSelect = document.querySelector('.gallery__filter-type');
   const data = new Data();

    mediaSelect.addEventListener('input', (e)=> {
      const mediaType = e.target.value;
      const year = document.querySelector('.gallery__year').value;

      const videoModal = document.querySelector('.cmodal-content__video');
      const photoModal = document.querySelector('.cmodal-content__image');

      if(mediaType == 'videos'){
       
        videoModal.classList.remove('cmodal--hide');
        photoModal.classList.add('cmodal--hide');

        this.galleryVideos.classList.remove('d-none');
        this.galleryPhotos.classList.add('d-none');

        data.fetchVideos()
          .then(data => {
            let html = ``;
            data.forEach((album, index) => {
              if (album.year == year) {
                html += `${this.UI.makeAlbum(album, index)}`;
              }
            });
            

            this.filterAlbumList.innerHTML = html;

            /* Binds a click to display photos in the album */

            const albums = document.querySelectorAll('.gallery__album__item');
            albums[0].classList.add('gallery__album__item--current');

            /* Binds a click event to albums to show their photos or videos */
            this.bindVideoAlbumClick(albums, data);
            if (albums.length != 0) {
              albums[0].click();
            }
          })
          .catch(err => console.log(err));
          
          
      }
      
      if (mediaType == 'photos') {
        data.fetchPhotos()
        .then(data => {
          let html = ``;
          data.forEach((album, index) => {
            if (album.year == year) {
              html += `${this.UI.makeAlbum(album, index)}`;
            }
          });

          this.filterAlbumList.innerHTML = html;

          /* Binds a click to display photos in the album */

          const albums = document.querySelectorAll('.gallery__album__item');
          albums[0].classList.add('gallery__album__item--current');

          /* Binds a click event to albums to show their photos or videos */
          this.bindAlbumClick(albums, data);
          if (albums.length != 0) {
            albums[0].click();
          }

        }).catch(err => {
          console.log(err);
        });

        videoModal.classList.add('cmodal--hide');
        photoModal.classList.remove('cmodal--hide');

        this.galleryVideos.classList.add('d-none');
        this.galleryPhotos.classList.remove('d-none');

      }
    });
 }

 bindMediaYear(){
   const data = new Data();
   const mediaYear = document.querySelector('.gallery__filter-year');
   const mediaType = document.querySelector('.gallery__type');

   /* Listens to what year is chosen */
   mediaYear.addEventListener('input', (e)=> {
     const year = e.target.value;
     const type = mediaType.options[mediaType.selectedIndex].text;

     if(type == 'Photos'){
       data.fetchPhotos()
         .then(data => {
           let html = ``;
           data.forEach((album, index) => {
             if (album.year == year) {
               html += `${this.UI.makeAlbum(album, index)}`;
             }
           });

           this.filterAlbumList.innerHTML = html;

           /* Binds a click to display photos in the album */

           const albums = document.querySelectorAll('.gallery__album__item');
           albums[0].classList.add('gallery__album__item--current');

           /* Binds a click event to albums to show their photos or videos */
           this.bindAlbumClick(albums, data);
           if (albums.length != 0) {
             albums[0].click();
           }

         }).catch(err => {
           console.log(err);
         });
     }else{
       data.fetchVideos()
         .then(data => {
           let html = ``;
           data.forEach((album, index) => {
             if (album.year == year) {
               html += `${this.UI.makeAlbum(album, index)}`;
             }
           });

           this.filterAlbumList.innerHTML = html;

           /* Binds a click to display photos in the album */

           const albums = document.querySelectorAll('.gallery__album__item');
           albums[0].classList.add('gallery__album__item--current');

           /* Binds a click event to albums to show their photos or videos */
           this.bindVideoAlbumClick(albums, data);
           
           if (albums.length != 0) {
             albums[0].click();
           }

         }).catch(err => {
           console.log(err);
         });
     }
     
     
    
   });
 }
 

 bindAlbumClick(albums, data){
   albums.forEach(album => {
     let albumHTML = ``;
     album.addEventListener('click', (e) => {
       e.preventDefault();
       const id = album.dataset.id;
       /* Removes the former current album */
      const currentAlbum = document.querySelector('.gallery__album__item--current'); 

      currentAlbum.classList.remove('gallery__album__item--current');
      e.target.classList.add('gallery__album__item--current');

       const searchedAlbum = data.find(album => album.id == id);

       /* Creates the UI for the album */
       albumHTML += `${this.UI.makePhotoCards(searchedAlbum)}`;
       this.galleryPhotos.innerHTML = albumHTML;
       albumHTML = ``;

       const photos = document.querySelectorAll('.gallery__img-link');

       const photosArr = [];
       
       photos.forEach(photo => {
         photosArr.push(photo.children[0].src);
        });
        
        
        
        /* Binds a click to view photo in modal */
       photos.forEach((photo, index) => {
         photo.addEventListener('click', (e) => {
          e.preventDefault();
          
           this.modalImg.src = photosArr[index];
           this.modalImg.dataset.index = index;

           this.modal.classList.remove('cmodal--hide');
           this.modalOverlay.classList.remove('cmodal--hide');

           photo.classList.add('current--photo');

           this.bindNavigations(photosArr, photo, index);

         });
       });

     });
   });
 }
 

 bindVideoAlbumClick(albums, data){
  albums.forEach(album => {
    let albumHTML = ``;

    album.addEventListener('click', (e)=> {
      e.preventDefault();

      const id = album.dataset.id;
      

      const searchedAlbum = data.find(album => album.id == id);

      /* Creates the UI for the album */
      albumHTML += `${this.UI.makeVideoCards(searchedAlbum)}`;
      this.galleryVideos.innerHTML = albumHTML;
      albumHTML = ``;

      const videos = document.querySelectorAll('.gallery__video-wrapper');

      const videosArr = [];

      searchedAlbum.videos.forEach(video => {
        videosArr[video.id] = video.embed;
      });


      videos.forEach((video) => {
        video.addEventListener('click', (e)=> {
          e.preventDefault();
          const id = e.target.dataset.id;

          /* Checks if theres a matching video id on the chosen video album */
          const grabbedVideo = searchedAlbum.videos.find(video => video.id == id);

          /* grabbedVideo returns the iframe with HTML entities, so we have to manually 
          decode it with htmlDecode function we made */
          this.modalVideo.innerHTML = `${htmlDecode(grabbedVideo.embed)}`;

          /* Opens the modal */
          this.modal.classList.remove('cmodal--hide');
          this.modalOverlay.classList.remove('cmodal--hide');

          video.classList.add('current--video');
          this.bindVideoNavigations();
        });
      });

    });
  });

 }

  bindVideoNavigations() {

    this.modalNext.addEventListener('click', this.nextVideo, false);
    this.modalPrev.addEventListener('click', this.prevVideo, false);

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
class UI{
 constructor(){
  
 }

 //Methods
 makeAlbum(album, index){
  let layout = ``;
  let currentClass = ``;

  /* if (index == 0){
     currentClass = `gallery__album__item--current`;
  } */

  layout += `
    <a href="#" target="_blank" class="gallery__album__item" data-id="${album.id}">
     ${album.album_title }

    </a>
  `;

  return layout;w
 }

 makePhotoCards(album){
   let layout = ``;

   album.photos.forEach((photo, index) => {
     layout += `
     <a href="#" class="gallery__img-link" target="_blank">
      <img src="${photo.thumbnail}" alt="${photo.alt}" title="${photo.alt}" class="gallery__img" data-index="${index}">
    </a>
   `;
   });

   

   return layout;
 }

 makeVideoCards(album){
   let layout = ``;

   album.videos.forEach((video, index) => {
     layout += `
        <a href="#" class="gallery__video-wrapper" data-embed="${video.embed}" data-id="${video.id}">
        <div class="gallery__video">
          <span href="#" class="gallery__video-icon"><i class="fas fa-play"></i></span>
          <span class="gallery__video-overlay"></span>
          <img src="${video.thumbnail}" alt="" title="" class="gallery__video-thumb">
        </div>
        <h6 class="hex-dark gallery__video-title">${video.title}</h6>
        <p class="gallery__video-date">${video.date_recorded}</p>
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
window.addEventListener('DOMContentLoaded', () => {
  const galleryFilter = document.querySelector('.gallery__filter');

  if (isInPage(galleryFilter)) {
    const gallery = new Gallery();

    const albums = document.querySelectorAll('.gallery__album__item');
    const data = new Data();
    
   

    data.fetchPhotos()
    .then(data => {
      gallery.bindAlbumClick(albums, data);
      albums[0].click();
    }).catch(err=>{
      console.log(err);
    })

  

    

  }



});





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

function htmlDecode(input) {
  var e = document.createElement('textarea');
  e.innerHTML = input;
  // handle case of empty input
  return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
}
