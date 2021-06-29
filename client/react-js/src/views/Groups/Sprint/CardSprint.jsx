import React from 'react'
import { useStyles } from '../../Components/Style';
import { Typography, CardHeader, Card, CardContent, Grid } from '@material-ui/core';
import { ButtonRed } from '../../Components/ColorButtons';


function CardSprint(props) {
    const { sprint } = props
    
    const classes = useStyles();

    return (
        <Grid item xs={4} key={sprint.id}>
            <Card align="center">
                <CardHeader
                    subheader={sprint.title}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                />

                <CardContent>
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
                </CardContent>
            </Card>
        </Grid>
    )
}
    

export default CardSprint