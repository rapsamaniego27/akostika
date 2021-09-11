class MiniGallery{
 constructor(){
   this.photos = document.querySelectorAll('.section-gallery__img');
   this.modalClose = document.querySelector('#cmodalClose');
   this.modalPrev = document.querySelector('.cmodal__prev');
   this.modalNext = document.querySelector('.cmodal__next');
   this.modalImg = document.querySelector('.cmodal-img');

   this.modal = document.querySelector('.cmodal');
   this.modalOverlay = document.querySelector('#cmodalOverlay');

   this.bindOpenModal();
   this.bindCloseModal();
   

   /* Function to go to next photo */
   this.nextPhoto = function (event) {
     event.preventDefault();

     console.log(event);

     const current = document.querySelector('.current--photo');
     const photos = document.querySelectorAll('.section-gallery__img');

     const next = current.nextElementSibling;
     const modalImg = document.querySelector('.cmodal-img');

     /* Checks if its the last picture which returns null */
     /* Else it will just keep looking for next element sibling */
     if (next == null) {
       photos[0].classList.add('current--photo');
       modalImg.src = photos[0].src;
     } else {
       next.classList.add('current--photo');
       modalImg.src = next.src;
     }
     current.classList.remove('current--photo');



   }

   /* Function to go to previous photo */
   this.prevPhoto = function (event) {
     event.preventDefault();

     const current = document.querySelector('.current--photo');
     const photos = document.querySelectorAll('.section-gallery__img');


     const prev = current.previousElementSibling;
     const modalImg = document.querySelector('.cmodal-img');


     /* Checks if its the last picture which returns null */
     /* Else it will just keep looking for next element sibling */
     if (prev == null) {
       photos[photos.length - 1].classList.add('current--photo');
       modalImg.src = photos[photos.length - 1].src;
     } else {
       prev.classList.add('current--photo');
       modalImg.src = prev.src;
     }
     current.classList.remove('current--photo');

   }
 }

 //Methods
  bindOpenModal(photos) {

    this.photos.forEach((photo, index) => {

      photo.addEventListener('click', (elem) => {
        elem.preventDefault();

        elem.target.classList.add('current--photo');
        this.modalImg.src = elem.target.src;

        this.modal.classList.remove('cmodal--hide');
        this.modalOverlay.classList.remove('cmodal--hide');

        this.bindNavigations();

      });
    });
  }



  bindNavigations() {

    this.modalNext.addEventListener('click', this.nextPhoto, false);
    this.modalPrev.addEventListener('click', this.prevPhoto, false);

  }

  bindCloseModal() {
    this.modalClose.addEventListener('click', (e) => {
      e.preventDefault();
      this.modal.classList.add('cmodal--hide');
      this.modalOverlay.classList.add('cmodal--hide');


      this.modalNext.removeEventListener('click', this.nextPhoto, false);
      this.modalPrev.removeEventListener('click', this.prevPhoto, false);

      this.modalNext.removeEventListener('click', this.nextVideo, false);
      this.modalPrev.removeEventListener('click', this.prevVideo, false);
    });


    this.modalOverlay.addEventListener('click', (e) => {
      this.modal.classList.add('cmodal--hide');
      this.modalOverlay.classList.add('cmodal--hide');


    });

  }
}