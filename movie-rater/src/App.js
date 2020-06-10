import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {useCookies} from 'react-cookie';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, setToken, deleteToken] = useCookies(['user-token']);

  useEffect(()=>{                                               //To Fetch the data
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['user-token']}`
      }
    })
    .then( resp => resp.json())
    .then( resp => setMovies(resp))
    .catch( error => console.log(error))
  }, )

  useEffect(() => {
    console.log(token);
    if(!token['user-token']) window.location.href = '/'
}, [token])

  const loadMovie = movie =>{
    setSelectedMovie(movie);
    setEditedMovie(null);
  }
  const editClicked = movie =>{
    setEditedMovie(movie);
    setSelectedMovie(null);
  }
  const updatedMovie = movie =>{
    const newMovies = movies.map( mov => {
      if (mov.id === movie.id) {
         return movie
      }
      return mov;
    })
    setMovies(newMovies)
  }
  const newMovie = () => {
    setEditedMovie({year:'', title:'', description:''});
    setSelectedMovie(null);
  }

  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies)
  }

  const deleteClicked = movie => {
    const newMovies = movies.filter( mov => {
      if (mov.id === movie.id) {
        return false;
      }
        return true;
    })
    setMovies(newMovies)
  }

  const logoutUser = () => {
    deleteToken(['user-token']);
  } 

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>  
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/>
      </header>
      <div className="layout">
        <div>
          <MovieList 
            movies={movies} 
            movieClicked= {loadMovie} 
            editClicked={editClicked}
            deleteClicked={deleteClicked}
          />
          <button onClick={ newMovie }>New Movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
        { editedMovie ? 
        <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated}/> 
        : null}
        
      </div>
    </div>
  );
}

export default App;
