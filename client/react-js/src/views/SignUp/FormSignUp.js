import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { loginFetch,signUpFetch } from '../../components/Services/authenticationService';
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

function FormSignUp() {
    const classes = useStyles();

    const [userToCreate, setUserToCreate] = useState({})
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })


   const handleChange = (event) =>{ 
        console.log(event.target.value)
        console.log(userToCreate)
        const {name, value} = event.target
        setUserToCreate({ ...userToCreate,  [name]: value })
    }

    function handleSignUpClick(){

        signUpFetch(userToCreate)
            .then(resp=>{
                window.location.assign('/sign-in')        
                }).catch(err => {
                    setError({errorMessage:error,shouldShow: true })
                    
                })  

    }




    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        onChange = {handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="name"
                        variant="outlined"
                        required
                        fullWidth
                        id="name"
                        label="First Name"
                        autoFocus
                        onChange = {handleChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="surname"
                        label="Last Name"
                        name="surname"
                        autoComplete="lname"
                        onChange = {handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange = {handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange = {handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick = {handleSignUpClick}
                
            >
                Sign Up
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                    <Link href="/sign-in" variant="body2">
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default FormSignUp;