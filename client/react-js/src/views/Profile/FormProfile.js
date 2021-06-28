import { makeStyles } from '@material-ui/core/styles';
import { ButtonGreen } from '../Components/ColorButtons';
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
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const username = window.sessionStorage.getItem("username")
    const [updatedUser, setUpdatedUser] = useState({})
    function handleEdit() {
        updateUser(username, updatedUser)
            .then(resp => {
                window.location.assign(`/profile`)
            })
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
                toast.error(err.body)
            })
    }

    const handleName = (event) => {
        setUpdatedUser({ ...updatedUser, name: event.target.value })
    }

    const handleSurname = (event) => {
        setUpdatedUser({ ...updatedUser, surname: event.target.value })
    }


    /*
        const [profile, setProfile] = useState([])
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

    function handleAdditionalInfo() {
        window.location.assign(`/profile/edit/info`)
    }

    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                        onChange={handleName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                        onChange={handleSurname}
                    />
                </Grid>
                <br /><br /><br /><br />
                <Grid item xs={12}>
                    <Button
                        type="button"
                        className="button1"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleEdit}
                    >
                        Save
                    </Button>
                </Grid>

                <Grid item xs={12} align='center'>
                    <Box mt={6}>
                        <Button variant="contained" color="primary" className={classes.margin} onClick={handleAdditionalInfo}>
                            <i className="bi bi-patch-plus-fill">&nbsp;&nbsp;</i>
                            Additional Information
                        </Button>

                        <ButtonGreen variant="contained" color="primary" className={classes.margin} onClick={'handleDelete'}>
                            <i className="bi bi-trash-fill">&nbsp;&nbsp;</i>
                            Delete Profile Definitively
                        </ButtonGreen>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment >
    )
}

export default FormProfile;