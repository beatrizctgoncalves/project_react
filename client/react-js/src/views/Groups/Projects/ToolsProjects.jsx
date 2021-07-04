import { useEffect, useState } from "react"
import { getSpecificGroup, addProjectToGroup } from '../../Services/BasicService';
import { toast } from 'react-toastify';
import { Typography, CardMedia, CardActions, Card, CardContent, Grid } from '@material-ui/core';
import { useStyles } from '../../Components/Style';
import { ButtonGreen } from "../../Components/ColorButtons";
import AddIcon from "@material-ui/icons/Add";


function ToolsProjects(props) {
    const { availableProjects, url, ownerCredentials, id, tool } = props
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
    }, [id])

    function handleAddProjectToGroup(projId) {
        addProjectToGroup(group.id, projId, tool, url, ownerCredentials)
            .then(resp => {
                window.location.replace(`/groups/${group.id}`)
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
                        <Typography variant="body2" align="center" color="textSecondary" component="p">
                            You are adding this to {group.name}...
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