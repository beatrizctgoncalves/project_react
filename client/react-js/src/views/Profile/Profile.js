import React, { useState, useEffect } from 'react';
import { getUser, updateUser } from '../Services/BasicService.js';
import Footer from '../Components/Footer.js';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Style';
import { Typography, TextField, CssBaseline, Grid, Container, Button, Box, Paper } from '@material-ui/core';
import Navbar from '../Components/Navbar.js';
import { ToastContainer, toast } from 'react-toastify';
import Title from '../Components/Title.js';
import clsx from 'clsx';


function Profile(props) {
    const { username } = props.match.params
    const owner = window.sessionStorage.getItem("username")
    const [user, setUser] = useState({})

    useEffect(() => {
        getUser(username)
            .then(resp => setUser(resp.message))
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
    }, [])

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeightProfile);
    
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

    const handleURL = event => {
        setNewAvatar(event.target.value)
    }

    function handleEdit() {
        window.location.assign(`/profile/${owner}/edit`)
    }

    
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />

            <ToastContainer />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/*Avatar*/}
                        <Grid item xs={12} md={4} lg={3} align='center'>
                            <Paper>
                                {username == owner ?
                                    <Box>
                                        <img src={`${user.avatar}`}
                                            width="auto" height="192" className={classes.avatar}></img>
                                    </Box>
                                    : ''}
                                {toUpdateAvatar ?
                                    <Grid item xs={12} align='center'>
                                        <br /><br />
                                        <h3 className="h4 mb-2">Insert New Avatar</h3>
                                        <br />
                                        <TextField
                                            variant="outlined"
                                            margin="normal"
                                            required
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
                                            variant="contained"
                                            color="primary"
                                            onClick={handleUpateAvatar}
                                        >
                                            Save
                                        </Button>
                                        <br /><br />
                                    </Grid> : ""}
                                <Box>
                                    <Button onClick={handleToEditAvatarChange}>
                                        <img src={`${user.avatar}`}
                                            width="auto" height="192" className={classes.avatar}></img>
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>

                        {/*Profile information*/}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <Title>Profile of user {user.username}</Title>
                                <Typography variant="h6">
                                    {user.name} {user.surname}
                                </Typography>
                                {username == owner ?
                                    <Box mt={4}>
                                        <Button variant="contained" color="primary" className={classes.margin} onClick={handleEdit}>
                                            <i className="bi bi-pencil-fill"></i>
                                        </Button>
                                    </Box>
                                    : ''}
                            </Paper>
                        </Grid>
                    </Grid>

                    <Box pt={8}>
                        <Container maxWidth="xs">
                            <GoBack />
                        </Container>
                    </Box>

                    <Box pt={8}>
                        <Footer />
                    </Box>
                </Container>
            </main>
        </div>
    )
}


export default Profile