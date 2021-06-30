import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useStyles } from '../Components/Style';
import { makeStyles } from '@material-ui/core';
import { ButtonHome1 } from '../Components/ColorButtons';


const useStyles2 = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    letters: {
        color: '#fff',
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: '#303f9f'
    }
}));

export default function SignInSide() {
    const classes = useStyles();
    const classes2 = useStyles2();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Grid container component="main" className={classes.root}>
                    <Grid item className={classes.image} xs={12} component={Paper} elevation={6} square>
                        <div className={classes2.paper}>
                            <Box mt={6} align='center'>
                                <Typography component="h1" variant="h2" className={classes2.letters}>
                                    Pluggable Gamification
                                </Typography>
                                <br />

                                <Grid item xs={12} align='center'>
                                    <Typography variant="h5" className={classes.subtitle} className={classes2.letters}>
                                        Start gamifying your projects so you never feel bored! <br />
                                        Just create an account and start adding your team and projects to groups!
                                    </Typography>
                                </Grid>
                                <br />

                                <Grid item xs={12}>
                                    <ButtonHome1 variant="contained" className={classes.margin} onClick={'handleAbout'}>
                                        Find Out More&nbsp;&nbsp;
                                        <i className="bi bi-arrow-right-short"></i>
                                    </ButtonHome1>
                                </Grid>

                                <Box pt={8} className={classes.section}>
                                    <Paper className={classes2.card}>
                                        <br />
                                        <Grid container spacing={2} align='center'>
                                            <Grid item xs={12}>
                                                <Typography variant="h4" className={classes2.letters}>
                                                    We've got what you need!
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Typography variant="body1" className={classes.subtitle} className={classes2.letters}>
                                                    Never get bored of your work!<br />
                                                    Our website is always free!<br />
                                                    You can add your own projects to be gamify, no strings attached!
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <br /><br />
                                    </Paper>
                                </Box>
                            </Box>
                        </div>
                    </Grid>
                </Grid>

                <Box pt={4}>
                    <Container maxWidth="xs">
                        <Footer />
                    </Container>
                </Box>
            </main>
        </div>
    );
}