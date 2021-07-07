import React, { useEffect, useState } from 'react'
import { addSprintToGroup, getSpecificGroup } from '../Services/BasicService.js';
import Footer from '../Components/Footer';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Styles/Style';
import { Typography, Container, CssBaseline, Grid, Box } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonGreen } from '../Components/Styles/ColorButtons';
import CardSprint from '../Components/Sprint/CardSprint';
import Navbar from '../Components/Navbar.js';
import { TextField, Card } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';


function Sprint(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params
    const owner = window.sessionStorage.getItem("username")

    const [toAddSprints, setAddSprints] = useState(false)
    const [newSprint, setNewSprint] = useState("")

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
                                Sprints
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
                        {group.sprints && group.sprints !== 0 ? group.sprints.map(sprint =>
                            <CardSprint key={sprint.title} sprint={sprint} group={group} groupOwner={group.owner} />
                        ) :
                            <Grid item xs={12}>
                                <Card>
                                    <Box mt={3} align='center'>
                                        <Typography variant="h6" color="textSecondary">
                                            You do not have any Sprints.<br />
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
                            {toAddSprints ?
                                <Card>
                                    <Box mt={3} align='center'>
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
                                            <Grid item xs={5}>
                                                <input
                                                    type="date"
                                                    id="beginDate"
                                                    name="beginDate"
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

                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <Typography variant="h6" color="textSecondary">
                                                    End Date:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={5}>
                                                <input
                                                    type="date"
                                                    id="endDate"
                                                    name="endDate"
                                                    max="2050-12-31"
                                                    min="2020-06-27"
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
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
                                    </Box>
                                    <br />
                                </Card> : ""}

                            <Box mt={3} align='center'>
                                <ButtonGreen variant="contained" color="primary" className={classes.margin} onClick={handleToEditSprintsChange}>
                                    <AddIcon />
                                    {toAddSprints ? "" : "Add Sprint"}
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

export default Sprint