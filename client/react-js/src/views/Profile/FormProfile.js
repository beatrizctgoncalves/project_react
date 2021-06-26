import { makeStyles, withStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import { Typography, Box, Button, TextField, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { deleteUser, getUser } from '../Services/BasicService.js';


const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: green[500],
        fontFamily: [
            "Merriweather Sans",
            '-apple-system',
            'BlinkMacSystemFont',
            "Segoe UI",
            'Roboto',
            "Helvetica Neue",
            'Arial',
            "Noto Sans",
            'sans-serif',
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
        ].join(','),
        '&:hover': {
            backgroundColor: green[700],
        },
        margin: '4px'
    },
}))(Button);

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

    const [gitlab, setGitlab] = useState(false)
    function handleGitlab() {
        if (gitlab) {
            setGitlab(false)
        }
        else {
            setGitlab(true)
        }
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

    const [profile, setProfile] = useState([])
    const [edit, setEdit] = useState(false)
    const username = window.sessionStorage.getItem("username")
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
    }

    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="firstName"
                        name="firstName"
                        label="First name"
                        fullWidth
                        autoComplete="given-name"
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="lastName"
                        name="lastName"
                        label="Last name"
                        fullWidth
                        autoComplete="family-name"
                    />
                </Grid>

                <br /><br /><br /><br /><br />
                <Grid item xs={12} align='center'>
                    <Typography variant="h6" color="textSecondary">
                        Additional Information
                    </Typography>
                    <hr className="divider" />

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
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="atoken"
                                        name="atoken"
                                        label="AToken"
                                        fullWidth
                                    />
                                </Grid>
                                <br /><br />
                            </>
                            : ""}
                        <Button variant="contained" color="primary" className={classes.margin} onClick={handleGitlab}>
                            <i className="bi bi-patch-plus-fill">&nbsp;&nbsp;</i>
                            {gitlab ? "" : "About Gitlab"}
                        </Button>

                        {jira ?
                            <Box mt={5}>
                                <Grid item xs={12}>
                                    <h3 className="h4 mb-2">About Jira</h3>
                                    <TextField
                                        required
                                        id="email"
                                        name="email"
                                        label="Email"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="atoken"
                                        name="atoken"
                                        label="AToken"
                                        fullWidth
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        id="url"
                                        name="url"
                                        label="URL"
                                        fullWidth
                                    />
                                </Grid>
                                <br /><br />
                            </Box>
                            : ""}
                        <Button variant="contained" color="primary" className={classes.margin} onClick={handleJira}>
                            <i className="bi bi-patch-plus-fill">&nbsp;&nbsp;</i>
                            {jira ? "" : "About Jira"}
                        </Button>
                    </Box>

                    <Box mt={9}>
                        <ColorButton variant="contained" color="primary" className={classes.margin} onClick={handleDelete}>
                            <i className="bi bi-trash-fill">&nbsp;&nbsp;</i>
                            Delete Profile Definitively
                        </ColorButton>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment >
    )
}

export default FormProfile;