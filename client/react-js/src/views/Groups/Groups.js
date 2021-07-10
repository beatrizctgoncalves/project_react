import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import { useStyles } from '../Components/Styles/Style';
import Footer from '../Components/Footer';
import { createGroup, deleteGroup, getSpecificGroup, getUserGroups } from '../Services/BasicService';
import { ToastContainer, toast } from 'react-toastify';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Components/Styles/Title';
import { ButtonGrey, ButtonRed } from '../Components/Styles/ColorButtons';
import GroupsMember from './GroupsMember';
import Navbar from '../Components/Navbar';
import GoBack from '../Components/GoBack';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


export default function Groups() {
    const [groups, setGroups] = useState([])
    const owner = window.sessionStorage.getItem("username")
    const [newGroup, setNewGroup] = useState({ owner: owner })

    useEffect(() => {
        getUserGroups(owner)
            .then(resp => setGroups(resp.message))
            .catch(err => {
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
    }, [owner])


    function handleGroupDelete(groupId) {
        deleteGroup(groupId)
            .then(resp => {
                let aux = groups.filter(group => {
                    if (group.id !== groupId) {
                        return group
                    } else {
                        return null
                    }
                })
                setGroups(aux)
            })
            .catch(err => {
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
    }

    function handleGroupCreate() {
        createGroup(newGroup)
            .then(resp => {
                getSpecificGroup(resp.message.id)
                    .then(group => setGroups([...groups,group.message]) )
            })
            .catch(err => {
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
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setNewGroup({ ...newGroup, [name]: value })
    }

    function handleEdit(id) {
        window.location.replace(`/groups/${id}/edit`)
    }

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />

            <ToastContainer />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        {/*Groups*/}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                <Title>Your Own Groups</Title>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Description</TableCell>
                                            <TableCell>View</TableCell>
                                            <TableCell align="right">Edit</TableCell>
                                            <TableCell align="right">Remove</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groups.map((group) =>
                                            <TableRow key={group.id}>
                                                <TableCell>
                                                    {group.name}
                                                </TableCell>
                                                <TableCell>
                                                    {group.description}
                                                </TableCell>
                                                <TableCell>
                                                    <Link color="inherit" href={`/groups/${group.id}`}>
                                                        <RemoveRedEye />
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <ButtonGrey variant="contained" onClick={handleEdit.bind(null, group.id)}>
                                                        <EditIcon />
                                                    </ButtonGrey>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <ButtonRed variant="contained" onClick={handleGroupDelete.bind(null, group.id)}>
                                                        <DeleteIcon />
                                                    </ButtonRed>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </Grid>

                        {/*Groups by Member*/}
                        <Grid item xs={12} md={8} lg={9}>
                            <Paper className={fixedHeightPaper}>
                                <GroupsMember />
                            </Paper>
                        </Grid>

                        {/*Create Group*/}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                                <Title>Create New Group</Title>
                                <br />
                                <input
                                    variant="outlined"
                                    margin="normal"
                                    className={classes.formControl}
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
                                    className={classes.formControl}
                                    required
                                    type="text"
                                    name="description"
                                    onChange={handleChange}
                                    placeholder="Enter Group Description"
                                />
                                <br />

                                <div>
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
                                </div>
                            </Paper>
                        </Grid>
                    </Grid>

                    <Box pt={8}>
                        <Container maxWidth="xs">
                            <GoBack />
                        </Container>
                    </Box>

                    <Box pt={8}>
                        <Footer />
                    </Box>
                </Container>
            </main>
        </div>
    );
}
