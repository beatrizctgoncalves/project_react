import React, { useEffect, useState } from 'react'
import { getUser, getSpecificGroup } from '../../Services/BasicService.js';
import Footer from '../../Components/Footer';
import GoBack from '../../Components/GoBack';
import { useStyles } from '../../Components/Style';
import { Typography, Container, CssBaseline, Grid, Button, Box } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonGreen } from '../../Components/ColorButtons';
import GridProject from './GridProjects.js';


function Projects(props) {
    const [group, setGroup] = useState({})
    const [user, setUser] = useState({})

    const { id } = props.match.params
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const [toAddProjects, setAddProjects] = useState(false)
    const owner = window.sessionStorage.getItem("username")

    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])

    useEffect(() => {
        getUser(owner)
            .then(resp => setUser(resp.message))
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

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">{group.name} - Projects</h2>
                    <hr className="divider" />
                </div>
                <ToastContainer />
                <br />

                <Grid container spacing={3} justify='center'>
                    {group.projects && group.projects != 0 ? group.projects.map(project =>
                        <GridProject key={project.id} project={project} groupId={id} />
                    ) :
                        < div className={classes.cardGroup}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="textSecondary">
                                    You do not have any Projects.<br />
                                    Start adding!
                                </Typography>
                            </Grid>
                        </div>
                    }
                </Grid>

                <Box mt={8} align='center'>
                    {toAddProjects ?
                        <>
                            <h3 className="h4 mb-2">Projects</h3>
                            <ul className={classes.listItem}>
                                <div>
                                    {user.info ? user.info.map(i =>
                                        <ButtonGreen variant="contained" color="primary" className={classes.margin} onClick={handleToProjects.bind(null, i.type)}>
                                            {i.type}
                                        </ButtonGreen>
                                    ) : ""}
                                </div>
                            </ul>
                        </> : ""}

                    <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditProjectsChange}>
                        <i className="bi bi-person-plus-fill">&nbsp;&nbsp;</i>
                        {toAddProjects ? "" : "Add Project"}
                    </Button>
                </Box>

                <Box mt={5}>
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

export default Projects