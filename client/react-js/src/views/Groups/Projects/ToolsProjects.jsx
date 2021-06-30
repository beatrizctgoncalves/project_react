import { useEffect, useState } from "react"
import { getToolProjects, getSpecificGroup } from '../../Services/BasicService';
import { ToastContainer, toast } from 'react-toastify';
import { Container, CssBaseline, Grid, Box, Typography, Paper } from '@material-ui/core';
import Footer from '../../Components/Footer.js';
import GoBack from '../../Components/GoBack';
import { useStyles } from '../../Components/Style';
import Navbar from "../../Components/Navbar";
import CardTools from "./CardTools";
import clsx from "clsx";


function ToolsProjects(props) {
    const owner = window.sessionStorage.getItem("username")
    const { tool } = props.match.params
    const { id } = props.match.params
    const [availableProjects, setavailableProjects] = useState([])
    const [group, setGroup] = useState({})

    useEffect(() => {
        getToolProjects(tool, owner)
            .then(resp => {
                setavailableProjects(resp.message)
            })
            .catch(err => {
                console.log(err)
                toast.error(err.body, {
                    position: "top-left",
                    autoClose: 4000,
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


    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

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
                                Available Projects in {tool}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h5" align="center" color="textSecondary" component="p">
                                You are adding this to {group.name}...
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>

                <Container maxWidth="md" component="main">
                    <Grid container spacing={4} alignItems='center'>
                        {availableProjects ? availableProjects.map(project =>
                            <CardTools key={project.id} project={project} group={group} tool={tool} />
                        ) :
                            <Paper className={fixedHeightPaper}>
                                <Box mt={3} align='center'>
                                    <Typography variant="h6" color="textSecondary">
                                        Error!
                                    </Typography>
                                </Box>
                            </Paper>
                        }
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
    )
}


export default ToolsProjects