import React from 'react'
import Footer from '../Components/Footer.js';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Box, GridList, GridListTile, Typography, Card, CardContent } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    gridList: {
        width: 1000,
        height: 320,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardGroup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(4),
    }
}));

function About() {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-2">
                    <h2 className="text-center mt-0">About Us</h2>
                    <hr className="divider" />
                </div>
                <br />

                <GridList cellHeight={300} className={classes.gridList} cols={4}>
                    <GridListTile cols={1} spacing={2}>
                        <Card align="center">
                            <br />
                            <i className="bi-check-circle-fill fs-1 text-primary"></i>
                            <Typography component="h4" variant="bolt" align="center" color="primary">Up to Date</Typography>
                            <CardContent>
                                <Typography component="p" variant="subtitle1" align="center">
                                    All dependencies are kept current to keep things fresh.
                                    <br/><br/><br/>
                                </Typography>
                            </CardContent>
                        </Card>
                    </GridListTile>

                    <GridListTile cols={1}>
                        <Card align="center">
                            <br />
                            <i className="bi-laptop fs-1 text-primary"></i>
                            <Typography component="h4" variant="bolt" align="center" color="primary">Responsive Design</Typography>
                            <CardContent>
                                <Typography component="p" variant="subtitle1" align="center">
                                    Our site  has a responsive mobile-first web application.
                                    <br />
                                    Allows consulting information of various platforms!
                                </Typography>
                            </CardContent>
                        </Card>
                    </GridListTile>

                    <GridListTile cols={1}>
                        <Card align="center">
                            <br />
                            <i className="bi-globe fs-1 text-primary"></i>
                            <Typography component="h4" variant="bolt" align="center" color="primary">Responsive Design</Typography>
                            <CardContent>
                                <Typography component="p" variant="subtitle1" align="center">
                                    Something
                                    <br/><br/><br/><br/>
                                </Typography>
                            </CardContent>
                        </Card>
                    </GridListTile>

                    <GridListTile cols={1}>
                        <Card align="center">
                            <br />
                            <i className="bi-globe fs-1 text-primary"></i>
                            <Typography component="h4" variant="bolt" align="center" color="primary">Responsive Design</Typography>
                            <CardContent>
                                <Typography component="p" variant="subtitle1" align="center">
                                    Something
                                    <br/><br/><br/><br/>
                                </Typography>
                            </CardContent>
                        </Card>
                    </GridListTile>
                </GridList>

                <Box mt={8}>
                    <Footer />
                </Box>
            </div>
        </Container >
    )
}

export default About