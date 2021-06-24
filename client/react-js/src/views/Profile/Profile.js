import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../Components/Footer';
import { getUser } from '../Services/BasicService.js';
import GoBack from '../Components/GoBack';


const useStyles = makeStyles((theme) => ({
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
    }
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
                        <Grid item xs={12} sm={6}>
                            <h5>{user.name}</h5>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h5>{user.surname}</h5>
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
                            <a className="btn btn-groups btn-xl" href={`/profile/edit`}>Edit Profile</a>
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