import React from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {Container, Typography, Box, CssBaseline, Avatar } from '@material-ui/core';
import Footer from '../Components/Footer';
import Form from './FormSignUp';
import { useStyles } from '../Components/Style';


export default function SignUp() {    
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
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