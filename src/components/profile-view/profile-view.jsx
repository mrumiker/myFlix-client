import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

import axios from 'axios';

export function ProfileView(props) {
  console.log(props);
  const { Username, Email, Birthday, Favorites } = props;

  //const [username, setUsername] = useState(localStorage.getItem('user'));
  //const [password, setPassword] = useState('');
  //const [email, setEmail] = useState('');
  //const [birthday, setBirthday] = useState('');
  //const [favorites, setFavorites] = useState([]);

  let token = localStorage.getItem('token');

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://cbu-pix-flix.herokuapp.com/users/${Username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        Username,
        Password,
        Email,
        Birthday
      })
      .then(response => {
        const data = response.data;
        localStorage.setItem('user', data.Username);
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
    axios.delete(`https://cbu-pix-flix.herokuapp.com/users/delete/${localStorage.getItem('user')}`,
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

    <Button variant="danger" onClick={handleDeregister}>Delete Account</Button>

  );
}
