import React, { useEffect, useState } from 'react'
import { removeMemberFromGroup, getUser } from '../../Services/BasicService';
import { Typography, Button, CardMedia, CardActions, Card, CardContent, Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useStyles } from '../Styles/Style';
import DeleteIcon from '@material-ui/icons/Delete';


function CardMembers(props) {
    const { member, groupId, groupOwner } = props
    const username = window.sessionStorage.getItem("username")
    const [group, setGroup] = useState({})
    const [user, setUser] = useState({})

    useEffect(() => {
        getUser(member)
            .then(resp => setUser(resp.message))
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
    }, [member])


    function handleMemberDelete(memberId) {
        removeMemberFromGroup(groupId, memberId)
            .then(resp => {
                let aux = group.members.filter(member => {
                    if (member.id !== memberId) {
                        return member
                    } else {
                        return null
                    }
                })
                setGroup(aux)
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
        <>
            <CardMedia
                component="img"
                alt="Member"
                height="220"
                src={user.avatar}
                title="Contemplative Reptile"
            />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                    {user.name} {user.surname}
                </Typography>
                <Typography>
                    {member}
                </Typography>
            </CardContent>
        </>
    )
}

export default CardMembers