import { Box, Button, TextField, Typography } from '@material-ui/core';
import { useState } from 'react';

const LoginForm = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ username, password });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <Typography variant="h2">Log in to application</Typography>
      <form onSubmit={handleSubmit}>
        <div id="login-form">
          <Typography variant="body2">username</Typography>
          <TextField
            id="username-input"
            type="text"
            value={username}
            name="username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <Typography variant="body2">password</Typography>
          <TextField
            id="password-input"
            type="password"
            value={password}
            name="password"
            onChange={handlePasswordChange}
            autoComplete="on"
          />
        </div>
        <Box mt={2} pt={2}>
          <Button m={3} variant="contained" color="primary" type="submit">
            login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginForm;
