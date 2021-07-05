import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { loginFetch } from '../Services/authenticationService';
import { toast } from 'react-toastify';


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
      <br />
      <br />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handlingSubmit}
      >
        Sign In
      </Button>
      <br />
      <br />
      <Grid container>
        <Grid item>
          <Link href="/sign-up" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </div >
  );
}


export default FormSignIn;
