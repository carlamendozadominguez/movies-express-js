import { Movie } from '../../models/model';
import { bodyIsEmpty } from '../../utils/utils';

const express = require('express');
const router = express.Router();
const controller = require('./controllers');

router.get('/', (req, res) => {
	let movies = controller.getMovies();
	res.json(movies);
});

router.get('/likes', (req, res) => {
	let likedMovies: Movie[] = controller.getLikes();

	if (likedMovies.length > 0) {
		res.json(likedMovies);
	} else {
		res.status(200).send({
			message: 'Nobody has liked any movie yet. Try again in the future.'
		});
	}
});

router.get('/:id', (req, res) => {
	let movieById: Movie = controller.findMovieById(req.params.id);

	if (movieById !== undefined) {
		res.json(movieById);
	} else {
		res.status(400).send({
			message: `Sorry, there is no movie assigned to this id (${
				req.params.id
			}). Try another one.`
		});
	}
});

router.post('/', (req, res) => {
  if (!bodyIsEmpty(req.body)){
    const movieToAdd: Movie = controller.bodyToMovie(req.body);
    if (!movieToAdd) {
      res.send({ message: 'Oops, an error has ocurred while adding new movie.', }, 400);
      return true ;
    }
    controller.addMovie(movieToAdd);
    res.json({ message: 'New Movie added!', movieToAdd });
  }
  res.json({ message: 'Body is empty'})
});

router.put('/:id', (req, res) => {
	let movieToUpdate: Movie = controller.updateMovie(req.params.id, req.body);

	if (!movieToUpdate) {
		res.status(400).send({
			message: 'Oops, an error has ocurred while updating movie.'
		});
		return;
	}
	res.json({
		message: `Movie ${req.params.id} has been updated!`,
		movieToUpdate
	});
});

router.delete('/likes/:id', (req, res) => {
  controller.deleteLike(req.params.id);

  res.status(200).send({
    message: `Movie (id: ${req.params.id}) disliked!`,
  });
});

router.delete('/:id', (req, res) => {
  controller.deleteMovie(req.params.id);
  res.status(200).send({
    message: `Movie (id: ${req.params.id}) has been deleted!`,
  });
});



router.put('/likes/:id', (req, res) => {
	let result = controller.likeMovie(req.params.id);

	if (result === false) {
		res.status(400).send({
			message: 'Sorry, you cannot like a movie that does not exist.'
		});
	} else {
		res.status(200).send({
			message: `Congrats!, you have liked movie ${req.params.id}).`
		});
	}
});

router.delete('/likes/:id', (req, res) => {
	let result = controller.dislikeMovie(req.params.id);

	if (result === false) {
		res.status(400).send({
			message: 'Sorry, you cannot dislike a movie that does not exist.'
		});
	} else {
		res.status(200).send({
			message: `You have disliked movie ${req.params.id}).`
		});
	}
});

module.exports = router;
