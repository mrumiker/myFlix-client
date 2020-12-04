import React from 'react';
import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export class DirectorView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    if (director.Death) {

      return (
        <Card border="danger" style={{ width: '16rem' }} className="director-view">
          <Card.Body>
            <Card.Title className="director-name">{director.Name}</Card.Title>

            <Card.Text className="director-bio">
              {director.Bio}
            </Card.Text>
            <Card.Text className="director-birth">
              {`Born: ${director.Birth}`}
            </Card.Text>
            <Card.Text className="director-death">
              {`Died: ${director.Death}`}
            </Card.Text>


            <Link to="/">
              <Button className="back-button" variant="secondary">Back</Button>
            </Link>

          </Card.Body>
        </Card>
      );
    } else {
      return (
        <Card border="danger" style={{ width: '16rem' }} className="director-view">
          <Card.Body>
            <Card.Title className="director-name">{director.Name}</Card.Title>

            <Card.Text className="director-bio">
              {director.Bio}
            </Card.Text>
            <Card.Text className="director-birth">
              {`Born: ${director.Birth}`}
            </Card.Text>


            <Link to="/">
              <Button className="back-button" variant="secondary">Back</Button>
            </Link>

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
  }).isRequired

}