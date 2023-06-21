import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"
import { fetchGetImage } from './pic-api';

const searchForm = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');

loadBtn.style.display = 'none';

fetchGetImage('blue flowers').then(resp => console.log(resp))
fetchGetImage('sky').then(({ hits, totalHits }) => {
    console.log({ hits, totalHits });
    // console.log(totalHits);
}).catch((error) => console.log(error))



searchForm.addEventListener("submit", getWordFromForm);
loadBtn.addEventListener("click", onClickLoadMore);


let lightbox = new SimpleLightbox('.gallery a', {

    captionDelay: 250,
});




function getWordFromForm(event) {
    gallery.innerHTML = "";
    event.preventDefault();
    const { elements: { searchQuery } } = event.currentTarget;
    let searchWord = searchQuery.value.trim();

    if (!searchWord) {
        Notiflix.Notify.warning('Input is empty! Write a search word please!');
        return;
    }

    getImages(searchWord);

    loadBtn.style.display = 'block';

    event.currentTarget.reset();
}


function onClickLoadMore(searchWord) {
    getImages(searchWord);
    page += 1;
}



function getImages(searchWord) {
    fetchGetImage(searchWord).then(({ hits, totalHits }) => {
        renderImages(hits);
        lightbox.refresh();
        if (totalHits > 0) {
            Notiflix.Notify.success(`✅Hooray! We found ${totalHits} images.`);
        } if (totalHits === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        } if (totalHits > 500) {
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }

    }).catch((error) => console.log(error));
}



function renderImages(hits) {

    const markup = hits.map(img =>
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
    </a>`).join("");
    gallery.insertAdjacentHTML('beforeend', markup);
}







// Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
// Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
// Notiflix.Notify.warning('Попередження');
// Notiflix.Notify.info('Інфо');


