import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"


const searchForm = document.querySelector('#search-form');
const galleryEl = document.querySelector('.gallery');

const axios = require('axios');


async function fetchGetImage() {
    const apiKey = "37262675-c60479e6538b2ce74a07e98ab";
    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                apiKey
                // ID: 12345

            }
        });
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}







// Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
// Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
// Notiflix.Notify.warning('Попередження');
// Notiflix.Notify.info('Інфо');


