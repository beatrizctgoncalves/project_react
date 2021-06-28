import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer.js';
import { Link } from 'react-router-dom';
import { createGroup, deleteGroup, getSpecificGroup, getUserGroups } from '../Services/BasicService';
import { Button, Container, CssBaseline, Grid, Typography, Box, Card, CardHeader } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoBack from '../Components/GoBack';
import { ButtonGrey, ButtonRed } from '../Components/ColorButtons';
import { useStyles } from '../Components/Style';


function Groups() {
    const [groups, setGroups] = useState([])
    const [edit, setEdit] = useState(false)

    const [toCreate, setToCreate] = useState(false)

    const owner = window.sessionStorage.getItem("username")
    const [newGroup, setNewGroup] = useState({ owner: owner })
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    useEffect(() => {
        getUserGroups(owner)
            .then(resp => setGroups(resp.message))
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
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

    function handleGroupDelete(groupId) {
        deleteGroup(groupId)
            .then(resp => {
                let aux = groups.filter(group => {
                    if (group.id !== groupId) {
                        return group
                    }
                })
                setGroups(aux)
                setEdit(false)
            })
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
            })
    }

    function handleGroupCreate() {
        createGroup(newGroup)
            .then(resp => {
                getSpecificGroup(resp.message.id)
                    .then(group => {
                        let aux = groups
                        aux.push(group.message)
                        setGroups(aux)
                        setToCreate(false)
                    })
            })
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
                toast.error(err.body)
            })
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setNewGroup({ ...newGroup, [name]: value })
    }

    function handleToCreate() {
        if (toCreate) {
            setToCreate(false)
        }
        else {
            setToCreate(true)
        }
    }

    function handleEdit(id) {
        window.location.replace(`/groups/${id}/edit`)
    }


    const classes = useStyles();

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">Your Groups</h2>
                    <hr className="divider" />
                </div>
                <ToastContainer />
                <br />

                <Grid container spacing={3} justify='center'>
                    {groups ? groups.map(group => {
                        return (
                            <Grid item xs={4} key={group.id}>
                                <Card align="center">
                                    <CardHeader
                                        subheader={<Link color="inherit" to={`/groups/${group.id}`}>{group.name}</Link>}
                                        subheaderTypographyProps={{ align: 'center' }}
                                        className={classes.cardHeader}
                                    />
                                    <Box mt={1}>
                                        <ButtonGrey variant="contained" className={classes.margin} onClick={handleEdit.bind(null, group.id)}>
                                            <Typography variant="body2">
                                                <i className="bi bi-pencil-fill"></i>
                                            </Typography>
                                        </ButtonGrey>
                                        <ButtonRed variant="contained" className={classes.margin} onClick={handleGroupDelete.bind(null, group.id)}>
                                            <Typography variant="body2">
                                                <i className="bi bi-trash-fill"></i>
                                            </Typography>
                                        </ButtonRed>
                                    </Box>
                                    <Box mt={1}></Box>
                                </Card>
                            </Grid>
                        )
                    }) : ""}
                </Grid>

                <br />
                <Grid container spacing={3} justify='center'>
                    <Grid item xs={12} md={6}>
                        {toCreate ?
                            <Box mt={5} align='center'>
                                <h3 className="h4 mb-2">Create New Group</h3>
                                <br />
                                <input
                                    variant="outlined"
                                    margin="normal"
                                    className="form-control"
                                    required
                                    type="text"
                                    name="name"
                                    placeholder="Enter Group Name"
                                    onChange={handleChange}
                                />
                                <br />
                                <input
                                    variant="outlined"
                                    margin="normal"
                                    className="form-control"
                                    required
                                    type="text"
                                    name="description"
                                    onChange={handleChange}
                                    placeholder="Enter Group Description"
                                />
                                <br /><br />

                                <Button
                                    type="button"
                                    className="button1"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={handleGroupCreate}
                                >
                                    Create Group
                                </Button>
                            </Box>
                            : ""}
                        <Box mt={4} align='center'>
                            <br />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={handleToCreate}
                            >
                                <i className="bi bi-plus-circle-fill">&nbsp;&nbsp;</i>
                                {toCreate ? "" : "Create Group"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>

                <Box mt={4}>
                    <br /><br />
                    <GoBack />
                </Box>

                <Box mt={8}>
                    <Footer />
                </Box>
            </div>
        </Container >
    )
}

export default Groups;