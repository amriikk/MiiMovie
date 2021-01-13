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
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);

  const getMovieRequest = async () => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;
    
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const AddFavoriteMovie = (movie) => {
		const newFavoriteList = [...favorites, movie];
		setFavorites(newFavoriteList);
  };
  
  const RemoveFavoriteMovie = () => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorites.imdbID !== movie.imdbID
    );
  };

  useEffect( () => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Mii Movies' />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
          <MovieList 
            movies={movies} 
            favoriteComponent={AddFavorite}
            handleFavoritesClick={AddFavoriteMovie} 
          />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Mii Favorites' />
      </div>
      <div className='row'> 
        <MovieList 
          movies={favorites} 
          favoriteComponent={AddFavorite} 
          favoriteComponent={RemoveFavorite}
        />
      </div>
    </div>
  );
};

export default App;
