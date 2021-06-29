import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer.js';
import { Link } from 'react-router-dom';
import { getUserMemberGroups } from '../Services/BasicService';
import { Container, CssBaseline, Grid, Box, Card, CardHeader, Typography } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoBack from '../Components/GoBack';
import { ButtonGreen, ButtonGrey } from '../Components/ColorButtons';
import { useStyles } from '../Components/Style';


function Groups() {
    const [groups, setGroups] = useState([])

    const owner = window.sessionStorage.getItem("username")
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    useEffect(() => {
        getUserMemberGroups(owner)
            .then(resp => setGroups(resp.message))
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


    function handleRedirect() {
        window.location.replace(`/groups`)
    }

    function handleGroup(id) {
        window.location.replace(`/groups/${id}`)
    }

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">Your Groups</h2>
                    <hr className="divider" />
                </div>
                <ToastContainer />
                <br />

                <Grid container spacing={3} justify='center'>
                    {groups ? groups.map(group => {
                        return (
                            <Grid item xs={4} key={group.id}>
                                <Card align="center">
                                    <CardHeader
                                        subheader={group.name}
                                        subheaderTypographyProps={{ align: 'center' }}
                                        className={classes.cardHeader}
                                    />
                                    <Box mt={1}>
                                        <ButtonGrey variant="contained" className={classes.margin} onClick={handleGroup.bind(null, group.id)}>
                                            <Typography variant="body2">
                                                <i className="bi bi-eye-fill"></i>
                                            </Typography>
                                        </ButtonGrey>
                                    </Box>
                                    <Box mt={1}></Box>
                                </Card>
                            </Grid>
                        )
                    }) : ""}
                </Grid>

                <Box mt={6} align='center'>
                    <Grid container spacing={2} justify='center'>
                        <ButtonGreen type="submit" variant="contained" onClick={handleRedirect} >
                            <i className="bi bi-eyeglasses">&nbsp;&nbsp;</i>
                            Your Groups
                        </ButtonGreen>
                    </Grid>
                </Box>

                <Box mt={7}>
                    <GoBack />
                </Box>

                <Box mt={8}>
                    <Footer />
                </Box>
            </div>
        </Container >
    )
}

export default Groups;