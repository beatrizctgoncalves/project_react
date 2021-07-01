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
    const { availableProjects, id } = props
    const [group, setGroup] = useState({})

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
    }, [])


    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography component="h1" variant="h6" align="center" color="textPrimary">
                        Available Projects in {'tool'}
                    </Typography>
                    <Typography variant="body2" align="center" color="textSecondary" component="p">
                        You are adding this to {group.name}...
                    </Typography>
                </Grid>
            </Grid>

            <Grid container spacing={4} alignItems='center'>
                {availableProjects ? availableProjects.map(project =>
                    <CardTools key={project.id} project={project} group={group} tool={'Gitlab'} />
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
        </>
    )
}


export default ToolsProjects