class Gallery{
 constructor(){
  this.photos = document.querySelectorAll('.gallery__img'); 


  /* Modal */
  this.modal = document.querySelector('.cmodal');
  this.modalOverlay = document.querySelector('#cmodalOverlay');
  this.modalClose = document.querySelector('#cmodalClose');
  this.modalPrev = document.querySelector('.cmodal__prev');
  this.modalNext = document.querySelector('.cmodal__next');

  this.galleryPhotos = document.querySelector('.gallery__photos');
  this.galleryVideos = document.querySelector('.gallery__videos');
  

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
}