import React, { useEffect, useState } from 'react'
import { removeMemberFromGroup, getUser } from '../../Services/BasicService.js';
import { Typography, CardHeader, Card, CardContent, Grid, Box } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { useStyles } from '../../Components/Style';
import { ButtonRed, ButtonUser } from '../../Components/ColorButtons';


function CardMembers(props) {
    const { member, groupId } = props
    const [edit, setEdit] = useState(false)

    const owner = window.sessionStorage.getItem("username")

    const [group, setGroup] = useState({})
    const [user, setUser] = useState({})

    useEffect(() => {
        getUser(member)
            .then(resp => setUser(resp.message))
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
    }, [])


    function handleMemberDelete(memberId) {
        removeMemberFromGroup(groupId, memberId)
            .then(resp => {
                let aux = group.members.filter(member => {
                    if (member.id !== memberId) {
                        return member
                    }
                })
                setGroup(aux)
                setEdit(false)
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


    function handleMemberDelete(member) {
        removeMemberFromGroup(groupId, member)
            .then(resp => {
                let aux = group
                aux.members = aux.members.filter(m => {
                    if (m !== member) {
                        return m
                    }
                })
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

    function handleUserProfile(member) {
        window.location.replace(`/profile/${member}`)
    }

    const classes = useStyles();

    return (
        <Grid item xs={4}>
            <ToastContainer />

            <Card align="center">
                <CardHeader
                    title={<img src={`${user.avatar}`} width="auto" height="90" className={classes.avatar}></img>}
                    subheader={<ButtonUser color="inherit" onClick={handleUserProfile.bind(null, user.username)}>{user.username}</ButtonUser>}
                    subheaderTypographyProps={{ align: 'center' }}
                    titleTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                />

                <CardContent>
                    <Typography component="h2" variant="h5" color="textPrimary">
                        {user.name} {user.surname}
                    </Typography>

                    <Box mt={2}>
                        {user.username != owner ?
                            <ButtonRed variant="contained" className={classes.margin} onClick={handleMemberDelete.bind(null, user.username)}>
                                <i className="bi bi-trash-fill"></i>
                            </ButtonRed>
                            : ""}
                    </Box>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default CardMembers