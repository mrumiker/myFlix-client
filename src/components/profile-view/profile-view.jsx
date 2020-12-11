import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

export function ProfileView(props) {
  const [username, setUsername] = useState(localStorage.getItem('user'));
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favorites, setFavorites] = useState([]);

  let token = localStorage.getItem('token');

  {/* Maybe set this in Main View as an onClick on the Profile Button, and pass these as props
  The purpose of this is to set the States to the existing data so that they will stay the same if the user leaves that field blank
  Also, to get the favorite movies to display*/ }
  axios.get(`https://cbu-pix-flix.herokuapp.com/users/${username}`,
    {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(response => {
      setPassword(response.data.Password);
      setEmail(response.data.Email);
      setBirthday(response.data.Birthday);
      setFavorites(response.data.Favorites);
    })
    .catch(err => {
      console.log(err);
    });

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`https://cbu-pix-flix.herokuapp.com/users/${username}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        localStorage.setItem('user', data.Username);
      })
      .catch(err => {
        console.log(err);
      });
  };

  {/* this function will be added to an "Onclick" on the Remove Button next to each favorite movie */ }
  const removeFavorite = (e, movie) => {
    e.preventDefault();
    axios.delete(`https://cbu-pix-flix.herokuapp.com/users/${username}/remove/${movie._id}`,
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
    axios.delete(`https://cbu-pix-flix.herokuapp.com/users/delete/${username}`,
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
  {/* return the Profile View */ }
}
