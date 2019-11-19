/* this file contain all js code for home page in movie app */

import {
  LoadData
} from './load-data/load-api-data.js';
import {
  createCard
} from './app-common-functions/movie-card.js'
import {
  loadMovieGenresData
} from './app-common-functions/utilities.js';
import {
  addListeners
} from './app-common-functions/card-popup.js';
import {
  header
} from './app-common-functions/header.js';

var movieDetails = new LoadData();
async function populateLatestData() {
  await loadMovieGenresData();
  const movieData = await movieDetails.loadLatestMovieDetails();
  localStorage.setItem('latestDatalocal', JSON.stringify(movieData));
  const movielatestList = document.getElementById('latest__listing');
  createCard(movieData.results.slice(0, 4), movielatestList);
  addListeners(movieData, movielatestList);
}

// for trending movies section
async function populateTrendingData() {
  const movieDataTrending = await movieDetails.loadTrendingMovieDetails();
  localStorage.setItem('trendingDatalocal', JSON.stringify(movieDataTrending));
  const movieTrendingList = document.getElementById('trending_listing');
  createCard(movieDataTrending.results.slice(0, 4), movieTrendingList);
  addListeners(movieDataTrending, movieTrendingList);
}

// for most viewed movie section
async function populateMostWachedData() {
  const moviePopularData = await movieDetails.loadMostWatchedMovieDetails();
  localStorage.setItem('popularDatalocal', JSON.stringify(moviePopularData));
  const moviepopularList = document.getElementById('mostwatched__listing');
  createCard(moviePopularData.results.slice(0, 4), moviepopularList);
  addListeners(moviePopularData, moviepopularList);
}

// function calling
header();
populateTrendingData();
populateLatestData();
populateMostWachedData();