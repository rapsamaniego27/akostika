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