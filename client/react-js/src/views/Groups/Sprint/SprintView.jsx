import React, { useEffect, useState } from 'react'
import { addSprintToGroup, getSpecificGroup, getRankings } from '../../Services/BasicService.js';
import Footer from '../../Components/Footer';
import GoBack from '../../Components/GoBack';
import { useStyles } from '../../Components/Style';
import { Typography, CardHeader, Container, Card, CardContent, CssBaseline, Grid, Button, Box, TextField } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { ButtonGreen } from '../../Components/ColorButtons';


function Sprint(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const [toAddSprints, setAddSprints] = useState(false)
    const [newSprint, setNewSprint] = useState("")
    const[sprints,setSprints] = useState([])

    useEffect(()=>{
        getRankings(id)
            .then(resp =>{
                setSprints(resp.message)
            }).catch(err => {
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



    },[])


    const handleTitle = event => {
        setNewSprint({...newSprint, title: event.target.value})
    }

    const handleBeginDate = event => {
        setNewSprint({...newSprint, beginDate: event.target.value})
    }

    const handleEndDate = event => {
        setNewSprint({...newSprint, endDate: event.target.value})
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
                getSpecificGroup(group.id)
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
                                            <Typography variant="h6" color="textSecondary">
                                                {sprint.SprintTitle}
                                                <br/>
                                                <ul>
                                                    {sprint.Scores && sprint.Scores != 0 ? sprint.Scores.map(score => {
                                                        console.log(score)
                                                        return(<li key = {score}>{score.AppUsername} = {score.Points}</li>)
                                                    }):"" }
                                                </ul>
                                            </Typography>
                                        </Grid>
                                    </div>
                                ) :
                                    <div className={classes.cardGroup}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6" color="textSecondary">
                                                You do not have any Sprints!<br />
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
                                                    min="2021-06-27"
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
                                                    min="2021-06-27"
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




/*const { id } = props.match.params
const [sprints, setSprints] = useState([])

useEffect(() => {
    getRankings(id)
        .then(resp => {
            setSprints(resp.message)
        }).catch(err => {
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


return(
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
                                <br /><br />
                            </div>

                            <div className={classes.cardGroup}>
                                <ul className={classes.listItem}>
                                    <Typography variant="body1">
                                        <Link to={`/groups/${group.id}/Sprints`}>Sprints</Link>
                                    </Typography>

                                    <div>
                                        {group.Sprints ? group.Sprints.map((Sprint) => (
                                            <ul className={classes.listItem} key={Sprint}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {Sprint}
                                                </Typography>
                                            </ul>
                                        )) : ""}
                                    </div>
                                </ul>

                                <ul className={classes.listItem}>
                                    <Typography variant="body1">
                                        <Link to={`/groups/${group.id}/projects`}>Projects</Link>
                                    </Typography>

                                    <div>
                                        {group.projects ? group.projects.map((project) => (
                                            <ul className={classes.listItem} key={project}>
                                                <Typography variant="body2" color="textSecondary">
                                                    {project.title}
                                                </Typography>
                                            </ul>
                                        )) : ""}
                                    </div>
                                </ul>
                            </div>

                            <ButtonLime className={classes.margin} onClick={handleSeeSprints}>
                                <i className="bi bi-trophy-fill">&nbsp;&nbsp;</i>
                                Rankings
                            </ButtonLime>
                        </CardContent>

                        <CardContent>
                            {toAddSprints ?
                                <Box mt={4}>
                                    <h3 className="h4 mb-2">Insert New Sprints</h3>
                                    <br />
                                    <input
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        type="text"
                                        name="newSprint"
                                        className="form-control"
                                        placeholder="Enter new Sprint"
                                        value={newSprint}
                                        onChange={handleSprint}
                                    />
                                    <br />
                                    <ButtonGreen
                                        className={classes.margin}
                                        onClick={handleAddSprints}
                                    >
                                        Add Sprint
                                    </ButtonGreen>
                                </Box> : ""}

                            <Box mt={0}>
                                <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditSprintsChange}>
                                    <i className="bi bi-person-plus-fill">&nbsp;&nbsp;</i>
                                    {toAddSprints ? "" : "Add Sprints"}
                                </Button>

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
                                <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditProjectsChange}>
                                    <i className="bi bi-patch-plus-fill">&nbsp;&nbsp;</i>
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
return (
    <div>
        <ToastContainer />
        <br />
        <br />
        <br />
        <br />
        <br />
        <ul>
            {sprints ? sprints.map(sprint => {
                console.log(sprint)

                return (
                    <li key={sprint}>
                        {sprint.SprintTitle}
                        <br />
                        <ul>
                            {sprint.Scores.map(score => {
                                console.log(score)
                                return (<li key={score}>{score.AppUsername} = {score.Points}</li>)
                            })}
                        </ul>
                    </li>)
            }) : "there is no sprints"}
        </ul>

    </div>
)
}*/


export default Sprint;