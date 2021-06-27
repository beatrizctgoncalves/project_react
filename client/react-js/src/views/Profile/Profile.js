import React, { useState, useEffect } from 'react';
import { getUser, updateUserAvatar } from '../Services/BasicService.js';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Footer from '../Components/Footer.js';
import GoBack from '../Components/GoBack';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, CardHeader, TextField } from '@material-ui/core';


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
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#274e81e1',
    },
    div: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    }
}));

function Profile() {
    const username = window.sessionStorage.getItem("username")
    const [user, setUser] = useState({})

    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    useEffect(() => {
        getUser(username)
            .then(resp => {
                setUser(resp.message)
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])

    const classes = useStyles();

    const [newAvatar, setNewAvatar] = useState("")
    const [toUpdateAvatar, setUpdatedAvatar] = useState(false)

    function handleToEditAvatarChange() {
        if (toUpdateAvatar) {
            setUpdatedAvatar(false)
        } else {
            setUpdatedAvatar(true)
        }
    }

    function handleUpateAvatar() {
        updateUserAvatar(username, newAvatar)
            .then(resp => {
                user.avatar = newAvatar;
                setNewAvatar(user.avatar)
                setUpdatedAvatar(false)
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }

    const handleURL = event => {
        setNewAvatar(event.target.value)
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">Your Profile</h2>
                    <hr className="divider" />
                </div>
                <br />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card align="center">
                            <CardHeader
                                title={
                                    <>
                                        {toUpdateAvatar ?
                                            <Box mt={5}>
                                                <h3 className="h4 mb-2">Insert New Avatar</h3>
                                                <br />
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="username"
                                                    label="Username"
                                                    name="username"
                                                    autoComplete="username"
                                                    autoFocus
                                                    onChange={handleURL}
                                                />
                                                <br /><br />

                                                <Button
                                                    type="button"
                                                    className="button1"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleUpateAvatar}
                                                >
                                                    Save
                                                </Button>
                                                <br /><br />
                                            </Box> : ""}
                                        <Box>
                                            <Button onClick={handleToEditAvatarChange}>
                                                <img src={`${user.avatar}`}
                                                    width="auto" height="150" className={classes.avatar}></img>
                                            </Button>
                                        </Box>
                                    </>
                                }
                                subheader={user.username}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                            />
                            <CardContent>
                                <Typography component="h2" variant="h5" color="textPrimary">
                                    {user.name} {user.surname}
                                </Typography>
                                <br />

                                <Typography variant="h6" color="textSecondary">
                                    Additional Information
                                </Typography>
                                {user.info ? user.info.map((info) => (
                                    <Typography component="p" variant="subtitle1" align="center" key={info}>
                                        {info.type}
                                    </Typography>
                                )) : ""}
                            </CardContent>

                            <CardContent>
                                <Box mt={4}>
                                    <Button variant="contained" color="primary" className={classes.margin} href={'/profile/edit'}>
                                        <i className="bi bi-pencil-fill" />
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box mt={5}>
                    <GoBack />
                </Box>

                <Box mt={5}>
                    <br /><br />
                    <Footer />
                    <br />
                </Box>
            </div>
        </Container >
    )
}


export default Profile