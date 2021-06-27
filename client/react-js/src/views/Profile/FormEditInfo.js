import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, TextField, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { updateUser } from '../Services/BasicService.js';
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

    //Gitlab
    const username = window.sessionStorage.getItem("username")
    const [updatedUserGitlab, setUpdatedUserGitlab] = useState({})
    function handleEditGitlab() {
        updateUser(username, updatedUserGitlab)
            .then(resp => {
                window.location.assign(`/profile`)
            })
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
                toast.error(err.body)
            })
    }
    const handleUsername = (event) => {
        setUpdatedUserGitlab({ ...updatedUserGitlab, accountId: event.target.value, type: 'Gitlab' })
    }
    const handleAToken = event => {
        setUpdatedUserGitlab({ ...updatedUserGitlab, AToken: event.target.value })
    }
    const [gitlab, setGitlab] = useState(false)
    function handleGitlab() {
        if (gitlab) {
            setGitlab(false)
        }
        else {
            setGitlab(true)
        }
    }

    //Jira
    const [updatedUserJira, setUpdatedUserJira] = useState({})
    function handleEditJira() {
        updateUser(username, updatedUserJira)
            .then(resp => {
                window.location.assign(`/profile`)
            })
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
                toast.error(err.body)
            })
    }
    const handleAccountId = event => {
        setUpdatedUserJira({ ...updatedUserJira, accountId: event.target.value })
    }
    const handleAT = event => {
        setUpdatedUserJira({ ...updatedUserJira, AToken: event.target.value, type: 'Jira' })
    }
    const [jira, setJira] = useState(false)
    function handleJira() {
        if (jira) {
            setJira(false)
        }
        else {
            setJira(true)
        }
    }


    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} align='center'>
                    <Box mt={4}>
                        {gitlab ?
                            <>
                                <Grid item xs={12}>
                                    <h3 className="h4 mb-2">About Gitlab</h3>
                                    <TextField
                                        required
                                        id="username"
                                        name="username"
                                        label="Username"
                                        fullWidth
                                        onChange={handleUsername}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="atoken"
                                        name="atoken"
                                        label="AToken"
                                        fullWidth
                                        onChange={handleAToken}
                                    />
                                </Grid>
                                <br /><br />
                                <Grid item xs={12}>
                                    <Button
                                        type="button"
                                        className="button1"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleEditGitlab}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                                <br /><br />
                            </>
                            : ""}
                        <Button variant="contained" color="primary" className={classes.margin} onClick={handleGitlab}>
                            <i class="bi bi-plus-lg">&nbsp;&nbsp;</i>
                            {gitlab ? "" : "About Gitlab"}
                        </Button>

                        {jira ?
                            <Box mt={5}>
                                <Grid item xs={12}>
                                    <h3 className="h4 mb-2">About Jira</h3>
                                    <TextField
                                        required
                                        id="accountId"
                                        name="accountId"
                                        label="Account Identifier"
                                        fullWidth
                                        onChange={handleAccountId}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="atoken"
                                        name="atoken"
                                        label="AToken"
                                        fullWidth
                                        onChange={handleAT}
                                    />
                                </Grid>
                                <br /><br />
                                <Grid item xs={12}>
                                    <Button
                                        type="button"
                                        className="button1"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={handleEditJira}
                                    >
                                        Save
                                    </Button>
                                </Grid>
                                <br /><br />
                            </Box>
                            : ""}
                        <Button variant="contained" color="primary" className={classes.margin} onClick={handleJira}>
                            <i class="bi bi-plus-lg">&nbsp;&nbsp;</i>
                            {jira ? "" : "About Jira"}
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment >
    )
}

export default FormProfile;