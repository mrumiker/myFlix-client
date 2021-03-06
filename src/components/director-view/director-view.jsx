import React from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { director, films } = this.props;

    if (!director) return null;

    if (director.Death) {

      return (
        <Card border="danger" style={{ width: '22rem' }} className="director-view">
          <Link to="/">
            <Button className="back-button" variant="link">⬅️</Button>
          </Link>

          <Card.Body>

            <Card.Title className="director-name">{director.Name}</Card.Title>

            <Card.Text className="director-bio">
              {director.Bio}
            </Card.Text>
            <Card.Header>
              Born
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>{director.Birth}</ListGroup.Item>
            </ListGroup>
            <Card.Header>
              Died
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>{director.Death}</ListGroup.Item>
            </ListGroup>
            <Card.Header>
              Films
            </Card.Header>
            <ListGroup variant="flush">
              {films.map(film => <ListGroup.Item key={film._id}><Link to={`/movies/${film._id}`}>
                <Button variant="link">{film.Title}</Button>
              </Link>
              </ListGroup.Item>)}
            </ListGroup>



          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card border="danger" style={{ width: '16rem' }} className="director-view">
          <Link to="/">
            <Button className="back-button" variant="link">⬅️</Button>
          </Link>
          <Card.Body>

            <Card.Title className="director-name">{director.Name}</Card.Title>

            <Card.Text className="director-bio">
              {director.Bio}
            </Card.Text>
            <Card.Header>
              Born
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>{director.Birth}</ListGroup.Item>
            </ListGroup>

            <Card.Header>
              Films
            </Card.Header>
            <ListGroup variant="flush">
              {films.map(film => <ListGroup.Item key={film._id}><Link to={`/movies/${film._id}`}>
                <Button variant="link">{film.Title}</Button>
              </Link>
              </ListGroup.Item>)}
            </ListGroup>



          </Card.Body>
        </Card>)
    }
  }
}

DirectorView.proptypes = {

  director: PropTypes.shape({

    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    Birth: PropTypes.string.isRequired,
    Death: PropTypes.string
  }).isRequired,
  films: PropTypes.array
}