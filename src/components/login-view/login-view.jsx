import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Config from '../../config';

import './login-view.scss'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${Config.API_URL}/login`, {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data); //look at serialization on the back end
      })
      .catch(e => console.log('No such user'));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    window.open('/register', '_self');
  };

  return (

    <Form className="login-form">

      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formBasicLoginButton">
        <Button onClick={handleSubmit}>Login</Button>
      </Form.Group>
      <Form.Group controlId="formBasicRegButton">
        <Button variant="secondary" onClick={handleRegister}>Register</Button>
      </Form.Group>

    </Form>

  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
