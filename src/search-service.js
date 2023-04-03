import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const MY_KEY = '34900621-acb9776efa6b0b3f8d58bb60a';
export default class ImageApiService {
    constructor(){
        this.searchQuery = '';
        this.page = 1;
        this.perPage = 40;
     
        
    }

    async fetchImage() {
        try {
          const response = await axios.get(`${BASE_URL}?key=${MY_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`
          )
          const data = response.data;
            this.incrementPage();
            const totalHits = data.totalHits;
            const hits = data.hits;
            console.log(this.page);

            // if(this.page > Math.ceil(Number(totalHits / this.perPage)) ) {
            //     Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
               
            //   };
            console.log(hits);
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
            return data;
    
        } catch (error) {
          console.log(error);
        }
      }
    incrementPage(){
        this.page += 1; 
    }
    resetPage(){
        this.page=1;
    }
   
}
