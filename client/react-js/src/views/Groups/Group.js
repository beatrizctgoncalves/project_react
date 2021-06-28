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

    const handleTitle = event => {
        setNewSprint({ ...newSprint, title: event.target.value })
    }

    const handleBeginDate = event => {
        setNewSprint({ ...newSprint, beginDate: event.target.value })
    }

    const handleEndDate = event => {
        setNewSprint({ ...newSprint, endDate: event.target.value })
    }

    function handleToEditSprintsChange() {
        if (toAddSprints) {
            setAddSprints(false)
        } else {
            setAddSprints(true)
        }
    }

    function handleAddSprints() {
        addSprintToGroup(id, newSprint)
            .then(resp => {
                getSpecificGroup(id)
                    .then(groupObj => {
                        let aux = groupObj.message
                        aux.sprints.push(newSprint)
                        setGroup(aux)
                        setAddSprints(false)
                    })
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }


    const handleMember = event => {
        setNewMember(event.target.value)
    }

    function handleToEditMembersChange() {
        if (toAddMembers) {
            setAddMembers(false)
        } else {
            console.log()
            setAddMembers(true)
        }
    }

    function handleAddMembers() {
        addMemberToGroup(id, newMember, group.owner)
            .then(resp => {
                setAddMembers(false)
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
    }


    function handleToEditProjectsChange() {
        if (toAddProjects) {
            setAddProjects(false)
        } else {
            setAddProjects(true)
            console.log(user)
        }
    }

    function handleToRankings() {
        window.location.replace(`/groups/${id}/rankings`)
    }

    function handleToProjects(type) {
        window.location.replace(`/groups/${id}/tools/${type}`)
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
                                            <Link to={`/groups/${group.id}/members`}>Members</Link>
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
                                            <Link to={`/groups/${group.id}/projects`}>Projects</Link>
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
                                        <Link to={`/groups/${group.id}/sprints`}>Sprints</Link>
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

                            <CardContent>
                                {toAddMembers ?
                                    <Box mt={0}>
                                        <h3 className="h4 mb-2">Insert New Members</h3>
                                        <br />
                                        <input
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="text"
                                            name="newMember"
                                            className="form-control"
                                            placeholder="Enter new Member"
                                            value={newMember}
                                            onChange={handleMember}
                                        />
                                        <br />
                                        <ButtonGreen
                                            className={classes.margin}
                                            onClick={handleAddMembers}
                                        >
                                            Add Member
                                        </ButtonGreen>
                                    </Box> : ""}
                                <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditMembersChange}>
                                    <i className="bi bi-person-plus-fill">&nbsp;&nbsp;</i>
                                    {toAddMembers ? "" : "Add Member"}
                                </Button>

                                {toAddProjects ?
                                    <Box mt={3}>
                                        <h3 className="h4 mb-2">Projects</h3>

                                        <div>
                                            <ul className={classes.listItem}>
                                                {user.info ? user.info.map(i =>
                                                    <ButtonGreen variant="contained" color="primary" className={classes.margin} onClick={handleToProjects.bind(null, i.type)}>
                                                        {i.type}
                                                    </ButtonGreen>
                                                ) :
                                                    <ul className={classes.listItem}>
                                                        <Typography variant="body2" color="textSecondary">
                                                            You do not have any Projects!
                                                        </Typography>
                                                    </ul>
                                                }
                                            </ul>
                                        </div>
                                    </Box>
                                    : ""}
                                <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditProjectsChange}>
                                    <i className="bi bi-patch-plus-fill">&nbsp;&nbsp;</i>
                                    {toAddProjects ? "" : "Add Project"}
                                </Button>


                                {toAddSprints ?
                                    <Box mt={4}>
                                        <h3 className="h4 mb-2">Insert New Sprint</h3>

                                        <Grid item xs={6} align='center'>
                                            <TextField
                                                type="text"
                                                id="title"
                                                name="title"
                                                required
                                                fullWidth
                                                label="Title"
                                                onChange={handleTitle}
                                            />
                                        </Grid>
                                        <br />

                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <Typography variant="h6" color="textSecondary">
                                                    Begin Date:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <input
                                                    type="date"
                                                    id="beginDate"
                                                    name="beginDate"
                                                    max="2050-12-31"
                                                    min="2020-06-27"
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    className="form-control"
                                                    placeholder="2021-06-10"
                                                    onChange={handleBeginDate}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <Typography variant="h6" color="textSecondary">
                                                    End Date:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <input
                                                    type="date"
                                                    id="endDate"
                                                    name="endDate"
                                                    max="2050-12-31"
                                                    min="2020-06-27"
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    className="form-control"
                                                    placeholder="2021-06-10"
                                                    onChange={handleEndDate}
                                                />
                                            </Grid>
                                        </Grid>

                                        <br />
                                        <ButtonGreen
                                            variant="contained"
                                            className={classes.margin}
                                            onClick={handleAddSprints}
                                        >
                                            Add Sprint
                                        </ButtonGreen>
                                    </Box> : ""}
                                <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditSprintsChange}>
                                    <i className="bi bi-list-check">&nbsp;&nbsp;</i>
                                    {toAddSprints ? "" : "Add Sprint"}
                                </Button>
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