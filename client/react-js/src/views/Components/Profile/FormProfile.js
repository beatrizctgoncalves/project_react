import { Button, TextField, Grid, CardContent } from '@material-ui/core';
import React, { useState } from 'react';
import { updateUser } from '../../Services/BasicService';
import { toast } from 'react-toastify';


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

    const handleEmail = (event) => {
        setUpdatedUser({ ...updatedUser, email: event.target.value })
    }

    const handleName = (event) => {
        setUpdatedUser({ ...updatedUser, name: event.target.value })
    }

    const handleSurname = (event) => {
        setUpdatedUser({ ...updatedUser, surname: event.target.value })
    }

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
                            onChange={handleEmail}
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
        </React.Fragment >
    )
}

export default FormProfile;