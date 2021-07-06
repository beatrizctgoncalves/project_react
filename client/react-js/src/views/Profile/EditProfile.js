import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid, Container, Box, Paper, Typography, Divider } from '@material-ui/core';
import Footer from '../Components/Footer';
import Form from '../Components/Profile/FormProfile';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Styles/Style';
import Navbar from '../Components/Navbar.js';
import { ToastContainer, toast } from 'react-toastify';
import Title from '../Components/Styles/Title.js';
import clsx from 'clsx';
import { getUser } from '../Services/BasicService';


function EditProfile() {
    const username = window.sessionStorage.getItem("username")
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
    }, [username])

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, 400);

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
                                <Box>
                                    <img src={`${user.avatar}`} alt="profile"
                                        width="auto" height="192"></img>
                                </Box>
                                <Box>
                                    <Typography color="textPrimary" gutterBottom variant="h5">
                                        {user.name} {user.surname}
                                    </Typography>
                                    <Typography color="textSecondary" variant="body1">
                                        {`${user.email}`}
                                    </Typography>
                                    <br />
                                </Box>
                            </Paper>
                        </Grid>

                        {/*Profile information*/}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <Title>Editing profile of user {user.username}...</Title>
                                <Divider />
                                <Form />
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


export default EditProfile