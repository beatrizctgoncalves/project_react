import React, { useEffect, useState } from 'react'
import { getUser } from '../../Services/BasicService';
import { Typography, CardMedia, CardContent } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useStyles } from '../Styles/Style';


function CardMembers(props) {
    const { member } = props
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