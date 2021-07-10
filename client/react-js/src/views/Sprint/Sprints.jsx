import React, { useEffect, useState } from 'react'
import { addSprintToGroup, getSpecificGroup, removeSprintFromGroup } from '../Services/BasicService.js';
import Footer from '../Components/Footer';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Styles/Style';
import { Typography, Container, CssBaseline, Grid, Box, Card, CardContent, CardActions, TextField, CardHeader } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonGreen } from '../Components/Styles/ColorButtons';
import Navbar from '../Components/Navbar.js';
import AddIcon from '@material-ui/icons/Add';
import { ButtonRed } from '../Components/Styles/ColorButtons';
import DeleteIcon from '@material-ui/icons/Delete';


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

    function handleSprintDelete(title) {
        removeSprintFromGroup(group.id, { title: title })
            .then(resp => {
                let aux = group.sprints.filter(sprint => {
                    if (sprint.title !== title) {
                        return sprint
                    } else {
                        return null
                    }
                })
                setGroup(aux)
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
                        {group.sprints && group.sprints.length !== 0 ? group.sprints.map(sprint =>
                            <Grid item xs={12} sm={6} md={4} key={sprint.title}>
                                <Card className={classes.card}>
                                    <CardHeader
                                        subheader={sprint.title}
                                        subheaderTypographyProps={{ align: 'center' }}
                                        className={classes.cardHeader}
                                    />

                                    <CardContent>
                                        <Box align='center'>
                                            <div className={classes.cardGroup}>
                                                <ul className={classes.listItem}>
                                                    <Typography variant="body1" color='primary'>
                                                        Begin Date
                                                    </Typography>

                                                    <div>
                                                        <ul className={classes.listItem}>
                                                            <Typography variant="body2" color="textSecondary">
                                                                {sprint.beginDate}
                                                            </Typography>
                                                        </ul>
                                                    </div>
                                                </ul>

                                                <ul className={classes.listItem}>
                                                    <Typography variant="body1" color='primary'>
                                                        End Date
                                                    </Typography>

                                                    <div>
                                                        <ul className={classes.listItem}>
                                                            <Typography variant="body2" color="textSecondary">
                                                                {sprint.endDate}
                                                            </Typography>
                                                        </ul>
                                                    </div>
                                                </ul>
                                            </div>
                                        </Box>
                                    </CardContent>
                                    {owner === group.owner ?
                                        <CardActions>
                                            <ButtonRed size="small" color="primary" onClick={handleSprintDelete.bind(null, sprint.title)}>
                                                <DeleteIcon />
                                            </ButtonRed>
                                        </CardActions>
                                        : ''}
                                </Card>
                            </Grid>
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