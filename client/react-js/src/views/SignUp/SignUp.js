import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../Components/Footer';
import Form from './FormSignUp';
import { signUpFetch } from '../Services/authenticationService';


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
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

export default function SignUp() {
    /*
    const handlePassword = event => {
        console.log(event.target.value)
        setUserToCreate({ ...userToCreate, password: event.target.value })
    }

    const handleUsername = event => {
      console.log(event.target.value)
        setUserToCreate({ ...userToCreate, username: event.target.value })
    }
    const handleName = event => {
        console.log(event.target.value)
          setUserToCreate({ ...userToCreate, name: event.target.value })
      }
      
    const handleSurname = event => {
        console.log(event.target.value)
          setUserToCreate({ ...userToCreate, surname: event.target.value })
    }
    */
    
    const [userToCreate, setUserToCreate] = useState({ username: undefined, password: undefined, name: undefined, surname: undefined })
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const handleChange = (event) => {
        console.log(event.target.value)
        console.log(userToCreate)
        const { name, value } = event.target
        setUserToCreate({ ...userToCreate, [name]: value })

    }

    function handleSignUpClick() {

        signUpFetch(userToCreate)
            .then(resp => {
                window.location.assign('/sign-in')
            }).catch(err => {
                setError({ errorMessage: error, shouldShow: true })

            })

    }

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