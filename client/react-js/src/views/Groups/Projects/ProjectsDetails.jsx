import React, { useEffect, useState } from 'react'
import { getSpecificGroup } from '../../Services/BasicService.js';
import Footer from '../../Components/Footer';
import GoBack from '../../Components/GoBack';
import { useStyles } from '../../Components/Style';
import { Typography, Container, CssBaseline, Grid, Box } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonGreen } from '../../Components/ColorButtons';
import CardProject from './CardProjects.jsx';
import Navbar from '../../Components/Navbar.js';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import { Gitlab } from './Plugins/Views';
import AddIcon from '@material-ui/icons/Add';


function ProjectsDetails(props) {
    const { id, projectId } = props.match.params
    const [group, setGroup] = useState({})
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
    }, [id])

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
                                Project Details
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h5" align="center" color="textSecondary" component="p">
                                {group.projects.find(p => p.id === projectId)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>

                <Container maxWidth="md" component="main">
                    <Grid container spacing={4} alignItems='center'>
                        {group.projects && group.projects !== 0 ? group.projects.map(project =>
                            <CardProject key={project.id} project={project} group={group} owner={owner} />
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

                    {group.owner === owner ?
                        <Box pt={5} align='center'>
                            {toAddProjects ?
                                <Paper>
                                    <Box mt={3} align='center'>
                                        <br />
                                        <Typography variant="h5" color="textSecondary">
                                            Select one of these options
                                        </Typography>
                                        <br />
                                        <Gitlab groupId={group.id} />
                                    </Box>
                                    <br />
                                </Paper> : ""}

                            <Box mt={3} align='center'>
                                <ButtonGreen variant="contained" color="primary" className={classes.margin} onClick={handleToEditProjectsChange}>
                                    <AddIcon />
                                    {toAddProjects ? "" : "Add Project"}
                                </ButtonGreen>
                            </Box>
                        </Box>
                        : ''}
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

export default ProjectsDetails