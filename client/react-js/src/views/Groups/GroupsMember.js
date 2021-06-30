import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Components/Title';
import { getUserMemberGroups } from '../Services/BasicService';
import { toast } from 'react-toastify';


export default function Orders() {
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
    }, [])

    return (
        <React.Fragment>
            <Title>Groups You Belong To</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {groups.map((group) => (
                        <TableRow key={group.id}>
                            <TableCell>
                                <Link color="inherit" href={`/groups/${group.id}`}>
                                    {group.name}
                                </Link>
                            </TableCell>
                            <TableCell>{group.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}