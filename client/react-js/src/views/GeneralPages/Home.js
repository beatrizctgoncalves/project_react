import React from 'react'
import Footer from '../Components/Footer.js';
import { ButtonHome1, ButtonHome2 } from '../Components/ColorButtons';
import { CssBaseline, Box, Grid, Typography, Divider } from '@material-ui/core';
import '../../App.css'
import { useStyles } from '../Components/Style'


function Home() {
    const username = window.sessionStorage.getItem("username")

    function handleAbout() {
        window.location.replace('/about-us');
    }

    function handleSignUp() {
        if (username) {
            window.location.replace('/profile');
        } else {
            window.location.replace('/sign-up');
        }
    }

    const classes = useStyles();

    return (
        <>
            <CssBaseline />
            <Box className={classes.masterHead}>
                <Grid container spacing={1} align='center'>
                    <Grid item xs={12}>
                        <Typography variant="h3" className={classes.title}>
                            Pluggable Gamification
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body1" className={classes.subtitle}>
                            Start gamifying your projects so you never feel bored! <br />
                            Just create an account and start adding your team and projects to groups!
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonHome1 variant="contained" className={classes.margin} onClick={handleAbout}>
                            Find Out More&nbsp;&nbsp;
                            <i className="bi bi-arrow-right-short"></i>
                        </ButtonHome1>
                    </Grid>
                </Grid>
            </Box>

            {username ?
                <Box className={classes.section}>
                    <Grid container spacing={3} align='center'>
                        <Grid item xs={12}>
                            <Typography variant="h4" className={classes.title}>
                                Check your account!
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider variant="middle" className={classes.divider} />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body1" className={classes.subtitle}>
                                You can see your rankings, groups <br />
                                and so much more with just a click! <br />
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <ButtonHome2 variant="contained" className={classes.margin} onClick={handleSignUp}>
                                Here&nbsp;&nbsp;
                                <i className="bi bi-arrow-right-short"></i>
                            </ButtonHome2>
                        </Grid>
                    </Grid>
                </Box>
                :
                <Box className={classes.section}>
                    <Grid container spacing={3} align='center'>
                        <Grid item xs={12}>
                            <Typography variant="h4" className={classes.title}>
                                We've got what you need!
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <hr color="#fff" />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="body1" className={classes.subtitle}>
                                Never get bored of your work! <br />
                                Our website is always free! <br />
                                You can add your own projects to be gamify, no strings attached!
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <ButtonHome2 variant="contained" className={classes.margin} onClick={handleSignUp}>
                                Get Started!&nbsp;&nbsp;
                                <i className="bi bi-arrow-right-short"></i>
                            </ButtonHome2>
                        </Grid>
                    </Grid>
                </Box>
            }

            <Box mt={5}>
                <Footer />
            </Box>
        </ >
    )
}

export default Home