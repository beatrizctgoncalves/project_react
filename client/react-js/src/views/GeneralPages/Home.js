import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useStyles } from '../Components/Styles/Style';
import { makeStyles } from '@material-ui/core';
import { ButtonHome1 } from '../Components/Styles/ColorButtons';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


const useStyles2 = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    letters: {
        color: '#000',
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: '#303f9f'
    }
}));

export default function SignInSide() {
    const classes = useStyles();
    const classes2 = useStyles2();

    function handleAbout() {
        window.location.replace('/about-us')
    }

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
                                    <Typography variant="h5" className={classes2.letters}>
                                        Start gamifying your projects so you never feel bored! <br />
                                        Just create an account and start adding your team and projects to groups!
                                    </Typography>
                                </Grid>
                                <br />

                                <Grid item xs={12}>
                                    <ButtonHome1 variant="contained" className={classes.margin} onClick={handleAbout}>
                                        Find Out More
                                        <ArrowForwardIosIcon />
                                    </ButtonHome1>
                                </Grid>
                                <img alt='home' src='https://img.freepik.com/vetores-gratis/empresario-trabalhando-e-voando-como-super-heroi-com-maleta-inicie-o-lancamento-inicie-o-conceito-de-empreendimento-e-empreendedorismo-em-fundo-branco_335657-1678.jpg?size=626&ext=jpg' />
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