import React, { useState, useEffect } from 'react';
import { Box, Table, Link, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Title from '../Components/Styles/Title';
import { getUserMemberGroups } from '../Services/BasicService';
import { toast } from 'react-toastify';


export default function GroupsMember() {
    const owner = window.sessionStorage.getItem("username")
    const [groups, setGroups] = useState([])

    useEffect(() => {
        getUserMemberGroups(owner)
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

    return (
        <React.Fragment>
            <Title>Groups You Belong To</Title>

            {groups.length !== 0 ? groups.map(group => (
                <Table size="small" key={group.id}>
                    <TableHead>
                        <TableRow color='primary'>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center">Members</TableCell>
                            <TableCell align="center">Projects</TableCell>
                            <TableCell align="center">Sprints</TableCell>
                            <TableCell align="center">Tasks</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
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
                    </TableBody>
                </Table>
            )) :
                <Box mt={2}>
                    You do not belong to any group!
                </Box>
            }
        </React.Fragment>
    );
}