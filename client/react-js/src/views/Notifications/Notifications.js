import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer.js';
import { Button, Container, CssBaseline, Grid, GridListTile, Box, Card, CardHeader, CardContent, Link } from '@material-ui/core';
import { getUserNotifications, removeUserNotification, getSpecificGroup } from '../Services/BasicService';
import Alert from 'react-bootstrap/Alert'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoBack from '../Components/GoBack';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';


const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: green[500],
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
            backgroundColor: green[700],
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
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    }
}));

function Notifications() {
    const [notifications, setNotifications] = useState([])
    const [edit, setEdit] = useState(false)

    const [toCreate, setToCreate] = useState(false)

    const username = window.sessionStorage.getItem("username")
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    useEffect(() => {
        getUserNotifications(username)
            .then(resp => setNotifications(resp.message))
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
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
    }, [])

    function handleNotificationReject(id) {
        removeUserNotification(username, id)
            .then(resp => {
                let aux = notifications.filter(notification => {
                    if (notification.group_id !== id) {
                        return notification
                    }
                })
                setNotifications(aux)
                setEdit(false)
            })
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
            })
    }

    function handleNotificationAccept(id) {
        //TODO
    }

    function handleGroupName(id) {
        getSpecificGroup(id)
            .then(resp => setNotifications(resp.message.id))
    }


    function notify() {
        toast("Wow so easy!", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const classes = useStyles();
    return (
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
                        TODO
                    </Grid>
                </Grid>
            </div>
        </Container>
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