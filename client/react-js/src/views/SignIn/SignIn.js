import React from 'react';
import LockOpen from '@material-ui/icons/LockOpen';
import { Container, Typography, Box, CssBaseline, Avatar, Grid, Paper, Button } from '@material-ui/core';
import Footer from '../Components/Footer';
import Form from '../Components/SignIn/FormSignIn';
import { useStyles } from '../Components/Styles/Style';
import Navbar from '../Components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import GoogleIcon from '../Google/GoogleIcon';
import { loginGoogle } from "../Services/AuthenticationService";


export default function SignIn() {
  const classes = useStyles();

  function handleSubmitGoogle() {
    loginGoogle()
      .then(resp => window.location.assign(resp.url))
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

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />

      <ToastContainer />

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="sm" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} align='center'>
              <Paper className={classes.paper}>
                <Box align='center'>
                  <Avatar className={classes.avatar}>
                    <LockOpen />
                  </Avatar>
                </Box>
                <Typography component="h1" variant="h5">
                  Sign In
                </Typography>
                <br /><br />

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Button color='secondary' startIcon={<GoogleIcon />} onClick={handleSubmitGoogle} size="large" variant="outlined">
                      Login with Google
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="textSecondary" variant="body2">
                      or login with your username
                    </Typography>
                  </Grid>
                </Grid>
                <br />

                <Form />
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Box mt={2}>
          <Footer />
        </Box>
      </main>
    </div>
  );
}