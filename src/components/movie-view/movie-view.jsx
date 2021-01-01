import React from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
import Config from '../../config';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }



  render() {
    const { movie, favorites, getUserInfo } = this.props;

    if (!movie) return null;

    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const handleAddFavorite = (e, movie) => {
      e.preventDefault();

      axios.post(`${Config.API_URL}/users/${user}/add/${movie._id}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => getUserInfo(user, token))
        .catch(err => console.log(err));
    }

    const handleRemoveFavorite = (e, movie) => {
      e.preventDefault();

      axios.delete(`${Config.API_URL}/users/${user}/remove/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(() => getUserInfo(user, token))
        .catch(err => console.log(err));
    }

    const addDeleteButton = favorites.includes(movie._id) ? <Button style={{ width: '18rem' }} className="delete-favorite-button" onClick={(e) => handleRemoveFavorite(e, movie)} variant="outline-danger">Delete from Favorites</Button> :
      <Button style={{ width: '18rem' }} className="add-favorite-button" onClick={(e) => handleAddFavorite(e, movie)} variant="danger">Add to Favorites</Button>



    return (
      <Card border="info" style={{ width: '22rem' }} className="movie-view">
        <Link to="/">
          <Button className="back-button" variant="link">⬅️</Button>
        </Link>
        <Card.Img className="movie-poster" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="movie-title">{movie.Title}</Card.Title>

          <Card.Text className="movie-info">
            {movie.Description}
          </Card.Text>
          <Card.Text className="movie-info">
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">{`Genre: ${movie.Genre.Name}`}</Button>
            </Link>
          </Card.Text>
          <Card.Text className="movie-info">
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">{`Director: ${movie.Director.Name}`}</Button>
            </Link>
          </Card.Text>
          <Card.Text className="button-container">
            {addDeleteButton}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.proptypes = {

  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string,
      Birth: PropTypes.string,
      Death: PropTypes.string
    }).isRequired,
    ImagePath: PropTypes.string.isRequired,
    Featured: PropTypes.bool
  }).isRequired,
  favorites: PropTypes.array.isRequired,
  getUserInfo: PropTypes.func.isRequired
}