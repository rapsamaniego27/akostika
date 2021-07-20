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