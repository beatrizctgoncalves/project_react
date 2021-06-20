import React from 'react'
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from '../Components/Footer';
import Form from './FormProfile';

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
        margin: theme.spacing(3, 0, 2)
    }
}));

function EditProfile() {
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
                    <h2 class="text-center mt-0">Editing Username...</h2>
                    <hr class="divider"/>
                </div>
                <div className={classes.div}>
                    <Form/>                 
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


export default EditProfile