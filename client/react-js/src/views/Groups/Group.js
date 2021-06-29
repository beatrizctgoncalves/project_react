import React, { useEffect, useState } from 'react'
import { addMemberToGroup, getSpecificGroup, getUser, addSprintToGroup } from '../Services/BasicService.js';
import Footer from '../Components/Footer.js';
import GoBack from '../Components/GoBack';
import { ButtonGreen, ButtonLime } from '../Components/ColorButtons';
import { Link } from 'react-router-dom';
import { useStyles } from '../Components/Style';
import { ToastContainer, toast } from 'react-toastify';
import { Typography, CardHeader, Container, Card, CardContent, CssBaseline, Grid, Button, Box, TextField } from '@material-ui/core';


function Group(props) {
    const [group, setGroup] = useState({})
    const [user, setUser] = useState({})
    const { id } = props.match.params

    const [toAddMembers, setAddMembers] = useState(false)
    const [newMember, setNewMember] = useState("")

    const [toAddProjects, setAddProjects] = useState(false)

    const [toAddSprints, setAddSprints] = useState(false)
    const [newSprint, setNewSprint] = useState("")

    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const owner = window.sessionStorage.getItem("username")

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

    function handleToEditSprintsChange() {
        window.location.replace(`/groups/${group.id}/sprints`)
    }

    function handleToEditMembersChange() {
        window.location.replace(`/groups/${group.id}/members`)
    }

    function handleToEditProjectsChange() {
        window.location.replace(`/groups/${group.id}/projects`)
    }

    function handleToRankings() {
        window.location.replace(`/groups/${id}/rankings`)
    }

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">Your Group Details</h2>
                    <hr className="divider" />
                </div>
                <ToastContainer />
                <br />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card align="center">
                            <CardHeader
                                title={group.name}
                                subheader={<Link to={`/groups/${group.id}/edit`}><i className="bi bi-pencil-fill" /></Link>}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                            />
                            <CardContent>
                                <Typography component="h2" variant="h5" color="textPrimary">
                                    {group.description}
                                </Typography>
                                <br />

                                <div className={classes.cardGroup}>
                                    <Typography variant="h6" color="textSecondary">
                                        The Owner of this Group is {group.owner}.
                                    </Typography>
                                    <br />
                                </div>

                                <div className={classes.cardGroup}>
                                    <ul className={classes.listItem}>
                                        <Typography variant="body1">
                                            <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditMembersChange}>Members</Button>
                                        </Typography>

                                        <div>
                                            {group.members && group.members.length != 0 ? group.members.map((member) => (
                                                <ul className={classes.listItem} key={member}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {member}
                                                    </Typography>
                                                </ul>
                                            )) :
                                                <ul className={classes.listItem}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        You do not have any Members!
                                                    </Typography>
                                                </ul>
                                            }
                                        </div>
                                    </ul>

                                    <ul className={classes.listItem}>
                                        <Typography variant="body1">
                                            <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditProjectsChange}>Projects</Button>
                                        </Typography>

                                        <div>
                                            {group.projects && group.projects.length != 0 ? group.projects.map((project) => (
                                                <ul className={classes.listItem} key={project}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {project.title}
                                                    </Typography>
                                                </ul>
                                            )) :
                                                <ul className={classes.listItem}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        You do not have any Projects!
                                                    </Typography>
                                                </ul>
                                            }
                                        </div>
                                    </ul>
                                </div>

                                <ul className={classes.listItem}>
                                    <Typography variant="body1">
                                        <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditSprintsChange}>Sprints</Button>
                                    </Typography>

                                    <div>
                                        {group.sprints && group.sprints.length != 0 ? group.sprints.map((sprint) => (
                                            <ul className={classes.listItem} key={sprint}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {sprint.title}
                                                </Typography>
                                            </ul>
                                        )) :
                                            <ul className={classes.listItem}>
                                                <Typography variant="body2" color="textSecondary">
                                                    You do not have any Sprints!
                                                </Typography>
                                            </ul>
                                        }
                                    </div>
                                </ul>

                                <br />
                                <ButtonLime onClick={handleToRankings}>
                                    <i className="bi bi-trophy-fill">&nbsp;&nbsp;</i>
                                    Rankings
                                </ButtonLime>
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

export default Group