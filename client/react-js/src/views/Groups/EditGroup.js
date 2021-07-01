import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid, Container, Box, Paper } from '@material-ui/core';
import Footer from '../Components/Footer';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Style';
import Navbar from '../Components/Navbar.js';
import { ToastContainer, toast } from 'react-toastify';
import Title from '../Components/Title.js';
import clsx from 'clsx';
import { getSpecificGroup } from '../Services/BasicService';
import Form from './FormEditGroup';


function EditGroup(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params

    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
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
    }, [])

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />

            <ToastContainer />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} align='center'>
                            <Paper className={classes.paper}>
                                <Title>Editing group {group.name}...</Title>
                                <br />
                                <Form {...props} />
                                <br />
                            </Paper>
                        </Grid>
                    </Grid>

                    <Box pt={8}>
                        <Container maxWidth="xs">
                            <GoBack />
                        </Container>
                    </Box>

                    <Box pt={8}>
                        <Footer />
                    </Box>
                </Container>
            </main>
        </div>
    )
}


export default EditGroup
/*
import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer.js';
import { getSpecificGroup } from '../Services/BasicService';
import Alert from 'react-bootstrap/Alert'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Style';
import Form from './FormEditGroup';
import { Container, CssBaseline, Grid, Box } from '@material-ui/core';


function EditGroup(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params

    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })


    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])


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
                <div className="container px-4 px-lg-2">
                    <h2 className="text-center mt-0">Editing Group {group.name}...</h2>
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
                    <Grid item xs={12} className={classes.div}>
                        <Form {...props} />
                    </Grid>
                </Grid>

                <Box mt={4}>
                    <br /><br />
                    <GoBack />
                </Box>

                <Box mt={8}>
                    <Footer />
                </Box>
            </div >
        </Container>
    )
}


export default EditGroup;*/