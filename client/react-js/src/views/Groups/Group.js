import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { ToastContainer } from 'react-toastify';
import { useStyles } from '../Components/Styles/Style';
import Footer from '../Components/Footer';
import { getSpecificGroup } from '../Services/BasicService';
import { toast } from 'react-toastify';
import { ButtonLime } from '../Components/Styles/ColorButtons';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import GoBack from '../Components/GoBack';


export default function Group(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params

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
    }, [id])


    function handleToSprints() {
        window.location.replace(`/groups/${group.id}/sprints`)
    }

    function handleToTasks() {
        window.location.replace(`/groups/${group.id}/tasks`)
    }

    function handleToMembers() {
        window.location.replace(`/groups/${group.id}/members`)
    }

    function handleToProjects() {
        window.location.replace(`/groups/${group.id}/projects`)
    }

    function handleToRankings() {
        window.location.replace(`/groups/${id}/rankings`)
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
                    <Grid container spacing={3} justify='center'>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h3" align="center" color="textPrimary">
                                {group.name}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h5" align="center" color="textSecondary" component="p">
                                {group.description}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" align="center" component="p">
                                The owner of this group is {group.owner}.
                                <br />Check your group's Rankings!
                            </Typography>
                        </Grid>

                        <Grid item xs={12} align='center'>
                            <ButtonLime onClick={handleToRankings}>
                                <EmojiEventsIcon />
                                Rankings
                            </ButtonLime>
                        </Grid>
                    </Grid>
                </Container>

                <Container maxWidth="lg" component="main">
                    <br />
                    <Grid container spacing={3} alignItems="flex-end" justify="center">
                        <Grid item xs={12} md={3}>
                            <Card>
                                <CardHeader
                                    title={'Members'}
                                    titleTypographyProps={{ align: 'center' }}
                                    className={classes.cardHeader}
                                />

                                <CardContent>
                                    <Grid item xs={12} align='center'>
                                        {group.members && group.members !== 0 ? group.members.map((member) => (
                                            <Typography variant="h6" color="textSecondary" key={member}>
                                                {member}
                                            </Typography>
                                        )) : ""}
                                    </Grid>
                                </CardContent>

                                <CardActions>
                                    <Button fullWidth color="primary" onClick={handleToMembers}>
                                        See More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Card>
                                <CardHeader
                                    title={'Projects'}
                                    titleTypographyProps={{ align: 'center' }}
                                    className={classes.cardHeader}
                                />

                                <CardContent>
                                    <Grid item xs={12} align='center'>
                                        {group.projects && group.projects !== 0 ? group.projects.map((project) => (
                                            <Typography variant="h6" color="textSecondary" key={project.id}>
                                                {project.title}
                                            </Typography>
                                        )) :
                                            <Typography variant="h6" color="textSecondary">
                                                You do not have any Projects.
                                            </Typography>
                                        }
                                    </Grid>
                                </CardContent>

                                <CardActions>
                                    <Button fullWidth color="primary" onClick={handleToProjects}>
                                        See More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Card>
                                <CardHeader
                                    title={'Sprints'}
                                    titleTypographyProps={{ align: 'center' }}
                                    className={classes.cardHeader}
                                />

                                <CardContent>
                                    <Grid item xs={12} align='center'>
                                        {group.sprints && group.sprints !== 0 ? group.sprints.map((sprint) => (
                                            <Typography variant="h6" color="textSecondary" key={sprint.title}>
                                                {sprint.title}
                                            </Typography>
                                        )) :
                                            <Typography variant="h6" color="textSecondary">
                                                You do not have any Sprints.
                                            </Typography>
                                        }
                                    </Grid>
                                </CardContent>

                                <CardActions>
                                    <Button fullWidth color="primary" onClick={handleToSprints}>
                                        See More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <Card>
                                <CardHeader
                                    title={'Tasks'}
                                    titleTypographyProps={{ align: 'center' }}
                                    className={classes.cardHeader}
                                />

                                <CardContent>
                                    <Grid item xs={12} align='center'>
                                        {group.tasks && group.tasks !== 0 ? group.tasks.map((task) => (
                                            <Typography variant="h6" color="textSecondary" key={task.title}>
                                                {task.title}
                                            </Typography>
                                        )) :
                                            <Typography variant="h6" color="textSecondary">
                                                You do not have any Tasks.
                                            </Typography>
                                        }
                                    </Grid>
                                </CardContent>

                                <CardActions>
                                    <Button fullWidth color="primary" onClick={handleToTasks}>
                                        See More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
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
    );
}