import React, { useEffect, useState } from 'react'
import { addMemberToGroup, getSpecificGroup } from '../Services/BasicService.js';
import Footer from '../Components/Footer';
import GoBack from '../Components/GoBack';
import { Container, CssBaseline, Grid, Box, TextField, Typography, Card, CardContent } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { useStyles } from '../Components/Styles/Style';
import CardMembers from '../Components/Members/CardMembers';
import { ButtonGreen } from '../Components/Styles/ColorButtons.js';
import Navbar from '../Components/Navbar.js';
import AddIcon from '@material-ui/icons/Add';


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
                    <Grid container spacing={4}>
                        {group.members && group.members !== 0 ? group.members.map(member =>
                            <CardMembers key={member} member={member} groupId={id} groupOwner={group.owner} />
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