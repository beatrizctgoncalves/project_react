import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Box, Typography, CssBaseline, Avatar, Container } from '@material-ui/core';
import Footer from '../Components/Footer';
import Form from './FormSignIn';
import { useStyles } from '../Components/Style';


export default function SignIn() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <br /><br />
        <Avatar className={classes.avatarSign}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <br /><br />

        <Form />
      </div>

      <Box mt={8}>
        <br /><br />
        <Footer />
      </Box>
    </Container>
  );
}