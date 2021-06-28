import React from 'react'
import Footer from '../Components/Footer.js';
import { Container, CssBaseline, Box, Grid } from '@material-ui/core';
import { useStyles } from '../Components/Style';
import CardAbout from '../Components/CardAbout.js';


function About() {
    const featuredPosts = [
        {
            title: 'Up to Date',
            icon: <i className="bi-check-circle-fill fs-1 text-primary"></i>,
            description: 'All dependencies are kept current to keep things fresh.',
        },
        {
            title: 'Responsive Design',
            icon: <i className="bi-laptop fs-1 text-primary"></i>,
            description: 'Our site  has a responsive mobile-first web application. Allows consulting information of various platforms!',
        },
        {
            title: 'Something',
            icon: <i className="bi-globe fs-1 text-primary"></i>,
            description: 'Something.',
        },
        {
            title: 'Something2',
            icon: <i className="bi-check-circle-fill fs-1 text-primary"></i>,
            description: 'Something.',
        }
    ];

    const classes = useStyles();

    return (
        <Container maxWidth="lg">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-2">
                    <h2 className="text-center mt-0">About Us</h2>
                    <hr className="divider" />
                </div>
                <br />

                <main>
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <CardAbout key={post.title} post={post} />
                        ))}
                    </Grid>

                    <Box mt={8}>
                        <Footer />
                    </Box>
                </main>
            </div>
        </Container >
    )
}

export default About