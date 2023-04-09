import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const handleInputChange = (event: { target: { name: string; value: string; }; }) => {
  const { name, value } = event.target;
  if (name === "username") {
    setUsername(value);
  } else if (name === "password") {
    setPassword(value);
  }
};

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    // handle login logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handleInputChange} />
      </label>
      <br />
      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;