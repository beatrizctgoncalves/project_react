import React, { useState } from 'react'
import { removeProjectFromGroup } from '../../Services/BasicService.js';
import { useStyles } from '../../Components/Style';
import { Typography, CardMedia, CardActions, Card, CardContent, Grid } from '@material-ui/core';
import { ButtonRed } from '../../Components/ColorButtons';
import { toast } from 'react-toastify';


function CardProject(props) {
    const { project, groupId } = props
    const [edit, setEdit] = useState(false)
    const [group, setGroup] = useState({})

    function handleProjectDelete(projectId) {
        removeProjectFromGroup(groupId, projectId)
            .then(resp => {
                let aux = group.projects.filter(project => {
                    if (project.id !== projectId) {
                        return project
                    }
                })
                setGroup(aux)
                setEdit(false)
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
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={project.avatar ? project.avatar : "https://www.combr.com.br/wp-content/uploads/2016/08/img_ftp2.jpg"}
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {project.title}
                    </Typography>
                    <Typography>
                    </Typography>
                </CardContent>
                <CardActions>
                    <ButtonRed size="small" color="primary" onClick={handleProjectDelete.bind(null, project.id)}>
                        <Typography variant="body2">
                            <i className="bi bi-trash-fill"></i>
                        </Typography>
                    </ButtonRed>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default CardProject