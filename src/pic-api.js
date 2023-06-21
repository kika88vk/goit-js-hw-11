// import axios from 'axios';
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.6.min.css";

const axios = require('axios').default;

export async function fetchGetImage(searchWord) {
    const apiKey = "37262675-c60479e6538b2ce74a07e98ab";
    try {
        const response = await axios.get('https://pixabay.com/api/', {
            params: {
                key: apiKey,
                q: searchWord,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: 'true',
                per_page: 40,
            },

        });
        if (response.data.total === 0) {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
        return response;

    } catch (error) {
        console.log(error);
    }
}










