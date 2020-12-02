import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie, onClick } = this.props;

    if (!movie) return null;

    return (
      <Card style={{ width: '16rem' }} className="movie-view">
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

          <Button className="back-button" variant="secondary" onClick={() => onClick(null)}>Back</Button>

        </Card.Body>
      </Card>
    );
  }
}

MovieView.proptypes = {

  movie: PropTypes.shape({
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
  onClick: PropTypes.func.isRequired

}