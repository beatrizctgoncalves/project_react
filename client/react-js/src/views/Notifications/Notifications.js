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
    )




    return (
        <section className="page-section">
            <div className="container px-2 px-lg-5">
                <h2 className="text-center mt-0">Your Notifications</h2>
                <hr className="divider" />

                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {notifications ? notifications.map(notification => {
                            return (
                                <div className="col mb-5">
                                    <div className="card h-100">
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                                <h3 className="h4 mb-2" key={notification.name}>
                                                    <Link color="inherit" to={`/notifications/${notification.id}`}>{notification.name} </Link>
                                                </h3>
                                                {notification.description}
                                            </div>
                                        </div>

                                        <div className="row gx-4 gx-lg-5 justify-content-center">
                                            <div className="col-lg-8 text-center">
                                                <Link className="btn btn-outline-dark mt-auto" type="button" to={`/notifications/${notification.id}/edit`}>
                                                    <i className="bi bi-pencil-fill"></i>
                                                </Link>
                                                <button className="btn btn-outline-dark mt-auto" type="button" onClick={"handlenotificationDelete.bind(null, notification.id)"}>
                                                    <i className="bi bi-trash-fill"></i>
                                                </button>
                                                <br /><br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : ""}
                    </div>
                </div>

                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 text-center">
                        {toCreate ?
                            <div className="container px-4 px-lg-2 mt-2">
                                <div className="row gx-2 gx-lg-2 row-cols-2 row-cols-md-3 row-cols-xl-2 justify-content-center">
                                    <div className="col mb-5 card h-100 card-body p-4">
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                                            <h3 className="h4 mb-2">Create New notification</h3>
                                            <br />
                                            <input
                                                variant="outlined"
                                                margin="normal"
                                                className="form-control"
                                                required
                                                fullWidth
                                                type="text"
                                                name="name"
                                                placeholder="Enter notification Name"
                                                onChange={"handleChange"}
                                            />
                                            <br />
                                            <input
                                                variant="outlined"
                                                margin="normal"
                                                className="form-control"
                                                required
                                                fullWidth
                                                type="text"
                                                name="description"
                                                onChange={"handleChange"}
                                                placeholder="Enter notification Description"
                                            />
                                            <br /><br />

                                            <Button
                                                type="button"
                                                className="button1"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                onClick={"handlenotificationCreate"}
                                            >
                                                Create notification
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ""}
                        <button className="btn btn-notifications btn-xl" type="button" onClick={"handleToCreate"}>
                            <i className="bi bi-plus-circle-fill">         </i>
                            {toCreate ? "" : "Create notification"}
                        </button>
                        <Box mt={4}>
                            <GoBack />
                        </Box>
                    </div>
                </div>
            </div>

            <Box mt={8}>
                <Footer />
            </Box>
        </section >
    )
}


export default Notifications;