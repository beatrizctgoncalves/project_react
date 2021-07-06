import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Box } from '@material-ui/core';
import Title from '../Components/Styles/Title';
import { getUserMemberGroups } from '../Services/BasicService';
import RemoveRedEye from '@material-ui/icons/RemoveRedEye';


export default function Orders() {
    const owner = window.sessionStorage.getItem("username")
    const [groups, setGroups] = useState([])

    useEffect(() => {
        getUserMemberGroups(owner)
            .then(resp => setGroups(resp.message))
    }, [owner])

    return (
        <React.Fragment>
            <Title>Groups You Belong To</Title>
            <Table size="small">
                {groups.length !== 0 ? groups.map((group) => (
                    <>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={group.id}>
                                <TableCell>
                                    {group.name}
                                </TableCell>
                                <TableCell>{group.description}</TableCell>
                                <TableCell align="right">
                                    <Link color="inherit" href={`/groups/${group.id}`}>
                                        <RemoveRedEye />
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </>
                )) :
                    <Box mt={2}>
                        You do not belong to any group!
                    </Box>
                }
            </Table>
        </React.Fragment>
    );
}