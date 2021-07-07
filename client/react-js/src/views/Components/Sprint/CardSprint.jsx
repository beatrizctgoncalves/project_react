import React, { useState } from 'react'
import { useStyles } from '../Styles/Style';
import { Typography, CardHeader, Box, Card, CardContent, Grid, CardActions } from '@material-ui/core';
import { ButtonRed } from '../Styles/ColorButtons';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeSprintFromGroup } from '../../Services/BasicService';
import { toast } from 'react-toastify';


function CardSprint(props) {
    const { sprint, groupId, groupOwner } = props
    const owner = window.sessionStorage.getItem('username');
    const [groupUpdated, setGroup] = useState({})

    function handleSprintDelete(title) {
        removeSprintFromGroup(groupId, { title: title })
            .then(resp => {
                let aux = groupUpdated.sprints.filter(sprint => {
                    if (sprint.title !== title) {
                        return sprint
                    } else {
                        return null
                    }
                })
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

    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardHeader
                    subheader={sprint.title}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                />

                <CardContent>
                    <Box align='center'>
                        <div className={classes.cardGroup} key={sprint.title}>
                            <ul className={classes.listItem}>
                                <Typography variant="body1" color='primary'>
                                    Begin Date
                                </Typography>

                                <div>
                                    <ul className={classes.listItem} key={sprint.title}>
                                        <Typography variant="body2" color="textSecondary">
                                            {sprint.beginDate}
                                        </Typography>
                                    </ul>
                                </div>
                            </ul>

                            <ul className={classes.listItem}>
                                <Typography variant="body1" color='primary'>
                                    End Date
                                </Typography>

                                <div>
                                    <ul className={classes.listItem} key={sprint.title}>
                                        <Typography variant="body2" color="textSecondary">
                                            {sprint.endDate}
                                        </Typography>
                                    </ul>
                                </div>
                            </ul>
                        </div>
                    </Box>
                </CardContent>
                {owner === groupOwner ?
                    <CardActions>
                        <ButtonRed size="small" color="primary" onClick={handleSprintDelete.bind(null, sprint.title)}>
                            <DeleteIcon />
                        </ButtonRed>
                    </CardActions>
                    : ''}
            </Card>
        </Grid>
    )
}

export default CardSprint