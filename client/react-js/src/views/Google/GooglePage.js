import React, { useEffect } from 'react';
import { Container, Typography, Box, CssBaseline, Grid, Paper, Button } from '@material-ui/core';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { ToastContainer } from 'react-toastify';
import { useStyles } from '../Components/Styles/Style';


export default function GooglePage(props) {
    const { username } = props.match.params

    useEffect(() => {
        window.sessionStorage.setItem('username', username);
        window.location.assign('/groups')
    })

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />

            <ToastContainer />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="sm" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} align='center'>
                            <Paper className={classes.paper}>
                                <Box align='center'>
                                    <Typography component="h1" variant="h2">
                                        Welcome {username}!
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>

                <Box mt={2}>
                    <Footer />
                </Box>
            </main>
        </div>
    );
}