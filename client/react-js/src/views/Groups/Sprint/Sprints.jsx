import React, { useEffect, useState } from 'react'
import { addSprintToGroup, getSpecificGroup } from '../../Services/BasicService.js';
import Footer from '../../Components/Footer';
import GoBack from '../../Components/GoBack';
import { useStyles } from '../../Components/Style';
import { Typography, Container, Card, CardContent, CssBaseline, Grid, Button, Box, TextField } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonGreen } from '../../Components/ColorButtons';
import CardSprint from './CardSprint.jsx';


function Sprint(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const [toAddSprints, setAddSprints] = useState(false)
    const [newSprint, setNewSprint] = useState("")

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
                        setGroup(aux)
                        setAddSprints(false)
                    })
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">{group.name}</h2>
                    <hr className="divider" />
                </div>
                <ToastContainer />
                <br />

                <Grid container spacing={2} justify='center'>
                    {group.sprints && group.sprints != 0 ? group.sprints.map(sprint =>
                        <CardSprint key={sprint.title} sprint={sprint} />
                    ) :
                        <div className={classes.cardGroup}>
                            <Grid item xs={12}>
                                <Card align="center">
                                    <CardContent className={classes.cardHeader}>
                                        <Typography variant="h6" color="textSecondary">
                                            You do not have any Sprints.<br />
                                            Start adding!
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </div>
                    }
                </Grid>

                <Box mt={6} align='center'>
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

                    <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditSprintsChange}>
                        <i className="bi bi-plus-lg">&nbsp;&nbsp;</i>
                        {toAddSprints ? "" : "Add Sprint"}
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


export default Sprint;