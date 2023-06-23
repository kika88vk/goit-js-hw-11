import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
import { fetchGetImage } from './pic-api';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

let page = 1;

loadBtn.style.display = 'none';




searchForm.addEventListener("submit", getWordFromForm);
loadBtn.addEventListener("click", onClickLoadMore);


let lightbox = new SimpleLightbox('.gallery a', {

    captionDelay: 250,
});




function getWordFromForm(event) {
    event.preventDefault();
    loadBtn.style.display = 'none';
    gallery.innerHTML = "";
    page = 1;


    const { elements: { searchQuery } } = event.currentTarget;
    let searchWord = searchQuery.value.trim();

    if (!searchWord) {
        Notiflix.Notify.warning('Input is empty! Write a search word please!');
        return;
    }

    getImages(searchWord, page);


    loadBtn.style.display = 'block';
    checkTotalHits(searchWord);
}



function onClickLoadMore() {
    let searchWord = searchForm.elements.searchQuery.value.trim();
    page += 1;

    getImages(searchWord, page);


}



async function checkTotalHits(searchWord) {
    try {
        let { totalHits } = await fetchGetImage(searchWord);
        if (totalHits > 0) {
            Notiflix.Notify.success(`✅Hooray! We found ${totalHits} images.`);
        }

    } catch (error) {
        console.log(error);
    }
}


async function getImages(searchWord, page) {
    try {
        let { hits, totalHits } = await fetchGetImage(searchWord, page);
        renderImages(hits);
        lightbox.refresh();

        if (totalHits === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
            loadBtn.style.display = 'none';
            return
        } if (hits.length === 0) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
            loadBtn.style.display = 'none';
        }

    } catch (error) {
        console.log(error);
    }
}




function renderImages(hits) {

    const markup = hits.map(img =>
        `<div class="photo-card">
        <a href="${img.largeImageURL}" class="card-a">
        <img src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
        <div class="info">
            <p class="info-item">
            <b>Likes ${img.likes}</b>
            </p>
            <p class="info-item">
            <b>Views ${img.views}</b>
            </p>
            <p class="info-item">
            <b>Comments ${img.comments}</b>
            </p>
            <p class="info-item">
            <b>Downloads ${img.downloads}</b>
            </p>
        </div>
        </a>
        </div>
    `).join("");
    gallery.insertAdjacentHTML('beforeend', markup);
}







// Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
// Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
// Notiflix.Notify.warning('Попередження');
// Notiflix.Notify.info('Інфо');


