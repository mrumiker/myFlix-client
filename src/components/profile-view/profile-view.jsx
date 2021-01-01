import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Config from '../../config';

import './profile-view.scss';

import { MovieCard } from '../movie-card/movie-card';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';

export function ProfileView(props) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  let favorites = props.favorites;

  let user = localStorage.getItem('user');
  let token = localStorage.getItem('token');

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`${Config.API_URL}/users/${user}`,
      {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        localStorage.setItem('user', response.data.Username);
      })
      .catch(err => console.log(err));
  };

  const handleRemoveFavorite = (e, movie) => {
    e.preventDefault();
    axios.delete(`${Config.API_URL}/users/${user}/remove/${movie._id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => props.getUserInfo(user, token))
      .catch(err => console.log(err));
  }

  const handleDeregister = (e) => {
    e.preventDefault();
    axios.delete(`${Config.API_URL}/users/delete/${user}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => props.onLoggedOut())
      .catch(err => console.log(err));
  }

  return (

    <React.Fragment>

      <Container className="favorite-movies" fluid>
        <h2>Favorite Movies</h2>
        <Row>
          {favorites.map(m => (
            <Col className="movie-column" key={m._id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard key={m._id} movie={m} />
              <br />
              <Button style={{ width: '16rem' }} className="delete-favorite-button" onClick={(e) => handleRemoveFavorite(e, m)} variant="outline-danger">Delete from Favorites</Button>

            </Col>))}
        </Row>
      </Container>
      <br />
      <Form className="update-form">
        <h2>Update User Information</h2>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control type="text" placeholder="Enter New Username" value={username} onChange={e => setUsername(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter New Password" value={password} onChange={e => setPassword(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Enter New Email" value={email} onChange={e => setEmail(e.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formBasicBirthday">
          <Form.Label>Birthday</Form.Label>
          <Form.Control type="date" placeholder="Enter New Birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
        </Form.Group>

        <ButtonGroup className="update-button">
          <Button variant="secondary" onClick={handleUpdate}>Update</Button>
        </ButtonGroup>

      </Form>
      <br />

      <ButtonGroup className="delete-account-button">
        <Button variant="danger" onClick={handleDeregister}>Delete Account</Button>
      </ButtonGroup>

    </React.Fragment>

  )
}

ProfileView.proptypes = {
  favorites: PropTypes.array.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired
}


