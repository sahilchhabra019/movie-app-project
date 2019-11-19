import {
    LoadData
} from './load-data/load-api-data.js';
import {
    ratingStar,
    findGetParameter,
    image_base_url,
    getDirector
} from './app-common-functions/utilities.js';
import {
    populateRelatedMovies
} from './app-common-functions/related-movies.js'
import {
    header
} from './app-common-functions/header.js'

// single movie details function
async function singleMovieDetails() {
    const id = findGetParameter('id');
    var movieData = new LoadData();

    if (id) {
        const movieDetails = await movieData.loadMovieDetails(id);

        // get template tag content and import it
        const detailsMovieCard = document.querySelector("#movieDetails").import;
        const template = detailsMovieCard.getElementById("details");
        const details = template.content.querySelector("div");
        const node = document.importNode(details, true);

        // find description of movie and append api overview into html
        const description = node.querySelector('.para-text');
        description.append(document.createTextNode(movieDetails.overview))

        // find title of movie and append api title into html
        const movieTitle = node.querySelector('.primary-text')
        movieTitle.append(document.createTextNode(movieDetails.original_title))

        // find image of movie and append api image,img title,img alt into html
        const moviePoster = node.querySelector('.full__banner figure img');
        moviePoster.setAttribute("src", image_base_url + movieDetails.poster_path);
        moviePoster.setAttribute("alt", movieDetails.original_title);
        moviePoster.setAttribute("title", movieDetails.original_title);

        // find generes of movie and append api generes into html
        let genre = '';
        movieDetails.genres.map(genreItem => genre += genreItem.name + ', ');
        const genredata = node.querySelector('.genre__data td');
        genredata.append(document.createTextNode(genre));

        // find cast of movie and append api cast names into html
        const castData = node.querySelector('.cast__data td');
        movieDetails.credits.cast.slice(0, 7).map(item => {

            var aTag = document.createElement('a');
            aTag.setAttribute('href', "actor-details.html?id=" + item.id);
            aTag.innerText =   `${item.name}, `;
            castData.appendChild(aTag);
        });

        //for movie rating
        let ratingMovies = Math.round((movieDetails.vote_average / 2));
        const rating = node.querySelector('.movie__ratingStars span')
        rating.innerHTML = ratingStar(ratingMovies);

        // for director
        const directorMovie = node.querySelector('.dir__data td');
        console.log(directorMovie);
        directorMovie.appendChild(document.createTextNode(getDirector(movieDetails)));

        document.getElementById('main-details').append(node);
    }
}
header();
singleMovieDetails();
populateRelatedMovies();