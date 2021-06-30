import React, { useEffect, useState } from 'react'
import { getUser, getSpecificGroup } from '../../Services/BasicService.js';
import Footer from '../../Components/Footer';
import GoBack from '../../Components/GoBack';
import { useStyles } from '../../Components/Style';
import { Typography, Container, CssBaseline, Grid, Button, Box, Card, CardContent } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonGreen } from '../../Components/ColorButtons';
import CardProject from './CardProjects.jsx';
import Navbar from '../../Components/Navbar.js';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';


function Projects(props) {
    const [group, setGroup] = useState({})
    const [user, setUser] = useState({})

    const { id } = props.match.params

    const [toAddProjects, setAddProjects] = useState(false)
    const owner = window.sessionStorage.getItem("username")

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

    useEffect(() => {
        getUser(owner)
            .then(resp => setUser(resp.message))
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


    function handleToProjects(type) {
        window.location.replace(`/groups/${id}/tools/${type}`)
    }

    function handleToEditProjectsChange() {
        if (toAddProjects) {
            setAddProjects(false)
        } else {
            setAddProjects(true)
        }
    }


    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
                                Projects
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
                    <Grid container spacing={4} alignItems='center'>
                        {group.projects && group.projects != 0 ? group.projects.map(project =>
                            <CardProject key={project.id} project={project} groupId={id} />
                        ) :
                            <Paper className={fixedHeightPaper}>
                                <Box mt={3} align='center'>
                                    <Typography variant="h6" color="textSecondary">
                                        You do not have any Projects.<br />
                                        Start adding!
                                    </Typography>
                                </Box>
                            </Paper>
                        }
                    </Grid>

                    <Box pt={5} align='center'>
                        {toAddProjects ?
                            <Paper className={fixedHeightPaper}>
                                <Box mt={3} align='center'>
                                    <Typography variant="h5" color="textPrimary">
                                        Project
                                    </Typography>
                                    <br />
                                    <ul className={classes.listItem}>
                                        {user.info ? user.info.map(i =>
                                            <ButtonGreen variant="contained" color="primary" className={classes.margin} onClick={handleToProjects.bind(null, i.type)}>
                                                {i.type}
                                            </ButtonGreen>
                                        ) : ""}
                                    </ul>
                                </Box>
                            </Paper> : ""}

                        <Box mt={3} align='center'>
                            <ButtonGreen variant="contained" color="primary" className={classes.margin} onClick={handleToEditProjectsChange}>
                                <i className="bi bi-person-plus-fill">&nbsp;&nbsp;</i>
                                {toAddProjects ? "" : "Add Project"}
                            </ButtonGreen>
                        </Box>
                    </Box>
                </Container>

                <Box pt={8}>
                    <Container maxWidth="xs">
                        <GoBack />
                    </Container>
                </Box>

                <Box pt={8}>
                    <Footer />
                </Box>
            </main>
        </div>
    )
}

export default Projects