import React, { useEffect, useState } from 'react'
import { getUser, getSpecificGroup, removeProjectFromGroup } from '../../Services/BasicService.js';
import Footer from '../../Components/Footer';
import GoBack from '../../Components/GoBack';
import { useStyles } from '../../Components/Style';
import { Typography, CardHeader, Container, Card, CardContent, CssBaseline, Grid, Button, Box } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonGreen, ButtonRed } from '../../Components/ColorButtons';


function Projects(props) {
    const [group, setGroup] = useState({})
    const [user, setUser] = useState({})

    const { id } = props.match.params
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })
    const [edit, setEdit] = useState(false)

    const [toAddProjects, setAddProjects] = useState(false)
    const [newProject, setNewProject] = useState("")

    const owner = window.sessionStorage.getItem("username")

    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])

    useEffect(() => {
        getUser(owner)
            .then(resp => {
                setUser(resp.message)
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


    function handleProjectDelete(projectId) {
        removeProjectFromGroup(id, projectId)
            .then(resp => {
                let aux = group.projects.filter(project => {
                    if (project.id !== projectId) {
                        return project
                    }
                })
                setGroup(aux)
                setEdit(false)
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }

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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">{group.name}</h2>
                    <hr className="divider" />
                </div>
                <ToastContainer />
                <br />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card align="center">
                            <CardHeader
                                title={'Projects'}
                                titleTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                            />

                            <CardContent>
                                {group.projects ? group.projects.map(project =>
                                    <div className={classes.cardGroup} key={project.id}>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" color="textSecondary">
                                                {project.title}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <ButtonRed variant="contained" className={classes.margin} onClick={handleProjectDelete.bind(null, project.id)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </ButtonRed>
                                        </Grid>
                                    </div>
                                ) :
                                    <div className={classes.cardGroup}>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" color="textSecondary">
                                                You do not have any Projects!<br />
                                                Start adding!
                                            </Typography>
                                        </Grid>
                                    </div>
                                }
                            </CardContent>

                            <CardContent>
                                {toAddProjects ?
                                    <Box mt={4}>
                                        <h3 className="h4 mb-2">Projects</h3>
                                        <ul className={classes.listItem}>
                                            <div>
                                                {user.info ? user.info.map(i =>
                                                    <ul className={classes.listItem}>
                                                        <ButtonGreen variant="contained" color="primary" className={classes.margin} onClick={handleToProjects.bind(null, i.type)}>
                                                            {i.type}
                                                        </ButtonGreen>
                                                    </ul>
                                                ) : ""}
                                            </div>
                                        </ul>
                                    </Box> : ""}

                                <Box mt={4}>
                                    <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditProjectsChange}>
                                        <i className="bi bi-person-plus-fill">&nbsp;&nbsp;</i>
                                        {toAddProjects ? "" : "Add Projects"}
                                    </Button>
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

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