import { bodyIsEmpty } from '../../utils/utils';
import { movies } from '../../data/movies';
import { pull } from 'lodash';
import { Movie } from '../../models/model';

export function getMovies(): Movie[] {
  return movies;
}

function findMovieById(idToSearch: string) {
  return movies.find(movie => movie.id === idToSearch);
}

export function addMovie(newMovie: Movie) {
  movies.push(newMovie);
}

export function updateMovie(id: string, movieToUpdate: Movie): Movie {
  if (bodyIsNotEmpty(movieToUpdate)) {
    const moviePosition: number = movies.findIndex(movie => movie.id === id);
    if (moviePosition >= 0) {
      movies[moviePosition] = movieToUpdate;
      return movies[moviePosition];
    }
  return;
  }
}

function deleteMovie(idToRemove: string) {
  const movieToDelete: Movie = findMovieById(idToRemove);
  if (movieToDelete) {
    pull(movies, movieToDelete);
  }
}

function deleteLike(idToRemove: string) {
  const movieToChange = findMovieById(idToRemove);
  if (movieToChange.like === true) {
    movieToChange.like = false;
  }
}


function getLikes() : Movie[] {
  return movies.filter(movie => movie.like === true);
}

function likeMovie(id) {
  if (!findMovieById(id)) {
    return false;
  } else {
    const likedMovie = movies.find(movie => movie.id === id);
    likedMovie.like = true;
    return true;
  }
}

function dislikeMovie(id) {
  if (!findMovieById(id)) {
    return false;
  } else {
    const dislikedMovie = movies.find(movie => movie.id === id);
    dislikedMovie.like = false;
    return true;
  }
}

export function bodyToMovie(body): Movie {
  // TODO
  if (body.name > 10) {
    return undefined;
  } else {
  return {
    name: 'asd'
    asd
    asd
    asd
    asd
    sad
    sad
    asdas
    d
  };

}
  // if (body.year > 1000) {
  //   movie.setName();
  // }
  // return movie;
  // return null;
  // throw new Error('Tarea para casa!!');
}
