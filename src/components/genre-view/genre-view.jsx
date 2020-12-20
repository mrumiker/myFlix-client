import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export class GenreView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }



  render() {
    const { genre, films } = this.props;

    if (!genre) return null;

    return (
      <Card border="info" style={{ width: '22rem' }} className="genre-view">
        <Card.Body>
          <Card.Title className="genre-name">{genre.Name}</Card.Title>
          <Card.Text className="genre-description">{genre.Description}</Card.Text>
          <Card.Header>Films</Card.Header>
          <ListGroup variant="flush">
            {films.map(film => <ListGroup.Item key={film}>{film}</ListGroup.Item>)}
          </ListGroup>
          <Link to="/">
            <Button className="back-button" variant="secondary">Back</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }

}

GenreView.proptypes = {

  genre: PropTypes.shape({

    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  films: PropTypes.array

}