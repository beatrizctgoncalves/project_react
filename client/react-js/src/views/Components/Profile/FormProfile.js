import { makeStyles } from '@material-ui/core/styles';
import { ButtonRed } from '../Styles/ColorButtons';
import { Box, Button, TextField, Grid, CardContent, Divider } from '@material-ui/core';
import React, { useState } from 'react';
import { deleteUser, updateUser } from '../../Services/BasicService';
import { toast } from 'react-toastify';
import DeleteIcon from '@material-ui/icons/Delete';
import { logout } from '../../Services/AuthenticationService';


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
            .then(resp => window.location.assign(`/profile/${username}`))
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

    const handleName = (event) => {
        setUpdatedUser({ ...updatedUser, name: event.target.value })
    }

    const handleSurname = (event) => {
        setUpdatedUser({ ...updatedUser, surname: event.target.value })
    }


    function handleDelete() {
        deleteUser(username)
            .then(resp => {
                logout()
                    .then(resp => {
                        window.sessionStorage.removeItem("username");
                        window.location.replace('/');
                    })
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
                    <ButtonRed color="primary" className={classes.margin} onClick={handleDelete}>
                        <DeleteIcon />
                        Delete Profile Definitively
                    </ButtonRed>
                </Box>
            </Grid>
        </React.Fragment >
    )
}

export default FormProfile;