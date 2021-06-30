import React, { useState } from 'react'
import { addProjectToGroup } from '../../Services/BasicService.js';
import { useStyles } from '../../Components/Style';
import { Typography, CardMedia, CardActions, Card, CardContent, Grid } from '@material-ui/core';
import { ButtonGreen } from '../../Components/ColorButtons';
import { toast } from 'react-toastify';


function CardTools(props) {
    const { project, group, tool } = props

    function handleAddProjectToGroup(projId) {
        const user_index = group.projects.findIndex(p => p.id === projId)
        if (user_index === -1) {
            addProjectToGroup(group.id, projId, tool)
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
        } else {
            toast("this project already exists", {
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
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
                    <ButtonGreen size="small" color="primary" onClick={handleAddProjectToGroup.bind(null, project.id)}>
                        <Typography variant="body2">
                            <i className="bi bi-plus-lg"></i>
                        </Typography>
                    </ButtonGreen>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default CardTools