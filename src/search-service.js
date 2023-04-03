import axios from 'axios';


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
