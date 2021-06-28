import React from 'react'
import { Grid, Typography, Card, CardContent, Box } from '@material-ui/core';
import { useStyles } from '../Components/Style';


function CardContact(props) {
    const { post } = props;
    const classes = useStyles();

    return (
        <Grid item xs={12} md={4}>
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
        </Grid>
    )
}

export default CardContact