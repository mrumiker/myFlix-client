import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
      <Card border="info" style={{ width: '16rem' }} className="movie-view">
        <Card.Img className="movie-poster" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title className="movie-title">{movie.Title}</Card.Title>

          <Card.Text className="movie-info">
            {`Description: ${movie.Description}`}
          </Card.Text>
          <Card.Text className="movie-info">
            {`Genre: ${movie.Genre.Name}`}
          </Card.Text>
          <Card.Text className="movie-info">
            {`Director: ${movie.Director.Name}`}
          </Card.Text>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
          <Link to="#">
            <Button variant="link">Genre</Button>
          </Link>

          <Link to="/">
            <Button className="back-button" variant="secondary">Back</Button>
          </Link>

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

}