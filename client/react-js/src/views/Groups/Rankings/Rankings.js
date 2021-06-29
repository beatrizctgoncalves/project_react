import React, { useEffect, useState } from 'react'
import { getSpecificGroup, getRankings } from '../../Services/BasicService.js';
import Footer from '../../Components/Footer';
import GoBack from '../../Components/GoBack';
import { useStyles } from '../../Components/Style';
import { Typography, CardHeader, Container, Card, CardContent, CssBaseline, Grid, Button, Box, TextField, Link } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';


function Rankings(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params

    const [sprints, setSprints] = useState([])

    useEffect(() => {
        getRankings(id)
            .then(resp => {
                setSprints(resp.message)
            })
            .catch(err => {
                console.log(err)
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

    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
            .catch(err => {
                console.log(err)
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

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">{group.name} - Rankings</h2>
                    <hr className="divider" />
                </div>
                <ToastContainer />
                <br />

                <Grid container spacing={3} justify='center'>
                    {sprints && sprints.length != 0 ? sprints.map(sprint =>
                        <Grid item xs={4} key={sprint.SprintTitle}>
                            <Card align="center">
                                <CardHeader
                                    title={sprint.SprintTitle}
                                    titleTypographyProps={{ align: 'center' }}
                                    className={classes.cardHeader}
                                />

                                <div className={classes.cardGroup} key={sprint.SprintTitle}>
                                    <CardContent>
                                        <Grid item xs={12}>
                                            <Grid container spacing={4} justify='center'>
                                                {sprint.Scores && sprint.Scores != 0 ? sprint.Scores.map(score =>
                                                    <Grid item xs={4} key={score.AppUsername}>
                                                        <Typography variant="body1">
                                                            {score.AppUsername}
                                                        </Typography>

                                                        <ul className={classes.listItem}>
                                                            <Typography variant="body2" color="textSecondary">
                                                                {score.Points}
                                                            </Typography>
                                                        </ul>
                                                    </Grid>
                                                ) :
                                                    <div className={classes.cardGroup}>
                                                        <Grid item xs={12}>
                                                            <Card align="center">
                                                                <CardContent className={classes.cardHeader}>
                                                                    <Typography variant="h6" color="textSecondary">
                                                                        This Group do not have any Scores.<br />
                                                                        Start finishing Sprints!
                                                                    </Typography>
                                                                </CardContent>
                                                            </Card>
                                                        </Grid>
                                                    </div>
                                                }
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </div>
                            </Card>
                        </Grid>
                    ) :
                        <div className={classes.cardGroup}>
                            <Grid item xs={12}>
                                <Card align="center">
                                    <CardContent className={classes.cardHeader}>
                                        <Typography variant="h6" color="textSecondary">
                                            You do not have any Sprints.<br />
                                            Start adding so we can gamify them!
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </div>
                    }
                </Grid>

                <Box mt={8}>
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
}


export default Rankings;