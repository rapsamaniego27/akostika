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

    current.nextElementSibling.classList.add('current--photo');

    const next = current.nextElementSibling;

    current.classList.remove('current--photo');


    const modalImg = document.querySelector('.cmodal-img');
    modalImg.src = next.children[0].src;

    /* this.modalImg.dataset.index = parseInt(this.modalImg.dataset.index) + 1;
 
    if (this.modalImg.dataset.index > photosArr.length - 1){
      this.modalImg.dataset.index = 0;
      this.modalImg.src = photosArr[0];
    }*/
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
   /* if(photosArr == ''){
      photosArr = this.generatePhotosArray(this.photos);
      console.log('true');
   }else{
     console.log(photosArr);
   } */


   this.modalNext.addEventListener('click', this.nextPhoto, false);



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
   const mediaSelect = document.querySelector('.gallery__filter-type');

    mediaSelect.addEventListener('input', (e)=> {
      const mediaType = e.target.value;

      const videoModal = document.querySelector('.cmodal-content__video');
      const photoModal = document.querySelector('.cmodal-content__image');

      if(mediaType == 'videos'){
       
        videoModal.classList.remove('cmodal--hide');
        photoModal.classList.add('cmodal--hide');

        this.galleryVideos.classList.remove('d-none');
        this.galleryPhotos.classList.add('d-none');

      }
      
      if (mediaType == 'photos') {
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
    

     data.fetchPhotos()
       .then(data => {
         let html = ``;
          data.forEach((album) => {
            if(album.year == year){
              html += `${this.UI.makeAlbum(album)}`;
            }
          });

          this.filterAlbumList.innerHTML = html;

          /* Binds a click to display photos in the album */

         const albums = document.querySelectorAll('.gallery__album__item');

         /* Binds a click event to albums to show their photos or videos */
         this.bindAlbumClick(albums, data);

       }).catch(err => {
         console.log(err);
       });
     
     
    
   });
 }
 

 bindAlbumClick(albums, data){
   albums.forEach(album => {
     let albumHTML = ``;
     album.addEventListener('click', (e) => {
       e.preventDefault();
       const id = album.dataset.id;

       const searchedAlbum = data.find(album => album.id == id);

       /* Creates the UI for the album */
       albumHTML += `${this.UI.makePhotoCards(searchedAlbum)}`;
       this.galleryPhotos.innerHTML = albumHTML;

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
 

 
}