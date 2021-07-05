import React from "react"
import { addProjectToGroup } from '../../Services/BasicService';
import { toast } from 'react-toastify';
import { Typography, CardMedia, CardActions, Card, CardContent, Grid } from '@material-ui/core';
import { useStyles } from '../../Components/Style';
import { ButtonGreen } from "../../Components/ColorButtons";
import AddIcon from "@material-ui/icons/Add";


function ToolsProjects(props) {
    const { availableProjects, url, ownerCredentials, id, tool } = props

    function handleAddProjectToGroup(projId) {
        addProjectToGroup(id, projId, tool, url, ownerCredentials)
            .then(resp => {
                window.location.replace(`/groups/${id}`)
            })
            .catch(err => {
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
    }

    const classes = useStyles();

    return (
        <>
            <Grid container spacing={2} justify='center'>
                {availableProjects.length !== 0 ?
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h6" align="center" color="textPrimary">
                            Available Projects in {'tool'}
                        </Typography>
                    </Grid>
                    : ''}

                {availableProjects.length !== 0 ? availableProjects.map(project =>
                    <Grid item xs={6} key={project.id}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image={project.avatar ? project.avatar : "https://www.combr.com.br/wp-content/uploads/2016/08/img_ftp2.jpg"}
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="body1">
                                    {project.title}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <ButtonGreen size="small" color="primary" onClick={handleAddProjectToGroup.bind(null, project.id)}>
                                    <AddIcon />
                                </ButtonGreen>
                            </CardActions>
                        </Card>
                    </Grid>
                ) : ''}
            </Grid>
        </>
    )
}


export default ToolsProjects