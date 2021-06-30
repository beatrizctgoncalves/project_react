import React from 'react'
import { Typography, CardHeader, Card, Grid } from '@material-ui/core';
import { useStyles } from '../../Components/Style';
import { ButtonUser } from '../../Components/ColorButtons';


function CardRankings(props) {
    const { sprint } = props

    function handleUserProfile(member) {
        window.location.replace(`/profile/${member}`)
    }

    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardHeader
                    title={sprint.SprintTitle}
                    titleTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                />
                <Grid container align='center' justify='center'>
                    {sprint.Scores && sprint.Scores != 0 ? sprint.Scores.map(score =>
                        <Grid item xs={4} key={score.AppUsername}>
                            <ButtonUser gutterBottom variant="h5" component="h2" onClick={handleUserProfile.bind(null, score.AppUsername)}>
                                {score.AppUsername}
                            </ButtonUser>

                            <ul className={classes.listItem}>
                                <Typography variant="body2" color="textSecondary">
                                    {score.Points}
                                </Typography>
                            </ul>
                        </Grid>
                    ) : ''}
                </Grid>
            </Card>
        </Grid>
    )
}

export default CardRankings