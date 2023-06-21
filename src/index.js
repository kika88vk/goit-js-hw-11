import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"

import { fetchGetImage } from './pic-api';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

// fetchGetImage('blue flowers').then(resp => console.log(resp.data.hits[0].webformatURL))
// fetchGetImage('sky').then(resp => {
//     let arr = resp.data.hits;
//     console.log(arr)
// }).catch((error) => console.log(error))



searchForm.addEventListener("submit", getWordFromForm);

function getWordFromForm(event) {
    gallery.innerHTML = "";
    event.preventDefault();
    const { elements: { searchQuery } } = event.currentTarget;
    let searchWord = searchQuery.value;

    console.log(searchWord)


    fetchGetImage(searchWord).then((resp) => {
        renderImages(resp);
        Notiflix.Notify.success(`✅Hooray! We found ${resp.data.totalHits} images.`);
    }).catch((error) => console.log(error));
    event.currentTarget.reset();
}


function renderImages(resp) {
    let hitsArray = resp.data.hits;
    const markup = hitsArray.map(img => {
        `<a href="${img.largeImageURL}">
        <div class="photo-card">
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
        </div>
    </a>`;
    }).join("");
    gallery.innerHTML += markup;

    let lightbox = new SimpleLightbox('.gallery a', {
        captionsData: "alt",
        captionDelay: 250,
    });
}







// Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
// Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
// Notiflix.Notify.warning('Попередження');
// Notiflix.Notify.info('Інфо');


