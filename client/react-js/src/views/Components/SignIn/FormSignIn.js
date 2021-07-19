import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { loginFetch } from '../../Services/AuthenticationService';
import { toast } from 'react-toastify';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Typography } from '@material-ui/core';


function FormSignIn() {
  const [userToLogin, setUserToLogin] = useState({ username: undefined, password: undefined })

  function handlingSubmit() {
    loginFetch(userToLogin.username, userToLogin.password)
      .then(resp => {
        window.sessionStorage.setItem('username', userToLogin.username);
        window.location.assign('/groups')
      })
      .catch(err => toast.error(err.body, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }))
  }

  const handlePassword = event => {
    setUserToLogin({ ...userToLogin, password: event.target.value })
  }

  const handleUsername = event => {
    setUserToLogin({ ...userToLogin, username: event.target.value })
  }

  return (
    <div>
      <Box sx={{ backgroundColor: 'background.default', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        <Container maxWidth="sm">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleUsername}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePassword}
          />

          <Box mt={3}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={handlingSubmit}
            >
              Sign In
            </Button>
          </Box>

          <br />
          <Grid container justify="flex-end">
            <Grid item>
              <Typography color="textSecondary" variant="body2">
                Don&apos;t have an account?
                {' '}
                <Link component={RouterLink} to="/sign-up" variant="body2">
                  Sign up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </div>
  );
}


export default FormSignIn;
