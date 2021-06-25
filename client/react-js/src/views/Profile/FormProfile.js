import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import React, { useState } from 'react';


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

function FormProfile() {
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
                <Typography variant="h6" gutterBottom>
                    Addicional Information:
                </Typography>

                {gitlab ?
                    <>
                        <Grid item xs={12}>
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
                    </>
                    : ""}
                <button className="btn btn-groups btn-xl" type="button" onClick={handleGitlab}>
                    <i className="bi bi-patch-plus-fill">    </i>
                    {gitlab ? "" : "Project Gitlab"}
                </button>

                {jira ?
                    <>
                        <Grid item xs={12}>
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
                    </>
                    : ""}
                <button className="btn btn-groups btn-xl" type="button" onClick={handleJira}>
                    <i className="bi bi-patch-plus-fill">    </i>
                    {jira ? "" : "Project Jira"}
                </button>
            </Grid>
        </React.Fragment>
    )
}

export default FormProfile;