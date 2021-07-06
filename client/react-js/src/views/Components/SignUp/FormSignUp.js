import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { loginFetch, signUpFetch } from '../../Services/AuthenticationService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react'


function FormSignUp() {
    const [userToCreate, setUserToCreate] = useState({})

    const handleChange = (event) => {
        const { name, value } = event.target
        setUserToCreate({ ...userToCreate, [name]: value })
    }

    function handleSignUpClick() {
        signUpFetch(userToCreate)
            .then(resp => {
                window.location.assign('/sign-in')
            })
            .catch(err => {
                toast.error(err.body, {
                    position: "top-left",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            })
    }

    return (
        <div>
            <ToastContainer />
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
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="email"
                        label="Email"
                        type="email"
                        id="email"
                        autoComplete="email"
                        onChange={handleChange}
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
                        onChange={handleChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I accept the terms and conditions."
                        required
                    />
                </Grid>
            </Grid>
            <br />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSignUpClick}
            >
                Sign Up
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                    <br />
                    <Link href="/sign-in" variant="body2">
                        Already have an account? Sign in
                    </Link>
                </Grid>
            </Grid>
        </div>
    )
}

export default FormSignUp;