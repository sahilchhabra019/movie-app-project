const API_KEY = '9534ef382ae85c9a187075719f8e1961';
const BASE_URL = 'https://api.themoviedb.org/3';

// latest movies data api
export class LoadData {
    loadLatestMovieDetails = async () => {
        const latest_url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
        return fetch(latest_url).then(response => response.json()).catch(error => {
            console.log(error);
        })
    }
    // most watched movies data api
    loadMostWatchedMovieDetails = async () => {
        const mostWatched_url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        return fetch(mostWatched_url).then(response => response.json()).catch(error => {
            console.log(error);
        })
    }
    // trending movies data api
    loadTrendingMovieDetails = async () => {
        const trending_url = `${BASE_URL}/trending/movie/week?api_key=${API_KEY} `;
        return fetch(trending_url).then(response => response.json()).catch(error => {
            console.log(error);
        })
    }
    // movies generes data api
    loadMovieGenres = async () => {
        const genres_url = `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`;
        return fetch(genres_url).then(response => response.json()).catch(error => {
            console.log(error);
        })
    }
    // single movie details data api
    loadMovieDetails = async (movieId) => {
        const movieDetailsUrl = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=credits`;
        return fetch(movieDetailsUrl).then(response => response.json()).catch(error => {
            console.log(error);
        })
    }
    // related movies data api
    loadRelatedMovies = async (movieId) => {
        const RelatedMovieUrl = `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`;
        return fetch(RelatedMovieUrl).then(response => response.json()).catch(error => {
            console.log(error);
        })
    }
    // actor details data api
    loadActorDetails = async function (ACTOR_ID) {
        const actorDetailsUrl = `${BASE_URL}/person/${ACTOR_ID}?api_key=${API_KEY}&language=en-US`;
        return fetch(actorDetailsUrl).then(response => response.json()).catch(error => {
            console.log(error);
        })
    }
    //actor filmography
    loadActorFilmography = async function (ACTOR_ID) {
        const actorFilmographyUrl = `${BASE_URL}/person/${ACTOR_ID}/movie_credits?api_key=${API_KEY}&language=en-US`;
        return fetch(actorFilmographyUrl).then(response => response.json()).catch(error => {
            console.log(error);
        })
    }
}