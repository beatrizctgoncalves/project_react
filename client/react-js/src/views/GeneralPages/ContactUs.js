import React from 'react';
import Footer from '../Components/Footer.js';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, GridList, GridListTile, Box, Link, Typography, Card, CardHeader, CardContent } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    gridList: {
        width: 1000,
        height: 370,
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
}));

function ContactUs() {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-2">
                    <h2 className="text-center mt-0">Contact Us</h2>
                    <hr className="divider" />
                </div>
                <br />

                <GridList cellHeight={320} className={classes.gridList} cols={3}>
                    <GridListTile cols={1}>
                        <Card align="center">
                            <CardHeader
                                title={<img className="card-img-top" src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif"
                                    alt="Card image cap"></img>}
                                subheader={<Link to={`https://github.com/beatrizctgoncalves`}>Beatriz Gonçalves</Link>}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                            />
                            <CardContent>
                                <Typography component="h3" variant="h6" color="textPrimary">
                                    Engineering student at ISEL
                                </Typography>
                                (Instituto Politécnico Engenharia de Lisboa)
                            </CardContent>
                        </Card>
                    </GridListTile>

                    <GridListTile cols={1}>
                        <Card align="center">
                            <CardHeader
                                title={<img className="card-img-top" src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif"
                                    alt="Card image cap"></img>}
                                subheader={<Link to={`https://github.com/A44866`}>Maksym</Link>}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                            />
                            <CardContent>
                                <Typography component="h3" variant="h6" color="textPrimary">
                                    Engineering student at ISEL
                                </Typography>
                                (Instituto Politécnico Engenharia de Lisboa)
                            </CardContent>
                        </Card>
                    </GridListTile>

                    <GridListTile cols={1}>
                        <Card align="center">
                            <CardHeader
                                title={<img className="card-img-top" src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif"
                                    alt="Card image cap"></img>}
                                subheader={<Link to={`https://github.com/pinto6`}>Miguel Pinto</Link>}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                            />
                            <CardContent>
                                <Typography component="h3" variant="h6" color="textPrimary">
                                    Engineering student at ISEL
                                </Typography>
                                (Instituto Politécnico Engenharia de Lisboa)
                            </CardContent>
                        </Card>
                    </GridListTile>
                </GridList>

                <Box mt={8}>
                    <Footer />
                </Box>
            </div>
        </Container>
    )
}

export default ContactUs