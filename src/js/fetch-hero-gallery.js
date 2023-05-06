// 'use strict';
// import axios from 'axios';

// // Fetch images from Pixabay API using Axios

// export default class ImagesFetcher {
//     #BASE_URL = 'https://rickandmortyapi.com/api';
//     constructor() {
//         this.query = '';
//         this.page = null;
//         this.perPage = 20;
//         this.totalPage = 1;
//     }
     
//     async getRequest() {
//         try {
//           // const response = await axios.get(this.#BASE_URL/character?name=${characterName});
          

//           if (response.data === 0) {Notify.failure("Sorry, we can't found any heroes for your request. Please try again.");} 
          
//           this.characters = response.data.character;
//           this.locations = response.data.location;
//           this.episodes = response.data.episode;
//           console.log(this.characters);
//           console.log(this.locations);
//           console.log(this.episodes);  

//           const data = await response.data;
//           console.log(data); 
//           return data;
//         } catch (err) {
//           console.log(err);
//         }
    
//     };
// }
'use strict';
import axios from 'axios';

export default class ImgsFetcher {
  #BASE_URL = 'https://rickandmortyapi.com/api';
  constructor() {
    this.query = '';
    this.page = null;
    this.perPage = 20;
    this.totalPage = 1;
  }
  async getRequest(characterName) {
    try {
      console.log('Hello!');
      const response = await axios.get(
        `${this.#BASE_URL}/character?name=${characterName}`
      );
      console.log(response.data);

      if (response.data.total === 0) {
        Notify.failure(
          "Sorry, we can't find any heroes for your request. Please try again."
        );
      }

      this.totalPage = Math.ceil(response.data.total / this.perPage);
      console.log(this.totalPage);

      const data = await response.data;
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}

// const heroFetcher = new ImgsFetcher();
// imagesFetcher.getRequest('Rick');