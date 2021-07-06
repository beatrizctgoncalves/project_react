import React, { useEffect, useState } from 'react'
import { getSpecificGroup, getRankings } from '../Services/BasicService.js';
import Footer from '../Components/Footer';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Styles/Style';
import { Typography, Container, Card, CardContent, CssBaseline, Grid, Box } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import CardRankings from '../Components/Rankings/CardRankings';
import Navbar from '../Components/Navbar.js';


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
    }, [id])

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
    }, [id])


    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />

            <ToastContainer />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="sm" component="main" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h3" align="center" color="textPrimary">
                                Rankings
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h5" align="center" color="textSecondary" component="p">
                                {group.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>

                <Container maxWidth="md" component="main">
                    <Grid container spacing={4} justify='center'>
                        {sprints && sprints.length !== 0 ? sprints.map(sprint =>
                            <CardRankings key={sprint} sprint={sprint} groupId={id} />
                        ) :
                            <div className={classes.cardGroup}>
                                <Grid item xs={12}>
                                    <Card align="center">
                                        <CardContent className={classes.cardHeader}>
                                            <Typography variant="h6" color="textSecondary">
                                                This Group do not have any Scores.<br />
                                                Start creating Sprints!
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </div>
                        }
                    </Grid>

                    <Box pt={8}>
                        <Container maxWidth="xs">
                            <GoBack />
                        </Container>
                    </Box>
                </Container>

                <Box pt={8}>
                    <Footer />
                </Box>
            </main>
        </div>
    )
}


export default Rankings;