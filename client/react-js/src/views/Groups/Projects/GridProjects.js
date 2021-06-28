import React, { useState } from 'react'
import { removeProjectFromGroup } from '../../Services/BasicService.js';
import { useStyles } from '../../Components/Style';
import { Typography, CardHeader, Card, CardContent, Grid, Box } from '@material-ui/core';
import { ButtonRed } from '../../Components/ColorButtons';


function GridProject(props) {
    const { project, groupId } = props
    const [edit, setEdit] = useState(false)
    const [group, setGroup] = useState({})
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

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
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }

    const classes = useStyles();

    return (
        <Grid item xs={4} key={project.id}>
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