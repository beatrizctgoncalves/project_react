import React, { useState } from 'react'
import { removeProjectFromGroup } from '../../Services/BasicService.js';
import { useStyles } from '../../Components/Style';
import { Typography, CardMedia, CardActions, Card, CardContent, Grid, Link } from '@material-ui/core';
import { ButtonRed, ButtonGreen } from '../../Components/ColorButtons';
import { toast } from 'react-toastify';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';


function CardProject(props) {
    const { project, group, owner } = props
    const [edit, setEdit] = useState(false)
    const [groupUpdated, setGroup] = useState({})
    const username = window.sessionStorage.getItem('username');

    function handleProjectDelete(project) {
        const projectId = project.id
        removeProjectFromGroup(group.id, projectId, project.url)
            .then(resp => {
                let aux = groupUpdated.projects.filter(project => {
                    if (project.id !== projectId) {
                        return project
                    } else {
                        return null
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

    const [toAddCredentials, setAddCredentials] = useState(false)
    function handleAddCredentials() {
        if (toAddCredentials) {
            setAddCredentials(false)
        } else {
            setAddCredentials(true)
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
                    <Typography gutterBottom variant="h5">
                        <Link href={`/groups/${group.id}/projects/${project.id}`}>
                            {project.title}
                        </Link>
                    </Typography>

                    <Typography gutterBottom variant="body1">
                        Owner's Credentials saved.
                    </Typography>

                    {project.memberCredentials ?
                        <Typography gutterBottom variant="body2">
                            Member's Credentials saved.
                        </Typography>
                        :
                        <Typography gutterBottom variant="body2">
                            There is no Member's Credentials saved!
                        </Typography>
                    }
                </CardContent>
                {/*TODO*/}
                {!project.memberCredentials && owner !== username && project.memberCredentials.AppUsername !== username ?
                    <CardActions>
                        <ButtonGreen size="small" color="primary" onClick={''}>
                            <AddIcon></AddIcon>
                        </ButtonGreen>
                    </CardActions>
                    : ''}
                {group.owner === owner ?
                    <CardActions>
                        <ButtonRed size="small" color="primary" onClick={handleProjectDelete.bind(null, project)}>
                            <DeleteIcon />
                        </ButtonRed>
                    </CardActions>
                    : ''}
            </Card>
        </Grid>
    )
}

export default CardProject