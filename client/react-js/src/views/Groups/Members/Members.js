import React, { useEffect, useState } from 'react'
import { addMemberToGroup, getSpecificGroup, removeMemberFromGroup } from '../../Services/BasicService.js';
import Footer from '../../Components/Footer';
import GoBack from '../../Components/GoBack';
import { Typography, CardHeader, Container, Card, CardContent, CssBaseline, Grid, Button, Box } from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import { useStyles } from '../../Components/Style';
import { ButtonRed, ButtonGreen, ButtonUser } from '../../Components/ColorButtons';


function Members(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })
    const [edit, setEdit] = useState(false)

    const [toAddMembers, setAddMembers] = useState(false)
    const [newMember, setNewMember] = useState("")

    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])


    function handleMemberDelete(member) {
        removeMemberFromGroup(id, member)
            .then(resp => {
                let aux = group.members.filter(m => {
                    if (m !== member) {
                        return m
                    }
                })
                setGroup(aux)
                setEdit(false)
            })
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
            })
    }

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

    function handleUserProfile(member) {
        window.location.replace(`/profile/${member}`)
    }


    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">{group.name}</h2>
                    <hr className="divider" />
                </div>
                <ToastContainer />
                <br />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card align="center">
                            <CardHeader
                                title={'Members'}
                                titleTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                            />

                            <CardContent>
                                {group.members ? group.members.map(member =>
                                    <div className={classes.cardGroup} key={member}>
                                        <Grid item xs={6}>
                                            <ButtonUser color="inherit" onClick={handleUserProfile.bind(null, member)}>
                                                {member}
                                            </ButtonUser>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <ButtonRed variant="contained" className={classes.margin} onClick={handleMemberDelete.bind(null, member)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </ButtonRed>
                                        </Grid>
                                    </div>
                                ) : ""}
                            </CardContent>

                            <CardContent>
                                {toAddMembers ?
                                    <Box mt={4}>
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

                                <Box mt={4}>
                                    <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditMembersChange}>
                                        <i className="bi bi-person-plus-fill">&nbsp;&nbsp;</i>
                                        {toAddMembers ? "" : "Add Members"}
                                    </Button>
                                </Box>

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

export default Members