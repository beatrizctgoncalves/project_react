import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Box, CssBaseline, Grid } from '@material-ui/core';
import Footer from '../Components/Footer';
import Form from './FormProfile';
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
        alignItems: 'center'
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
    const username = window.sessionStorage.getItem("username")
   
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">Editing {username}...</h2>
                    <hr className="divider" />
                </div>

                <Grid container spacing={3}>
                    <Grid item xs={12} className={classes.div}>
                        <Form />
                    </Grid>
                </Grid>

                <Box mt={4}>
                    <br/>
                    <GoBack />
                </Box>

                <Box mt={5}>
                    <br /><br />
                    <Footer />
                    <br />
                </Box>
            </div>
        </Container>
    )
}


export default EditProfile