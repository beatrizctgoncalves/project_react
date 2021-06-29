import React, { useEffect, useState } from 'react'
import { addSprintToGroup, getSpecificGroup, getRankings } from '../../Services/BasicService.js';
import Footer from '../../Components/Footer';
import GoBack from '../../Components/GoBack';
import { useStyles } from '../../Components/Style';
import { Typography, CardHeader, Container, Card, CardContent, CssBaseline, Grid, Button, Box, TextField, Link } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonGreen } from '../../Components/ColorButtons';


function Sprint(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const [toAddSprints, setAddSprints] = useState(false)
    const [newSprint, setNewSprint] = useState("")
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
                                title={'Rankings'}
                                titleTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                            />

                            <CardContent>
                                {sprints ? sprints.map(sprint =>
                                    <div className={classes.cardGroup} key={sprint}>
                                        <Grid item xs={12}>
                                            <Typography variant="h5" color="primary">
                                                {sprint.SprintTitle}
                                            </Typography>
                                            <br />

                                            <Grid container spacing={4}>
                                                {sprint.Scores && sprint.Scores != 0 ? sprint.Scores.map(score =>
                                                    <Grid item xs={4}>
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
                                                            <Typography variant="h6" color="textSecondary">
                                                                This Group do not have any Scores.<br />
                                                                Start finishing Sprints!
                                                            </Typography>
                                                        </Grid>
                                                    </div>
                                                }
                                            </Grid>
                                        </Grid>
                                    </div>
                                ) :
                                    <div className={classes.cardGroup}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6" color="textSecondary">
                                                You do not have any Sprints.<br />
                                                Start adding!
                                            </Typography>
                                        </Grid>
                                    </div>
                                }
                            </CardContent>

                            <CardContent>
                                {toAddSprints ?
                                    <Box mt={0}>
                                        <h3 className="h4 mb-2">Insert New Sprint</h3>
                                        <br />

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

                                <Box mt={0}>
                                    <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditSprintsChange}>
                                        <i className="bi bi-plus-lg">&nbsp;&nbsp;</i>
                                        {toAddSprints ? "" : "Add Sprints"}
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


export default Sprint;