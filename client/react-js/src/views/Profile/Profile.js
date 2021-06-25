import React, { useState, useEffect } from 'react';
import { getUser, updateUserAvatar } from '../Services/BasicService.js';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Footer from '../Components/Footer.js';
import GoBack from '../Components/GoBack';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, CardHeader } from '@material-ui/core';


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
    },
}));

function Profile() {
    const username = window.sessionStorage.getItem("username")
    const [user, setUser] = useState({})

    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    useEffect(() => {
        getUser(username)
            .then(resp => {
                setUser(resp.message[0])
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])

    const classes = useStyles();

    const [newAvatar, setNewAvatar] = useState("")
    const [toUpdateAvatar, setUpdatedAvatar] = useState(false)


    useEffect(() => {
        getUser(username)
            .then(resp => {
                setUser(resp.message[0])
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])

    function handleToEditAvatarChange() {
        if (toUpdateAvatar) {
            setUpdatedAvatar(false)
        } else {
            setUpdatedAvatar(true)
        }
    }

    function handleUpateAvatar() {
        updateUserAvatar(username, newAvatar)
            .then(resp => {
                user.avatar = newAvatar;
                setNewAvatar(user.avatar)
                setUpdatedAvatar(false)
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }



    return(
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">Your Profile</h2>
                    <hr className="divider" />
                </div>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card align="center">
                            <CardHeader
                                title={
                                    <>
                                    {toUpdateAvatar ?
                                        <div className="col mb-5">
                                            <div className="card h-100">
                                                <div className="card-body p-4">
                                                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                        <div className="text-center">
                                                            <h3 className="h4 mb-2">Insert New Avatar</h3>
                                                            <br />
                                                            <input
                                                                variant="outlined"
                                                                margin="normal"
                                                                required
                                                                fullWidth
                                                                type="text"
                                                                name="newAvatar"
                                                                className="form-control"
                                                                placeholder="Enter A Link"
                                                                value={newAvatar}
                                                            />
                                                            <br /><br />

                                                            <Button
                                                                type="button"
                                                                className="button1"
                                                                fullWidth
                                                                variant="contained"
                                                                color="primary"
                                                                onClick={handleUpateAvatar}
                                                            >
                                                                Save
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : ""}
                    
                                    <div className="row justify-content-center">
                                        <button className="btn btn-groups btn-xl" type="button" onClick={handleToEditAvatarChange}>
                                            <img src={`${user.avatar}`}
                                                width="auto" height="150" className={classes.avatar}></img>
                                        </button>
                                    </div>
                                    </>
                                }
                                subheader={user.name}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                            />
                            <CardContent>
                                <div className={classes.cardPricing}>
                                    <Typography component="h2" variant="h5" color="textPrimary">
                                        {user.description}
                                    </Typography>
                                    <br />

                                    <Typography variant="h6" color="textSecondary">
                                        Owner: {user.owner}
                                    </Typography>
                                    <br />
{/*
                                    <Typography variant="h6" color="textSecondary">
                                        Projects:
                                    </Typography>
                                    {user.info.map((project) => (
                                        <Typography component="p" variant="subtitle1" align="center" key={project}>
                                            {project}
                                        </Typography>
                                    ))}*/}
                                </div>
                            </CardContent>

                            <CardContent>
                                
                                <Box mt={4}>
                                    <ColorButton variant="contained" color="primary" className={classes.margin} onClick={'handleToEditMembersChange'}>
                                        <i className="bi bi-person-plus-fill">&nbsp;&nbsp;</i>
                                        <Link to={`/users/${user.id}/edit`}><i className="bi bi-pencil-fill" /></Link>
                                    </ColorButton>

                                    
                                    <ColorButton variant="contained" color="primary" className={classes.margin} onClick={'handleToEditProjectsChange'}>
                                        <i className="bi bi-patch-plus-fill">&nbsp;&nbsp;</i>
                                    </ColorButton>
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box mt={5}>
                    <GoBack />
                </Box>
                
                <Box mt={5}>
                    <br /><br />
                    <Footer />
                    <br />
                </Box>
            </div>
        </Container >
    )
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">{username}</h2>
                    <hr className="divider" />
                </div>
                <img src="https://thumbs.dreamstime.com/b/programmer-linear-icon-technologist-freelancer-thin-line-illustration-contour-symbol-vector-isolated-outline-drawing-programmer-197065655.jpg"
                    width="auto" height="150"></img>
                <br />
                
                <div className={classes.div}>
                    <Grid container spacing={2} align="center">
                        <Grid item xs={12}>
                            <h5>{user.name} {user.surname}</h5>
                        </Grid>
                        <Grid item xs={12}>
                            <h5>Additional Information:</h5>
                            {user.info ? user.info.map(info => {
                                return <li>{info}</li>
                            }) : ""}
                        </Grid>
                    </Grid>
                    <br />
                    <br />
                    <Grid container spacing={2} align="center">
                        <Grid item xs={12}>
                            <a className="btn btn-users btn-xl" href={`/profile/edit`}>Edit Profile</a>
                        </Grid>
                    </Grid>
                    <Box mt={4}>
                        <GoBack />
                    </Box>
                </div>
            </div>
            <Box mt={5}>
                <br /><br />
                <Footer />
                <br />
            </Box>
        </Container>
    )
}


export default Profile