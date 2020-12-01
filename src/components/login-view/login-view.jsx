import React, { useState } from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a req to the server for authentication
    props.onLoggedIn(username);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    props.toggleRegistered(false);
  };

  return (
    <form>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
      </div>
      <div>
        <button type="button" onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <button type="button" onClick={handleRegister}>Register</button>
      </div>


    </form>
  );
}
