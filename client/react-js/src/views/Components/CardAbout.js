import React from 'react'
import { CardActionArea, Grid, Typography, Card, CardContent, Box } from '@material-ui/core';
import { useStyles } from '../Components/Style';


function CardAbout(props) {
    const { post } = props;
    const classes = useStyles();

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
                <Card className={classes.card}>
                    <div className={classes.cardDetails}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <Box mt={5}>
                                        <Typography component="h2" variant="h5" align='center'>
                                            {post.icon}
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <br />
                                    <CardContent>
                                        <Typography component="h2" variant="h5" color='primary'>
                                            {post.title}
                                        </Typography>

                                        <Typography variant="subtitle1" paragraph>
                                            {post.description}
                                        </Typography>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </div>
                </Card>
            </CardActionArea>
        </Grid>
    )
}

export default CardAbout
