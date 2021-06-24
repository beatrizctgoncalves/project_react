import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../Components/Footer';


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
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br/><br/>
                <img src="https://thumbs.dreamstime.com/b/programmer-linear-icon-technologist-freelancer-thin-line-illustration-contour-symbol-vector-isolated-outline-drawing-programmer-197065655.jpg" 
                width="auto" height="150"></img>
                <br/>
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">Username</h2>
                    <hr className="divider"/>
                </div>
                <div className={classes.div}>
                    <Grid container spacing={2} align="center">
                        <Grid item xs={12} sm={6}>
                            <h3>First Name</h3>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h3>Last Name</h3>
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Email Address</h3>
                        </Grid>
                        <Grid item xs={12}>
                            <h3>Additional Information</h3>
                        </Grid>
                    </Grid>
                    <br/>
                    <br/>
                    <Grid container spacing={2} align="center">
                        <Grid item xs={12} sm={6}>
                            <a className="btn btn-profile btn-xl" href="/edit-profile">Edit Profile</a>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <a className="btn btn-profile btn-xl" href="/groups">My Groups</a>
                        </Grid>
                    </Grid>                    
                </div>
            </div>
            <Box mt={5}>
                <br /><br />
                <Footer />
                <br/>
            </Box>
        </Container>
    )
}


export default Profile