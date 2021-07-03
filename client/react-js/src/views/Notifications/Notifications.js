import React, { useState, useEffect } from 'react';
import { getUser } from '../Services/BasicService.js';
import Footer from '../Components/Footer.js';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Style';
import { Typography, CssBaseline, Grid, Container, Box, Paper } from '@material-ui/core';
import Navbar from '../Components/Navbar.js';
import { ToastContainer, toast } from 'react-toastify';
import clsx from 'clsx';


function Notifications() {
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
    }, [username])

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />

            <ToastContainer />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="sm" component="main" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h3" align="center" color="textPrimary">
                                Notifications
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h5" align="center" color="textSecondary" component="p">
                                {username}, you can accept or reject invites from other users to participate in their groups!
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>

                <Container maxWidth="md" component="main">
                    <Grid container spacing={4} alignItems='center'>
                        {user.notifications && user.notifications !== 0 ? user.notifications.map(notification =>
                            <></>
                        ) :
                            <Paper className={fixedHeightPaper}>
                                <Box mt={3} align='center'>
                                    <Typography variant="h6" color="textSecondary">
                                        You do not have any Notifications.
                                    </Typography>
                                </Box>
                            </Paper>
                        }
                    </Grid>
                </Container>

                <Box pt={8}>
                    <Container maxWidth="xs">
                        <GoBack />
                    </Container>
                </Box>

                <Box pt={8}>
                    <Footer />
                </Box>
            </main>
        </div >
    )
}
/*return (
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <br /><br />
            <div className="container px-4 px-lg-5">
                <h2 className="text-center mt-0">Your Notifications</h2>
                <hr className="divider" />
            </div>
            {
                error.shouldShow &&
                <Alert variant={'warning'} onClose={() => setError(false)} dismissible>
                    {error.errorMessage}
                </Alert>
            }
            <br />

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    {notifications ? notifications.map(notification => {
                        return (
                            <GridListTile cols={1}>
                                <Card align="center">
                                    <CardHeader
                                        title={notification.manager}
                                        subtitle={handleGroupName.bind(null, notification.group_id)}
                                        subtitleTypographyProps={{ align: 'center' }}
                                        titleTypographyProps={{ align: 'center' }}
                                        className={classes.cardHeader}
                                    />
                                    <CardContent>
                                        <ColorButton variant="contained" color="primary" className={classes.margin} onClick={handleNotificationAccept.bind(null, notification.group_id)}>
                                            <i className="bi bi-check-lg"></i>
                                        </ColorButton>
                                        <ColorButton variant="contained" color="primary" className={classes.margin} onClick={handleNotificationReject.bind(null, notification.group_id)}>
                                            <i className="bi bi-trash-fill"></i>
                                        </ColorButton>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        )
                    }) : ""}
                </Grid>
            </Grid>
        </div>
    </Container>
)*/

export default Notifications;