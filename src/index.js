import axios from 'axios';
import Notiflix from 'notiflix';
import ImageApiService from './search-service';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const form = document.querySelector('#search-form');
const divRender = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');
form.addEventListener('submit', onSearch);
const counter = document.querySelector('.img-counter');
loadBtn.addEventListener('click', onLoadMore);


const imageApiService = new ImageApiService();


const lightbox =  new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});


 async function onSearch(e){
e.preventDefault();

//clearImageList();
imageApiService.searchQuery = e.currentTarget.elements.searchQuery.value;

if(imageApiService.searchQuery === ''){
  Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
}else{
  imageApiService.resetPage();
  clearImageList();
  loadBtn.classList.add('is-hidden');
  const allImages = await imageApiService.fetchImage().then(createImage);
  loadBtn.classList.remove('is-hidden');
  
}

// if(imageApiService.page > Math.ceil(Number({totalHits} / imageApiService.perPage)) ) {
//   Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
//   LoadMoreBtnHide();
//   counteraHide();
//  return;
// };
// if((allImages.totalHits - imageApiService.perPage * (imageApiService.page - 1)) > 0) {
//   counterActive();
//   counter.innerHTML = `Ми знайшли для вас ще ${allImages.totalHits - imageApiService.perPage * (imageApiService.page - 1)}  зображень`;
// }
};


async function onLoadMore(){

   const allImages = await imageApiService.fetchImage().then(createImage);
    // console.log(imageApiService.page);
    // console.log(totalHits);
    // if(imageApiService.page > Math.ceil(Number(allImages.totalHits / imageApiService.perPage)) ) {
    //   Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
    //   LoadMoreBtnHide();
    //   counteraHide();
    //  return}
    
       
  
}
   
function counterActive() {
  counter.style.display = "block";
}
function counteraHide() {
  counter.style.display = "none";
}
function LoadMoreBtnHide() {
  loadBtn.style.display = "none";
}
function createImage({hits}){
     const markup = hits.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {return `<div class="photo-card">
     <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" width="370" /></a>
     <div class="info">
       <p class="info-item">
         <b>Likes: ${likes}</b>
       </p>
       <p class="info-item">
         <b>Views: ${views}</b>
       </p>
       <p class="info-item">
         <b>Comments: ${comments}</b>
       </p>
       <p class="info-item">
         <b>Downloads: ${downloads}</b>
       </p>
     </div>
   </div>`})
   divRender.insertAdjacentHTML("beforeend", markup);
   lightbox.refresh();
}


function clearImageList (){
  divRender.innerHTML = ' ';
}
