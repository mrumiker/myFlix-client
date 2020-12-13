import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import axios from 'axios';

export function ProfileView(props) {
  //console.log(props);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favorites, setFavorites] = useState([]);

  let user = localStorage.getItem('user');
  let token = localStorage.getItem('token');

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://cbu-pix-flix.herokuapp.com/users/${user}`,
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
        const data = response.data;
        localStorage.setItem('user', data.Username);
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  /* this function will be added to an "Onclick" on the Remove Button next to each favorite movie */
  const removeFavorite = (e, movie) => {
    e.preventDefault();
    axios.delete(`https://cbu-pix-flix.herokuapp.com/users/${Username}/remove/${movie._id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        setFavorites(response.data.Favorites);
      })
      .catch(err => {
        console.log(err);
      });
  }

  const handleDeregister = (e) => {
    e.preventDefault();
    axios.delete(`https://cbu-pix-flix.herokuapp.com/users/delete/${user}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(response => {
        console.log(response);
        props.onLoggedOut();
      })
      .catch(err => {
        console.log(err);
      });
  }
  return (
    <Form>
      <h1>Update User Information</h1>
      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter New Username" value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter New Password" value={password} onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Enter New Email" value={email} onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBasicBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" placeholder="Enter New Birthday" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <ButtonGroup className="update-button">
        <Button className="update-button" variant="secondary" onClick={handleUpdate}>Update</Button>
      </ButtonGroup>
      <br />
      <ButtonGroup className="delete-button">
        <Button variant="danger" onClick={handleDeregister}>Delete Account</Button>
      </ButtonGroup>
    </Form>
  )
}
