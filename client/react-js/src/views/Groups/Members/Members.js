import React, { useEffect, useState } from 'react'
import { addMemberToGroup, getSpecificGroup } from '../../Services/BasicService.js';
import Footer from '../../Components/Footer';
import GoBack from '../../Components/GoBack';
import { Container, CssBaseline, Grid, Box, Button, Typography } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { useStyles } from '../../Components/Style';
import CardMembers from './CardMembers.js';
import { ButtonGreen } from '../../Components/ColorButtons.js';


function Members(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const [toAddMembers, setAddMembers] = useState(false)
    const [newMember, setNewMember] = useState("")

    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])


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
                getSpecificGroup(group.id)
                    .then(groupObj => {
                        let aux = groupObj.message
                        aux.members.push(newMember)
                        setGroup(aux)
                        setAddMembers(false)
                    })
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }


    const classes = useStyles();

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">{group.name} - Members</h2>
                    <hr className="divider" />
                </div>
                <ToastContainer />
                <br />

                <Grid container spacing={3} justify='center'>
                    {group.members && group.members != 0 ? group.members.map(member =>
                        <CardMembers key={member} member={member} groupId={id} />
                    ) :
                        <div className={classes.cardGroup}>
                            <Grid item xs={12}>
                                <Typography variant="h6" color="textSecondary">
                                    You do not have any Members.<br />
                                    Start adding!
                                </Typography>
                            </Grid>
                        </div>
                    }
                </Grid>

                <Box mt={4} align='center'>
                    {toAddMembers ?
                        <Box mt={4} align='center'>
                            <h3 className="h4 mb-2">Insert New Members</h3>
                            <br />
                            <input
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
                            <br />
                            <ButtonGreen
                                variant="contained"
                                className={classes.margin}
                                onClick={handleAddMembers}
                            >
                                Add Member
                            </ButtonGreen>
                        </Box> : ""}

                    <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditMembersChange}>
                        <i className="bi bi-person-plus-fill">&nbsp;&nbsp;</i>
                        {toAddMembers ? "" : "Add Members"}
                    </Button>
                </Box>

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

export default Members