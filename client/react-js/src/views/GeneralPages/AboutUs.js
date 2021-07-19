import React from 'react'
import Footer from '../Components/Footer.js';
import { Container, CssBaseline, Box, Grid, Typography } from '@material-ui/core';
import { useStyles } from '../Components/Styles/Style';
import Navbar from '../Components/Navbar.js';


function About() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="md" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} align='center'>
                            <Typography component="h1" variant="h3">
                                About Our Application
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" color="textSecondary">
                                This application focuses on collecting data from various APIs and turning them into scores.
                                To do this, a user first needs to create an account and login to access the features.
                                It should be noted that, with this, a user has access to their profile where they can edit
                                their personal information or view the profile of another user. <br /><br />

                                Then, focusing on the objective of gamifying application data, it is necessary for a user to
                                create a group and, after its creation, will be able to edit its name and description, add members,
                                projects, sprints, and manual tasks to it. Note that members of a group only have read permissions on that group. <br /><br />

                                To add a project the group owner needs to provide the necessary information, such as the project type,
                                its URL and its credentials. After the project is added the group members also need to add their information
                                to the project so that the application can gamify their work.

                                Additionally, it is allowed to update each user's credentials, however it is not possible to update a project URL,
                                as this would affect all the data saved so far.
                                To change the project URL it is recommended to delete the project in question and create another one. <br /><br />

                                Later, it will be necessary to create sprints since the counting of points is done by time periods (sprints).
                                To do this, the group owner needs a unique title and the start and end dates of the sprint.
                                Once you have the sprints created, you can view scores per sprint within a group. For each Issue created within the
                                sprint period and completed, 10 points will be credited to users who have been defined for that Issue. If an Issue
                                is finished after the allotted time, 5 points are deducted from the users responsible for that Issue. <br /><br />

                                Effectively, it is also allowed to manually add points to users, by creating a "Task" in the same way as a Sprint.
                                Once the "Task" has been created, it is necessary to add the members to that Task as well as the score.
                            </Typography>
                        </Grid>
                    </Grid>

                    <Box pt={8}>
                        <Footer />
                    </Box>
                </Container>
            </main>
        </div>
    )
}

export default About