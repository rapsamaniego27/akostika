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