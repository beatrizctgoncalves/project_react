import React, { useEffect, useState } from 'react'
import { addMemberToGroup, getSpecificGroup, removeMemberFromGroup } from '../../Services/BasicService.js';
import Footer from '../../Components/Footer';
import GoBack from '../../Components/GoBack';
import { Typography, CardHeader, Container, Card, CardContent, CssBaseline, Grid, Button, Box } from '@material-ui/core';
import { ToastContainer,toast } from 'react-toastify';
import { useStyles } from '../../Components/Style';
import { ButtonRed, ButtonGreen, ButtonUser } from '../../Components/ColorButtons';


function Members(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params
    
    

    const [toAddMembers, setAddMembers] = useState(false)
    const [newMember, setNewMember] = useState("")

    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
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
    }, [id])


    function handleMemberDelete(member) {
        removeMemberFromGroup(id, member)
            .then(resp => {
                let aux = group
                aux.members = aux.members.filter(m => {
                    if (m !== member) {
                        return m
                    }
                })
                console.log(aux)

                setGroup(...aux)
                
                
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
                        console.log(groupObj)
                        let aux = groupObj.message
                        console.log(aux)
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
                                {group.members && group.members != 0 ? group.members.map(member =>
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
                                ) :
                                    <div className={classes.cardGroup}>
                                        <Grid item xs={12}>
                                            <Typography variant="h6" color="textSecondary">
                                                You do not have any Members!<br />
                                                Start adding!
                                            </Typography>
                                        </Grid>
                                    </div>
                                }
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