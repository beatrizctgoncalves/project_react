import React from 'react'
import Footer from '../Components/Footer.js';
import { Button, CssBaseline, Box, Grid, Typography, Divider } from '@material-ui/core';
import '../../App.css'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { grey, indigo } from '@material-ui/core/colors';


const ColorButton1 = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(grey[700]),
        backgroundColor: indigo[700],
        fontWeight: 'bold',
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
            backgroundColor: indigo[400],
        },
        margin: '4px'
    },
}))(Button);

const ColorButton2 = withStyles((theme) => ({
    root: {
        color: grey[50],
        backgroundColor: grey[400],
        fontWeight: 'bold',
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
            backgroundColor: grey[700],
            color: grey[50]
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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    masterHead: {
        paddingTop: 400,
        paddingBottom: 150,
        background: 'linear-gradient(to bottom, rgba(66, 80, 92, 0.8) 0%, rgba(97, 106, 129, 0.8) 100%), url("https://image.freepik.com/free-vector/young-man-study-computer-online-learning-concept_186332-336.jpg")',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundSize: 'contain'
    },
    section: {
        paddingTop: 100,
        paddingBottom: 100,
        background: '#274e81e1',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'scroll',
        backgroundSize: 'contain'
    },
    title: {
        color: '#fff',
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
        fontWeight: 'bold'
    },
    subtitle: {
        color: '#fff',
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
    },
    divider: {
        backgroundColor: '#fff',
        height: '2rem',
        maxWidth: '3.5rem',
        margin: {
            marginTop: '1.5rem',
            marginRight: 'auto',
            marginBottom: '1.5rem',
            marginLeft: 'auto'
        },
        opacity: 1
    }
}));

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
                <Grid container spacing={3} align='center'>
                    <Grid item xs={12}>
                        <Typography variant="h2" className={classes.title}>
                            Pluggable Gamification
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" className={classes.subtitle}>
                            Start gamifying your projects so you never feel bored! <br />
                            Just create an account and start adding your team and projects to groups!
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <ColorButton1 variant="contained" className={classes.margin} onClick={handleAbout}>
                            Find Out More&nbsp;&nbsp;
                            <i className="bi bi-arrow-right-short"></i>
                        </ColorButton1>
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
                            <ColorButton2 variant="contained" className={classes.margin} onClick={handleSignUp}>
                                Here&nbsp;&nbsp;
                                <i className="bi bi-arrow-right-short"></i>
                            </ColorButton2>
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
                            <ColorButton2 variant="contained" className={classes.margin} onClick={handleSignUp}>
                                Get Started!&nbsp;&nbsp;
                                <i className="bi bi-arrow-right-short"></i>
                            </ColorButton2>
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