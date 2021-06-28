import React from 'react';
import { Container, Box, CssBaseline, Grid } from '@material-ui/core';
import Footer from '../Components/Footer';
import Form from './FormProfile';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Style';


function EditProfile() {
    const username = window.sessionStorage.getItem("username")
   
    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-2 px-lg-4">
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