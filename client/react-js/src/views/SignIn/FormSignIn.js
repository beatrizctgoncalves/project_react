import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { loginFetch } from '../../components/Services/authenticationService';
import  { ChangeEvent, useEffect, useState } from 'react'


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: '#274e81e1',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    }
}));



function FormSignIn() {
  const [userToLogin, setUserToLogin] = useState({ username: undefined, password: undefined })
  const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })



  

      function handlingSubmit(){
        console.log("login SUBMIT")
        const login=loginFetch(userToLogin.username,userToLogin.username)
        console.log(login)

      }

      const handlePassword = event => {
        console.log(event.target.value)
        setUserToLogin({ ...userToLogin, password: event.target.value })
    }

    const handleUsername = event => {
      console.log(event.target.value)
        setUserToLogin({ ...userToLogin, username: event.target.value })
    }

       


    const classes = useStyles();

    return (
        <form >
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
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick = {handlingSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
    );
}


export default FormSignIn;