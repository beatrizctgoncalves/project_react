import React, { useState, useEffect } from 'react';
import { getUser, updateUser } from '../Services/BasicService.js';
import Footer from '../Components/Footer.js';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Style';
import { ButtonGreen } from '../Components/ColorButtons';
import { Typography, CardHeader, TextField, Card, CssBaseline, CardContent, Grid, Container, Button, Box } from '@material-ui/core';


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
                                    <Box mt={2}>
                                        <Typography variant="h6" color="textSecondary">
                                            {info.type}
                                        </Typography>
                                    </Box>
                                )) :
                                    <Box mt={2}>
                                        <Typography variant="body1" color="textSecondary" align="center">
                                            You do not have any additional <br /> information added yet!
                                        </Typography>
                                        <br />
                                        <ButtonGreen variant="contained" color="primary" className={classes.margin} onClick={handleAdditionalInfo}>
                                            <i className="bi bi-plus-lg">&nbsp;&nbsp;</i>
                                            Add Now
                                        </ButtonGreen>
                                    </Box>
                                }
                            </CardContent>

                            <CardContent>
                                <Box mt={0}>
                                    <Button variant="contained" color="primary" className={classes.margin} href={`/profile/${user.username}/edit`}>
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