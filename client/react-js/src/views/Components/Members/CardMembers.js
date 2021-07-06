import React, { useEffect, useState } from 'react'
import { removeMemberFromGroup, getUser } from '../../Services/BasicService';
import { Typography, Button, CardMedia, CardActions, Card, CardContent, Grid } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useStyles } from '../Styles/Style';
import { ButtonRed } from '../Styles/ColorButtons';
import DeleteIcon from '@material-ui/icons/Delete';


function CardMembers(props) {
    const { member, groupId, groupOwner } = props
    const [edit, setEdit] = useState(false)

    const username = window.sessionStorage.getItem("username")

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


    function handleUserProfile(member) {
        window.location.replace(`/profile/${member}`)
    }

    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardMedia
                    className={classes.cardMedia}
                    image={user.avatar}
                    title="Image title"
                />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {user.name} {user.surname}
                    </Typography>
                    <Typography>
                        {member}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" onClick={handleUserProfile.bind(null, member)}>
                        View
                    </Button>
                    {groupOwner !== username ?
                        <ButtonRed size="small" color="primary" onClick={handleMemberDelete.bind(null, member)}>
                            <DeleteIcon />
                        </ButtonRed>
                        : ''}
                </CardActions>
            </Card>
        </Grid>
    )
}

export default CardMembers