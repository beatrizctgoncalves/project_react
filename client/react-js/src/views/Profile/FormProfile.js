import { makeStyles } from '@material-ui/core/styles';
import { ButtonRed } from '../Components/ColorButtons';
import { Box, Button, TextField, Grid, CardContent, Divider } from '@material-ui/core';
import React, { useState } from 'react';
import { deleteUser, getUser, updateUser } from '../Services/BasicService.js';
import { toast } from 'react-toastify';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    div: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }
}));

function FormProfile() {
    const username = window.sessionStorage.getItem("username")
    const [updatedUser, setUpdatedUser] = useState({})

    function handleEdit() {
        updateUser(username, updatedUser)
            .then(resp => {
                window.location.assign(`/profile`)
            })
            .catch(err => {
                toast.error(err.body)
            })
    }

    const handleName = (event) => {
        setUpdatedUser({ ...updatedUser, name: event.target.value })
    }

    const handleSurname = (event) => {
        setUpdatedUser({ ...updatedUser, surname: event.target.value })
    }


    /*const [profile, setProfile] = useState([])
    function handleDelete() {
        deleteUser(username)
            .then(resp => getUser(username))
            .then(resp => {
                setProfile(profile)
                setEdit(false)
            })
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
            })
    }*/

    const classes = useStyles();

    return (
        <React.Fragment>
            <CardContent>
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <TextField
                            id="firstName"
                            name="firstName"
                            label="First name"
                            fullWidth
                            autoComplete="given-name"
                            onChange={handleName}
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <TextField
                            id="lastName"
                            name="lastName"
                            fullWidth
                            label="Last name"
                            autoComplete="family-name"
                            onChange={handleSurname}
                            required
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            required
                            name="email"
                            fullWidth
                            label="Email"
                            autoComplete="email"
                            onChange={''}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Button
                            type="button"
                            className="button1"
                            variant="contained"
                            color="primary"
                            onClick={handleEdit}
                        >
                            Save details
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>

            <Grid item xs={12} align='center'>
                <Divider />
                <Box mt={2}>
                    <ButtonRed variant="contained" color="primary" className={classes.margin} onClick={'handleDelete'}>
                        <i className="bi bi-trash-fill">&nbsp;&nbsp;</i>
                        Delete Profile Definitively
                    </ButtonRed>
                </Box>
            </Grid>
        </React.Fragment >
    )
}

export default FormProfile;