import React, { useEffect, useState } from 'react'
import { addMemberToGroup, getSpecificGroup, removeMemberFromGroup } from '../Services/BasicService.js';
import Footer from '../Components/Footer';
import GoBack from '../Components/GoBack';
import { Container, CssBaseline, Grid, Box, TextField, Typography, Card, CardContent, CardActions, Button } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { useStyles } from '../Components/Styles/Style';
import { ButtonGreen } from '../Components/Styles/ColorButtons.js';
import Navbar from '../Components/Navbar.js';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import CardMembers from '../Components/Members/CardMembers.js';


function Members(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params

    const [toAddMembers, setAddMembers] = useState(false)
    const [newMember, setNewMember] = useState("")
    const username = window.sessionStorage.getItem("username")

    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
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
    }, [id])


    const handleMember = event => {
        setNewMember(event.target.value)
    }

    function handleToEditMembersChange() {
        if (toAddMembers) {
            setAddMembers(false)
        } else {
            setAddMembers(true)
        }
    }

    function handleAddMembers() {
        addMemberToGroup(id, newMember)
            .then(resp => {
                getSpecificGroup(id)
                    .then(groupObj => {
                        let aux = groupObj.message
                        setGroup(aux)
                        setAddMembers(false)
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

    function handleMemberDelete(m) {
        removeMemberFromGroup(group.id, m)
            .then(resp => {
                let aux = group
                aux.members = aux.members.filter(member => {
                    if (member !== m) {
                        return member
                    } else {
                        return null
                    }
                })
                setGroup({...aux})
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


    function handleUserProfile(member) {
        window.location.replace(`/profile/${member}`)
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Navbar />

            <ToastContainer />

            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="sm" component="main" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h3" align="center" color="textPrimary">
                                Members
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h5" align="center" color="textSecondary" component="p">
                                {group.name}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>

                <Container maxWidth="md" component="main">
                    <Grid container spacing={4} justify='center'>
                        {group.members && group.members.length !== 0 ? group.members.map(member =>
                            <Grid item xs={12} sm={6} md={4} key={member}>
                                <Card className={classes.card}>
                                    <CardMembers member={member} />
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={handleUserProfile.bind(null, member)}>
                                            View
                                        </Button>
                                        {group.owner === username ?
                                            <>
                                                {member !== group.owner ?
                                                    <Button size="small" color="secondary" onClick={handleMemberDelete.bind(null, member)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                    : ''}
                                            </>
                                            : ''}
                                    </CardActions>
                                </Card>
                            </Grid>
                        ) :
                            <div className={classes.cardGroup}>
                                <Grid item xs={12}>
                                    <Card align="center">
                                        <CardContent className={classes.cardHeader}>
                                            <Typography variant="h6" color="textSecondary">
                                                You do not have any Members.<br />
                                                Start adding!
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </div>
                        }
                    </Grid>

                    {group.owner === username ?
                        <Box pt={5} align='center'>
                            {toAddMembers ?
                                <Card>
                                    <Box mt={3} align='center'>
                                        <Typography variant="h5" color="textPrimary">
                                            Insert New Member
                                        </Typography>
                                        <br />
                                        <Grid item xs={6} align='center'>
                                            <TextField
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                type="text"
                                                name="newMember"
                                                className="form-control"
                                                placeholder="Enter new Member"
                                                value={newMember}
                                                onChange={handleMember}
                                            />
                                        </Grid>
                                        <br />

                                        <ButtonGreen
                                            variant="contained"
                                            className={classes.margin}
                                            onClick={handleAddMembers}
                                        >
                                            Add Member
                                        </ButtonGreen>
                                    </Box>
                                    <br />
                                </Card> : ""}

                            <Box mt={3} align='center'>
                                <ButtonGreen variant="contained" color="primary" className={classes.margin} onClick={handleToEditMembersChange}>
                                    <AddIcon />
                                    {toAddMembers ? "" : "Add Members"}
                                </ButtonGreen>
                            </Box>
                        </Box>
                        : ''}
                </Container>

                <Box pt={8}>
                    <Container maxWidth="xs">
                        <GoBack />
                    </Container>
                </Box>

                <Box pt={8}>
                    <Footer />
                </Box>
            </main>
        </div>
    )
}

export default Members