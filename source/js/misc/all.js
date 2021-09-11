window.addEventListener('DOMContentLoaded', () => {
  const galleryFilter = document.querySelector('.gallery__filter');
  const miniGallerySection = document.querySelector('.section-gallery');

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

  if (isInPage(miniGallerySection)){
    const miniGallery = new MiniGallery();
  }

});




