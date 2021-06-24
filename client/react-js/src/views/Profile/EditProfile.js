import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, Box, CssBaseline } from '@material-ui/core';
import Footer from '../Components/Footer';
import Form from './FormProfile';
import { getUser, updateUserAvatar } from '../Services/BasicService.js';
import GoBack from '../Components/GoBack';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#274e81e1',
        alignItems: 'center'
    },
    div: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2)
    }
}));

function EditProfile() {
    const username = window.sessionStorage.getItem("username")
    const [user, setUser] = useState({})

    const [newAvatar, setNewAvatar] = useState("")
    const [toUpdateAvatar, setUpdatedAvatar] = useState(false)

    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    useEffect(() => {
        getUser(username)
            .then(resp => {
                setUser(resp.message[0])
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])

    function handleToEditAvatarChange() {
        if (toUpdateAvatar) {
            setUpdatedAvatar(false)
        } else {
            setUpdatedAvatar(true)
        }
    }

    function handleUpateAvatar() {
        updateUserAvatar(username, newAvatar)
            .then(resp => {
                user.avatar = newAvatar;
                setNewAvatar(user.avatar)
                setUpdatedAvatar(false)
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">Editing {username}...</h2>
                    <hr className="divider" />
                </div>

                {toUpdateAvatar ?
                    <div className="col mb-5">
                        <div className="card h-100">
                            <div className="card-body p-4">
                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                    <div className="text-center">
                                        <h3 className="h4 mb-2">Insert New Avatar</h3>
                                        <br />
                                        <input
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="text"
                                            name="newAvatar"
                                            className="form-control"
                                            placeholder="Enter A Link"
                                            value={newAvatar}
                                        />
                                        <br /><br />

                                        <Button
                                            type="button"
                                            className="button1"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={handleUpateAvatar}
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : ""}

                <div className="row justify-content-center">
                    <button className="btn btn-groups btn-xl" type="button" onClick={handleToEditAvatarChange}>
                        <img src={`${user.avatar}`}
                            width="auto" height="150" className={classes.avatar}></img>
                    </button>
                </div>

                <div className={classes.div}>
                    <Form />
                </div>
            </div>
            <Box mt={4}>
                <GoBack />
            </Box>
            <Box mt={5}>
                <br /><br />
                <Footer />
                <br />
            </Box>
        </Container>
    )
}


export default EditProfile