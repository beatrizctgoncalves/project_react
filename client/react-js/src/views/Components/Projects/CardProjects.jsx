import React, { useState } from 'react'
import { removeProjectFromGroup } from '../../Services/BasicService';
import { useStyles } from '../Styles/Style';
import { Typography, CardMedia, CardActions, Card, CardContent, Grid, Box, Paper } from '@material-ui/core';
import { ButtonRed, ButtonGreen } from '../Styles/ColorButtons';
import { toast } from 'react-toastify';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { GitlabCredentialsMembers } from '../../Projects/Plugins/Gitlab';
import { JiraCredentialsMembers } from '../../Projects/Plugins/Jira';


function CardProject(props) {
    const { project, group, owner } = props
    const [groupUpdated, setGroup] = useState([])

    function handleProjectDelete(project) {
        const projectId = project.id
        removeProjectFromGroup(group.id, projectId, project.URL)
            .then(resp => {
                console.log(groupUpdated)
                let aux  = [...groupUpdated]
                console.log("1111111111")
                console.log(aux)
                console.log(aux.projects)
               aux.projects = aux.projects.filter(project => {
                    if (project.id !== projectId) {
                        return project
                    } else {
                        return null
                    }
                })
                console.log("22222222222222")
                console.log(aux)
                console.log(aux.projects)
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

    const [toAddMemberCredentials, setAddMemberCredentials] = useState(false)
    function handleAddCredentials() {
        if (toAddMemberCredentials) {
            setAddMemberCredentials(false)
        } else {
            setAddMemberCredentials(true)
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
                        {project.title}
                    </Typography>

                    <Typography gutterBottom variant="body1">
                        Owner's Credentials saved.
                    </Typography>

                    {project.memberCredentials.length !== 0 ?
                        <Typography gutterBottom variant="body2">
                            Member's Credentials saved.
                        </Typography>
                        :
                        <Typography gutterBottom variant="body2">
                            There is no Member's Credentials saved!
                        </Typography>
                    }
                </CardContent>

                {group.owner === owner ?
                    <CardActions>
                        <ButtonRed size="small" color="primary" onClick={handleProjectDelete.bind(null, project)}>
                            <DeleteIcon />
                        </ButtonRed>
                    </CardActions>
                    :
                    <>
                        {toAddMemberCredentials ?
                            <Paper>
                                <Box mt={2} align='center'>
                                    <br />
                                    <Typography variant="h6" color="textSecondary">
                                        Select one of these options
                                    </Typography>
                                    <br />
                                    <GitlabCredentialsMembers groupId={group.id} />
                                    <JiraCredentialsMembers groupId={group.id} />
                                </Box>
                                <br />
                            </Paper> : ""}
                        <CardActions>
                            <ButtonGreen size="small" color="primary" onClick={handleAddCredentials}>
                                {toAddMemberCredentials ? "" : <AddIcon></AddIcon>}
                            </ButtonGreen>
                        </CardActions>
                    </>
                }
            </Card >
        </Grid >
    )
}

export default CardProject