import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { useStyles } from '../Components/Style';


export default function Error() {
    const classes = useStyles();

    function goHome() {
        window.location.replace('/');
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Box className={classes.errorBox}>
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Typography align="center" color="textPrimary" variant="h4">
                                    404: The page you are looking for isn’t here
                                </Typography>
                                <Typography align="center" color="textPrimary" variant="subtitle1">
                                    You either tried some shady route or you came here by mistake.
                                    Whichever it is, try using the navigation bar.
                                </Typography>
                                <Grid item xs={12}>
                                    <Box align='center' mt={5}>
                                        <img alt="Under development" src="https://material-kit-react.devias.io/static/images/undraw_page_not_found_su7k.svg" width="auto" height="192" />
                                    </Box>
                                </Grid>
                            </Grid>
                        </Grid>

                        <Box pt={8}>
                            <Container maxWidth="xs">
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={goHome}
                                >
                                    Go Home
                                </Button>
                            </Container>
                        </Box>

                        <Box pt={8}>
                            <Footer />
                        </Box>
                    </Container>
                </Box>
            </main>
        </div>
    )
}