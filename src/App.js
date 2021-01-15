import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList/MovieList';
import MovieListHeading from './components/MovieListHeading/MovieListHeading';
import SearchBox from './components/SearchBox/SearchBox';
import AddFavorite from './components/AddFavorite/AddFavorite';
import RemoveFavorite from "./components/RemoveFavorite/RemoveFavorite";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
    
    const response = await fetch(url);
    const responseJson = await response.json();
    
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };
  
  useEffect( () => {
    getMovieRequest(searchValue);
  }, [searchValue]);  

  useEffect( () => {
    const movieFavorites = JSON.parse(
      localStorage.getItem('react-movie-app-favorites')
    );  

    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);  

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
  };  
  
  const AddFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };
  
  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );

    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };


  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Mii Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList 
          movies={movies} 
          handleFavoritesClick={AddFavoriteMovie} 
          favoriteComponent={AddFavorite}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Mii Favorites' />
      </div>
      <div className='row'> 
        <MovieList 
          movies={favorites} 
          handleFavoritesClick={removeFavoriteMovie} 
          favoriteComponent={RemoveFavorite}
        />
      </div>
    </div>
  );
};

export default App;
