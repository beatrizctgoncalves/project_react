import React, { useState } from 'react'
import { useStyles } from '../../Components/Style';
import { Typography, CardHeader, Box, Card, CardContent, Grid, CardActions } from '@material-ui/core';
import { ButtonRed } from '../../Components/ColorButtons';
import { toast } from 'react-toastify';


function CardProject(props) {
    const { sprint, groupId, groupOwner } = props
    const [group, setGroup] = useState({})

    function handleSprintDelete(projectId) {
        //TODO
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
                        <div className={classes.cardGroup} key={sprint.id}>
                            <ul className={classes.listItem}>
                                <Typography variant="body1" color='primary'>
                                    Begin Date
                                </Typography>

                                <div>
                                    <ul className={classes.listItem} key={sprint.id}>
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
                                    <ul className={classes.listItem} key={sprint.id}>
                                        <Typography variant="body2" color="textSecondary">
                                            {sprint.endDate}
                                        </Typography>
                                    </ul>
                                </div>
                            </ul>
                        </div>
                    </Box>
                </CardContent>
                {group.owner == groupOwner ?
                    <CardActions>
                        <ButtonRed size="small" color="primary" onClick={handleSprintDelete.bind(null, sprint.id)}>
                            <Typography variant="body2">
                                <i className="bi bi-trash-fill"></i>
                            </Typography>
                        </ButtonRed>
                    </CardActions>
                    : ''}
            </Card>
        </Grid>
    )
}

export default CardProject