import React, { useEffect, useState } from 'react'
import { addTaskToGroup, getSpecificGroup, removeTaskFromGroup, updateTaskOfGroup } from '../Services/BasicService.js';
import Footer from '../Components/Footer';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Styles/Style';
import { Typography, Container, CssBaseline, Grid, Box, Card, TextField, CardHeader, CardContent, Button, CardActions } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonGreen } from '../Components/Styles/ColorButtons';
import Navbar from '../Components/Navbar.js';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';


function Task(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params
    const owner = window.sessionStorage.getItem("username")

    const [toAddTasks, setAddTasks] = useState(false)
    const [newTask, setNewTask] = useState("")
    const [updateTask, setUpdateTask] = useState({})
    const [toUpdateTasks, setUpdatedTasks] = useState(false)

    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => {
                setGroup(resp.message)
            })
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


    const handleTitle = event => {
        setNewTask({ ...newTask, title: event.target.value })
    }

    const handlePoints = event => {
        setNewTask({ ...newTask, points: event.target.value })
    }

    const handleBeginDate = event => {
        setNewTask({ ...newTask, date: event.target.value })
    }

    function handleToAddTasksChange() {
        if (toAddTasks) {
            setAddTasks(false)
        } else {
            setAddTasks(true)
        }
    }

    function handleAddTasks() {
        addTaskToGroup(id, newTask)
            .then(resp => {
                getSpecificGroup(id)
                    .then(groupObj => {
                        let aux = groupObj.message
                        setGroup(aux)
                        setAddTasks(false)
                    })
            })
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
    }

    const handleMemberChange = (event) => {
        setUpdateTask({ ...updateTask, member: event.target.value });
    };

    const handlePointsChange = (event) => {
        setUpdateTask({ ...updateTask, points: parseInt(event.target.value) });
    };

    function handleToEditTasksChange(title) {
        if (toUpdateTasks && title) {
            setUpdatedTasks(false)
        } else {
            setUpdatedTasks(true)
        }
    }

    function handleUpdateTask(title) {
        updateTaskOfGroup(group.id, { title: title, updatedInfo: updateTask })
            .then(resp => {
                getSpecificGroup(id)
                    .then(groupObj => {
                        let aux = groupObj.message
                        setGroup(aux)
                    })
            })
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
    }

    function handleTaskDelete(title) {
        removeTaskFromGroup(group.id, { title: title })
            .then(resp => {
                let aux = group
                aux.tasks = group.tasks.filter(task => {
                    if (task.title !== title) {
                        return task
                    } else {
                        return null
                    }
                })
                setGroup({ ...aux })
            })
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
    }

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
                                Tasks
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
                    <Grid container spacing={4} alignItems='center' justify='center'>
                        {group.tasks && group.tasks.length !== 0 ? group.tasks.map(task =>
                            <Grid item xs={12} sm={6} md={4} key={task.title}>
                                <Card className={classes.card}>
                                    <CardHeader
                                        subheader={task.title}
                                        subheaderTypographyProps={{ align: 'center' }}
                                        className={classes.cardHeader}
                                    />

                                    <CardContent>
                                        <Box align='center'>
                                            <div className={classes.cardGroup}>
                                                <ul className={classes.listItem}>
                                                    <Typography variant="body1" color='primary'>
                                                        Date:
                                                    </Typography>

                                                    <div>
                                                        <ul className={classes.listItem}>
                                                            <Typography variant="body2" color="textSecondary">
                                                                {task.date}
                                                            </Typography>
                                                        </ul>
                                                    </div>
                                                </ul>

                                                <Typography variant="body1" color="primary">
                                                    This Task gives you {task.points} points!
                                                </Typography>
                                                <br />

                                                {task.members && task.members.length !== 0 ? task.members.map(member =>
                                                    <Typography variant="body1" color="primary" key={member}>
                                                        Task done by {member}
                                                    </Typography>
                                                ) :
                                                    <Typography variant="body2">
                                                        This task does not have any assigned users.
                                                    </Typography>
                                                }
                                            </div>
                                        </Box>
                                    </CardContent>
                                    {owner === group.owner ?
                                        <>
                                            {toUpdateTasks ?
                                                <>
                                                    <Box mt={0} align='center'>
                                                        <Grid item xs={6} align='center'>
                                                            <TextField
                                                                type="text"
                                                                id="member"
                                                                name="member"
                                                                label="Member"
                                                                onChange={handleMemberChange}
                                                            />

                                                            <TextField
                                                                type="text"
                                                                id="pointsUpdated"
                                                                name="pointsUpdated"
                                                                label="Points"
                                                                onChange={handlePointsChange}
                                                            />

                                                            <br />
                                                            <Button size="small" type="submit" color="primary" onClick={handleUpdateTask.bind(null, task.title)} className={classes.button}>
                                                                Save
                                                            </Button>
                                                        </Grid>
                                                    </Box>
                                                    <br />
                                                </>
                                                : ""}
                                            <CardActions>
                                                <Grid item xs={12} align='left'>
                                                    <Button size="small" color="primary" onClick={handleToEditTasksChange.bind(null, task.title)}>
                                                        {toUpdateTasks ? "-" : "Update"}
                                                    </Button>
                                                </Grid>
                                                <Button size="small" color="secondary" onClick={handleTaskDelete.bind(null, task.title)}>
                                                    <DeleteIcon />
                                                </Button>
                                            </CardActions>
                                        </>
                                        : ''}
                                </Card>
                            </Grid>
                        ) :
                            <Grid item xs={12}>
                                <Card>
                                    <Box mt={3} align='center'>
                                        <Typography variant="h6" color="textSecondary">
                                            You do not have any Tasks.<br />
                                            Start adding!
                                        </Typography>
                                        <br />
                                    </Box>
                                </Card>
                            </Grid>
                        }
                    </Grid>

                    {group.owner === owner ?
                        <Box pt={5} align='center'>
                            {toAddTasks ?
                                <Card>
                                    <Box mt={3} align='center'>
                                        <Grid container spacing={1} justify='center'>
                                            <Grid item xs={6}>
                                                <TextField
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    required
                                                    label="Title"
                                                    onChange={handleTitle}
                                                />
                                            </Grid>
                                            <br />

                                            <Grid item xs={6}>
                                                <TextField
                                                    type="text"
                                                    id="points"
                                                    name="points"
                                                    required
                                                    label="Points"
                                                    onChange={handlePoints}
                                                />
                                            </Grid>
                                        </Grid>

                                        <br /><br />
                                        <Grid container spacing={1} justify='center'>
                                            <Grid item xs={5}>
                                                <Typography variant="h6" color="textSecondary">
                                                    Date:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <input
                                                    type="date"
                                                    id="date"
                                                    name="date"
                                                    max="2050-12-31"
                                                    min="2020-06-27"
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    className="form-control"
                                                    placeholder="2021-06-10"
                                                    onChange={handleBeginDate}
                                                />
                                            </Grid>
                                        </Grid>

                                        <br />
                                        <ButtonGreen
                                            variant="contained"
                                            className={classes.margin}
                                            onClick={handleAddTasks}
                                        >
                                            Add Task
                                        </ButtonGreen>
                                    </Box>
                                    <br />
                                </Card> : ""}

                            <Box mt={3} align='center'>
                                <ButtonGreen variant="contained" color="primary" className={classes.margin} onClick={handleToAddTasksChange}>
                                    <AddIcon />
                                    {toAddTasks ? "" : "Add Task"}
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

export default Task