import React, { useState } from 'react'
import { removeProjectFromGroup } from '../../Services/BasicService.js';
import { useStyles } from '../../Components/Style';
import { Typography, CardHeader, Card, CardContent, Grid } from '@material-ui/core';
import { ButtonRed } from '../../Components/ColorButtons';
import { ToastContainer, toast } from 'react-toastify';


function GridProject(props) {
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
    }

    const classes = useStyles();

    return (
        <Grid item xs={4} key={project.id}>
            <ToastContainer/>
            
            <Card align="center">
                <CardHeader
                    title={project.title}
                    key={project.id}
                    titleTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                />

                <CardContent>
                    <div className={classes.cardGroup} key={project.id}>
                        <ul className={classes.listItem}>
                            <Typography variant="body1" color='primary'>
                                Type
                            </Typography>

                            <div>
                                <ul className={classes.listItem} key={project.id}>
                                    <Typography variant="body2" color="textSecondary">
                                        {project.type}
                                    </Typography>
                                </ul>
                            </div>
                        </ul>

                        <ul className={classes.listItem}>
                            <Typography variant="body1" color='primary'>
                                Owner
                            </Typography>

                            <div>
                                <ul className={classes.listItem} key={project.id}>
                                    <Typography variant="body2" color="textSecondary">
                                        {project.owner_name}
                                    </Typography>
                                </ul>
                            </div>
                        </ul>
                    </div>

                    <ButtonRed variant="contained" onClick={handleProjectDelete.bind(null, project.id)}>
                        <i className="bi bi-trash-fill"></i>
                    </ButtonRed>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default GridProject