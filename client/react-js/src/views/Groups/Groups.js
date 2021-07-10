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
import { ButtonRed } from '../Components/Styles/ColorButtons';
import GroupsMember from './GroupsMember';
import Navbar from '../Components/Navbar';
import GoBack from '../Components/GoBack';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';


export default function Groups() {
    const [groups, setGroups] = useState([])
    const owner = window.sessionStorage.getItem("username")
    const [newGroup, setNewGroup] = useState({ owner: owner })
    const [toCreateGroup, setCreateGroup] = useState(false)

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


    function handleCreateChange() {
        if (toCreateGroup) {
            setCreateGroup(false)
        } else {
            setCreateGroup(true)
        }
    }

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
                    .then(group => {
                        setGroups([...groups, group.message])
                    })
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
                                        <TableRow color='primary'>
                                            <TableCell align="center">Name</TableCell>
                                            <TableCell align="center">Members</TableCell>
                                            <TableCell align="center">Projects</TableCell>
                                            <TableCell align="center">Sprints</TableCell>
                                            <TableCell align="center">Tasks</TableCell>
                                            <TableCell align="center">Edit</TableCell>
                                            <TableCell align="center">Remove</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groups.map(group =>
                                            <TableRow key={group.id}>
                                                <TableCell align="center">
                                                    <Link color="primary" href={`/groups/${group.id}`}>
                                                        {group.name}
                                                    </Link>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {group.members.length}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {group.projects.length}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {group.sprints.length}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {group.tasks.length}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Button onClick={handleEdit.bind(null, group.id)}>
                                                        <EditIcon />
                                                    </Button>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <ButtonRed onClick={handleGroupDelete.bind(null, group.id)}>
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
                            {toCreateGroup ?
                                <Paper className={fixedHeightPaper}>
                                    <Box align='center'>
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
                                                Save
                                            </Button>
                                        </div>
                                    </Box>
                                </Paper>
                                : ""}

                            <Box mt={2} align='center'>
                                <Button variant="contained" color="primary" className={classes.margin} onClick={handleCreateChange}>
                                    {toCreateGroup ? "-" : "Create Group"}
                                </Button>
                            </Box>
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
