import React, { useState, useEffect } from 'react';
import { getUser, updateUser } from '../Services/BasicService.js';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Footer from '../Components/Footer.js';
import GoBack from '../Components/GoBack';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, CardHeader, TextField } from '@material-ui/core';
import { green, purple } from '@material-ui/core/colors';


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
            .then(resp => setUser(resp.message))
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
        updateUser(username, { avatar: newAvatar })
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


    function handleAdditionalInfo() {
        window.location.assign(`/profile/edit/info`)
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
                                                    id="url"
                                                    label="URL (.png)"
                                                    name="url"
                                                    autoComplete="url"
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
                                                {/*`${user.avatar}`*/}
                                                <img src={`${user.avatar}`}
                                                    width="auto" height="150" className={classes.avatar}></img>
                                            </Button>
                                        </Box>
                                    </>
                                }
                                subheader={username}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                            />
                            <CardContent>
                                <Typography component="h2" variant="h4" color="textPrimary">
                                    {user.name} {user.surname}
                                </Typography>
                                <br />

                                <Typography variant="h5" color="primary">
                                    Additional Information
                                </Typography>

                                {user.info && user.info.length != 0 ? user.info.map(info => (
                                    <Typography variant="body2" color="textSecondary" align="center" key={info}>
                                        {info}
                                    </Typography>
                                )) :
                                    <Box mt={2}>
                                        <Typography variant="body1" color="textSecondary" align="center">
                                            You do not have any additional <br /> information added yet!
                                        </Typography>
                                        <br />
                                        <ColorButton variant="contained" color="primary" className={classes.margin} onClick={handleAdditionalInfo}>
                                            <i className="bi bi-plus-lg">&nbsp;&nbsp;</i>
                                            Add Now
                                        </ColorButton>
                                    </Box>
                                }
                            </CardContent>

                            <CardContent>
                                <Box mt={0}>
                                    <Button variant="contained" color="primary" className={classes.margin} href={'/profile/edit'}>
                                        <i className="bi bi-pencil-fill"></i>
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