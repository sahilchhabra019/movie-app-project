/* all common functions which are used in movie ap project */

import {
    LoadData
} from '../load-data/load-api-data.js';
export const image_base_url = 'https://image.tmdb.org/t/p/w500/';

var movieDetails = new LoadData();

// movie generes function
export let movieGenres = [];
export async function loadMovieGenresData() {
    return new Promise(async (resolve, reject) => {
        movieGenres = await movieDetails.loadMovieGenres();
        localStorage.setItem('movieGenres', JSON.stringify(movieGenres));
        resolve(movieGenres);
    });
}

// movie rating function
export function ratingStar(rating) {
    let ratingData = ''
    for (let i = 0; i <= 4; i++) {
        ratingData = `${ratingData} <i class= "fa ${rating >= i+1 ?'fa-star' : 'fa-star-o'}"></i>`
    }
    return ratingData;
}

// get Director
export function getDirector(singleMovieData) {
    var directors = singleMovieData.credits.crew.filter(movieDirector => movieDirector.job === 'Director')[0];
    return directors.name;
}

// get parameter 
export function findGetParameter(movieURL) {
    var result = null,
        tmpMovieURL = [];
    window.location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmpMovieURL = item.split("=");
            if (tmpMovieURL[0] === movieURL) result = decodeURIComponent(tmpMovieURL[1]);
        });
    return result;
}

loadMovieGenresData();