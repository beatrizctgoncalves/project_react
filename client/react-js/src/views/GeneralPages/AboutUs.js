import React from 'react'
import Footer from '../Components/Footer.js';
import { Container, CssBaseline, Box, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../Components/Style';
import Navbar from '../Components/Navbar.js';


function About() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h3" align="center" color="textPrimary">
                                About Our Application
                            </Typography>
                        </Grid>

                        TODO
                    </Grid>

                    <Box pt={8}>
                        <Footer />
                    </Box>
                </Container>
            </main>
        </div>
    )
}

export default About