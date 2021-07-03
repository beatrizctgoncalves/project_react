import React from 'react';
import Footer from '../Components/Footer.js';
import { Container, CssBaseline, Grid, Box, Link, Typography } from '@material-ui/core';
import { useStyles } from '../Components/Style';
import CardContact from '../Components/CardContact.js';
import Navbar from '../Components/Navbar.js';


function ContactUs() {
    const featuredPosts = [
        {
            id: 1,
            title: <Link href={`https://github.com/beatrizctgoncalves`}>Beatriz Gonçalves</Link>,
            icon: <img src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif" alt="Card cap 1" />,
            description: 'Engineering student at ISEL (Instituto Politécnico Engenharia de Lisboa)',
        },
        {
            id: 2,
            title: <Link href={`https://github.com/A44866`}>Maksym</Link>,
            icon: <img alt='contact card 2' src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif" />,
            description: 'Engineering student at ISEL (Instituto Politécnico Engenharia de Lisboa)',
        },
        {
            id: 3,
            title: <Link href={`https://github.com/pinto6`}>Miguel Pinto</Link>,
            icon: <img alt='contact card 3' src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif" />,
            description: 'Engineering student at ISEL (Instituto Politécnico Engenharia de Lisboa)',
        }
    ];

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h3" align="center" color="textPrimary">
                                Contacts
                            </Typography>
                        </Grid>

                        {featuredPosts.map((post) => (
                            <CardContact key={post.id} post={post} />
                        ))}
                    </Grid>

                    <Box pt={8}>
                        <Footer />
                    </Box>
                </Container>
            </main>
        </div>
    )
}

export default ContactUs