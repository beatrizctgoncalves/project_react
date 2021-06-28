import React, { useState, useEffect } from 'react';
import { getUser } from '../Services/BasicService.js';
import Footer from '../Components/Footer.js';
import GoBack from '../Components/GoBack';
import { useStyles } from '../Components/Style';
import { Typography, CardHeader, Card, CssBaseline, CardContent, Grid, Container, Button, Box } from '@material-ui/core';
import { toast } from 'react-toastify';


function UserProfile(props) {
    const [user, setUser] = useState({})
    const { username } = props.match.params

    useEffect(() => {
        getUser(username)
            .then(resp => setUser(resp.message))
            .catch(err => {
                console.log(err)
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
    }, [])

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">Profile of user {user.username}</h2>
                    <hr className="divider" />
                </div>
                <br />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card align="center">
                            <CardHeader
                                title={<img src={`${user.avatar}`} width="auto" height="150" className={classes.avatar}/>}
                                subheader={user.username}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                            />
                            <CardContent>
                                <Typography component="h2" variant="h4" color="textPrimary">
                                    {user.name} {user.surname}
                                </Typography>
                                <br />

                                <Typography variant="h5" color="primary">
                                    Additional Information
                                </Typography>

                                {user.info && user.info.length != 0 ? user.info.map(info => (
                                    <Box mt={2} key={info.AToken}>
                                        <Typography variant="h6" color="textSecondary">
                                            {info.type}
                                        </Typography>
                                    </Box>
                                )) :
                                    <Box mt={2}>
                                        <Typography variant="body1" color="textSecondary" align="center">
                                            This user does not have any additional <br /> information added yet!
                                        </Typography>
                                    </Box>
                                }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box mt={5}>
                    <GoBack />
                </Box>

                <Box mt={5}>
                    <br /><br />
                    <Footer />
                    <br />
                </Box>
            </div>
        </Container >
    )
}


export default UserProfile