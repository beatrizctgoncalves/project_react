import React from 'react';
import Footer from '../Components/Footer.js';
import { Container, CssBaseline, Grid, Box, Link } from '@material-ui/core';
import { useStyles } from '../Components/Style';
import CardContact from '../Components/CardContact.js';


function ContactUs() {
    const featuredPosts = [
        {
            title: <Link to={`https://github.com/beatrizctgoncalves`}>Beatriz Gonçalves</Link>,
            icon: <img className="card-img-top" src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif"
                alt="Card image cap"></img>,
            description: 'Engineering student at ISEL (Instituto Politécnico Engenharia de Lisboa)',
        },
        {
            title: <Link to={`https://github.com/A44866`}>Maksym</Link>,
            icon: <img className="card-img-top" src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif"
                alt="Card image cap"></img>,
            description: 'Engineering student at ISEL (Instituto Politécnico Engenharia de Lisboa)',
        },
        {
            title: <Link to={`https://github.com/pinto6`}>Miguel Pinto</Link>,
            icon: <img className="card-img-top" src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif"
                alt="Card image cap"></img>,
            description: 'Engineering student at ISEL (Instituto Politécnico Engenharia de Lisboa)',
        }
    ];

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-2">
                    <h2 className="text-center mt-0">Contact Us</h2>
                    <hr className="divider" />
                </div>
                <br />

                <main>
                    <Grid container spacing={4}>
                        {featuredPosts.map((post) => (
                            <CardContact key={post.title} post={post} />
                        ))}
                    </Grid>

                    <Box mt={8}>
                        <Footer />
                    </Box>
                </main>
            </div>
        </Container>
    )
}

export default ContactUs