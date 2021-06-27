import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer.js';
import { Link } from 'react-router-dom';
import { createGroup, deleteGroup, getSpecificGroup, getUserGroups } from '../Services/BasicService';
import { Button, Container, CssBaseline, Grid, GridList, GridListTile, Box, Card, CardHeader, CardContent } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoBack from '../Components/GoBack';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { grey, purple } from '@material-ui/core/colors';


const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: grey[500],
        fontFamily: [
            "Merriweather Sans",
            '-apple-system',
            'BlinkMacSystemFont',
            "Segoe UI",
            'Roboto',
            "Helvetica Neue",
            'Arial',
            "Noto Sans",
            'sans-serif',
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
        ].join(','),
        '&:hover': {
            backgroundColor: grey[700],
        },
        margin: '4px'
    },
}))(Button);


const useStyles = makeStyles((theme) => ({
    gridList: {
        width: 1000,
        height: 300,
    },
    margin: {
        margin: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#274e81e1',
    },
    div: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
        fontSize: '20'
    }
}));

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
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">Your Groups</h2>
                    <hr className="divider" />
                </div>
                <ToastContainer/>
                 
                <br />

                <GridList cellHeight={160} className={classes.gridList} cols={5}>
                    {groups ? groups.map(group => {
                        return (
                            <GridListTile cols={1}>
                                <Card align="center">
                                    <CardHeader
                                        title={<Link color="inherit" to={`/groups/${group.id}`}>{group.name}</Link>}
                                        titleTypographyProps={{ align: 'center' }}
                                        className={classes.cardHeader}
                                    />
                                    <CardContent>
                                        <ColorButton variant="contained" color="primary" className={classes.margin} onClick={handleEdit.bind(null, group.id)}>
                                            <i className="bi bi-pencil-fill"></i>
                                        </ColorButton>
                                        <ColorButton variant="contained" color="primary" className={classes.margin} onClick={handleGroupDelete.bind(null, group.id)}>
                                            <i className="bi bi-trash-fill"></i>
                                        </ColorButton>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        )
                    }) : ""}
                </GridList>

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {toCreate ?
                            <Box mt={4} align='center'>
                                <h3 className="h4 mb-2">Create New Group</h3>
                                <br />
                                <input
                                    variant="outlined"
                                    margin="normal"
                                    className="form-control"
                                    required
                                    fullWidth
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
                                    fullWidth
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