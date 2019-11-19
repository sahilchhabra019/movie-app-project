import {
  createCard
  } from './app-common-functions/movie-card.js'
  
  import {
  header,
  } from './app-common-functions/header.js'
  
  var latestDataFrom = localStorage.getItem('latestDatalocal');
  var parsedObjectlLastest = JSON.parse(latestDataFrom);
  
  var trendingDataFrom = localStorage.getItem('trendingDatalocal');
  var parsedObjectTrending = JSON.parse(trendingDataFrom);
  
  var popularDataFrom = localStorage.getItem('popularDatalocal');
  var parsedObjectPopular = JSON.parse(popularDataFrom);
  
  var movieGenres = localStorage.getItem('movieGenres');
  movieGenres = JSON.parse(movieGenres);
  
  var allData = parsedObjectlLastest.results.concat(parsedObjectTrending.results, parsedObjectPopular.results);
  
  var uniqueData = [];
  allData.forEach(function (item) {
  var i = uniqueData.findIndex(x => x.id === item.id);
  if (i <= -1) {
  uniqueData.push(item);
  }
  });
  
  var range1 = document.getElementById('rangeslider');
  
  range1.addEventListener("change", event => {
  let searchRnage1 = event.target.value;
  let searchRnage = uniqueData.filter(item => {
  return Math.round((item.vote_average / 2)) === parseInt(searchRnage1);
  })
  createCard(searchRnage, listing);
  });
  
  //for search
  var searchInput = document.getElementById('search');
  function getMovieSearchData(searchValue = '') {
  let filteredGenres = movieGenres.genres.filter(item => item.name.toLowerCase().includes(searchValue.toLocaleLowerCase())).map(item => item.id);
  let searchResult = uniqueData.filter(item => {
  //return item.title.toLowerCase().includes(searchValue.toLowerCase());
  return item.genre_ids.filter(value => filteredGenres.includes(value)).length;
  })
  createCard(searchResult, listing);
  }
  
  searchInput.addEventListener("keyup", event => {
  let searchValue = event.target.value;
  getMovieSearchData(searchValue);
  });
  
  getMovieSearchData();
  header();