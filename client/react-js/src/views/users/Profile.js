import React from 'react'
import LockIcon from '@material-ui/icons/Lock';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../Copyright';


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
                <div class="container px-4 px-lg-5">
                    <h2 class="text-center mt-0">Username</h2>
                    <hr class="divider"/>
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
                    </Grid>
                    <br/>
                    <br/>
                    <Grid container spacing={2} align="center">
                        <Grid item xs={12} sm={6}>
                            <a class="btn btn-profile btn-xl" href="/edit-profile">Edit Profile</a>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <a class="btn btn-profile btn-xl" href="/groups">My Groups</a>
                        </Grid>
                    </Grid>                    
                </div>
            </div>
            <Box mt={5}>
                <br /><br />
                <Copyright />
                <br/>
            </Box>
        </Container>

        /*
        <div class="homeItems">
            <div class="box-home m-3">
                <div class="row">
                    <div class="col-md-8">
                        <div class="intro">
                            <br></br>                                
                            <br></br>
                            <br></br>
                            <h2>User's Profile</h2>
                            <br></br>
                            <br></br>
                            <br></br>
                            <h4>Name:
                                <br></br>
                                Surname:
                                <br></br>
                                Email:                                                           
                                <br></br>
                                Additional Information:
                                <br></br>
                                <br></br>
                            </h4>
                        </div>
                    </div>
                    <div class="col-10 col-sm-2 offset-0 intro">
                        <img src="https://thumbs.dreamstime.com/b/programmer-linear-icon-technologist-freelancer-thin-line-illustration-contour-symbol-vector-isolated-outline-drawing-programmer-197065655.jpg" 
                            width="auto" height="150"></img>
                            <br></br><br></br><br></br><br></br>
                        <div class="d-none d-md-block"></div>
                        <input type="submit" name="" value="Edit Profile" href="#"></input>
                        <input type="submit" name="" value="Change Password" href="#"></input>
                    </div>
                </div>
            </div>
            <div class="box-home features m-3">
                <div class="container">
                    <div class="row h-100 justify-content-center align-items-center">
                        <div class="col-sm">
                            <div class="box-profile-statistics">
                                <h1>Account Statistics</h1>
                                <div class="card-body">
                                    <h5 class="card-title"><i><LockIcon style={{ width: 30, height: 'auto' }}/></i> Groups</h5>
                                    <p class="card-text"><b>groups_length</b> Groups Registered</p>
                                    <h5 class="card-title"><i><SportsEsportsIcon style={{ width: 30, height: 'auto' }}/></i> Projects</h5>
                                    <p class="card-text"><b>projects_length</b> Projects Saved</p>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm">
                            <form class="box-create-groups" action="/site/groups" method="POST">
                                <h2>Create A New Group!</h2>
                                <input type="text" name="name" id="name" placeholder="Enter Group Name" required></input>
                                <input type="text" id="desc" name="desc" placeholder="Enter Group Description" required></input>
                                <input type="hidden" name="owner" required></input>
                                <input type="submit" name="" value="Create" href="#"></input>
                            </form>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm">
                            <div class = "mx-auto">
                                <a onclick="myGroups()" id="groups-button" class="mt-5">
                                    Groups
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>*/
    )
}


export default Profile