import { makeStyles } from '@material-ui/core/styles';
import { ButtonRed } from '../Components/ColorButtons';
import { Box, Button, TextField, Grid } from '@material-ui/core';
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
            <Grid container spacing={3}>
                <Grid item sm={4} align='right'>
                    <TextField
                        id="firstName"
                        name="firstName"
                        label="First name"
                        autoComplete="given-name"
                        onChange={handleName}
                    />
                </Grid>
                <Grid item sm={4} align='left'>
                    <TextField
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        autoComplete="family-name"
                        onChange={handleSurname}
                    />
                </Grid>
                <Grid item sm={4} align='left'>
                    <br />
                    <Button
                        type="button"
                        className="button1"
                        variant="contained"
                        color="primary"
                        onClick={handleEdit}
                    >
                        Save Changes
                    </Button>
                </Grid>

                <Grid item xs={12} align='center'>
                    <Box mt={2}>
                        <ButtonRed variant="contained" color="primary" className={classes.margin} onClick={'handleDelete'}>
                            <i className="bi bi-trash-fill">&nbsp;&nbsp;</i>
                            Delete Profile Definitively
                        </ButtonRed>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment >
    )
}

export default FormProfile;