import React, { useEffect, useState } from 'react';
import { CssBaseline, Grid, Container, Box, Paper } from '@material-ui/core';
import Footer from '../Components/Footer';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Styles/Style';
import Navbar from '../Components/Navbar.js';
import { ToastContainer, toast } from 'react-toastify';
import Title from '../Components/Styles/Title.js';
import { getSpecificGroup } from '../Services/BasicService';
import Form from '../Components/Groups/FormEditGroup';


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
    }, [id])

    const classes = useStyles();

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