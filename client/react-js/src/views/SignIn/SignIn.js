import React from 'react';
import LockOpen from '@material-ui/icons/LockOpen';
import { Container, Typography, Box, CssBaseline, Avatar, Grid, Paper } from '@material-ui/core';
import Footer from '../Components/Footer';
import Form from '../Components/SignIn/FormSignIn';
import { useStyles } from '../Components/Styles/Style';
import Navbar from '../Components/Navbar';
import { ToastContainer } from 'react-toastify';


export default function SignIn() {
  const classes = useStyles();

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

                <Form />
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Box mt={0}>
          <br /><br />
          <Footer />
        </Box>
      </main>
    </div>
  );
}