import React from 'react';
import { Card, Button } from 'react-bootstrap';

export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { movie } = this.props;

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

          <Button className="back-button" variant="secondary" onClick={() => window.location.reload()}>Back</Button>

        </Card.Body>
      </Card>
    );
  }
}