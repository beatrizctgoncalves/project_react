import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid, Container, Box, Paper } from '@material-ui/core';
import Footer from '../Components/Footer';
import Form from './FormProfile';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Style';
import Navbar from '../Components/Navbar.js';
import { ToastContainer, toast } from 'react-toastify';
import Title from '../Components/Title.js';
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
    }, [])

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
                                    <img src={`${user.avatar}`}
                                        width="auto" height="192" className={classes.avatar}></img>
                                </Box>
                            </Paper>
                        </Grid>

                        {/*Profile information*/}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <Title>Editing profile of user {user.username}...</Title>
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