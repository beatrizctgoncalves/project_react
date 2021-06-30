import { Button, Grid, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { editGroup } from '../Services/BasicService';
import { toast } from 'react-toastify';


function FormEditGroup(props) {
    const { id } = props.match.params

    const [updatedGroup, setUpdatedGroup] = useState({})

    function handleGroupEdit() {
        editGroup(id, updatedGroup)
            .then(resp => {
                window.location.assign(`/groups/${id}`)
            })
            .catch(err => {
                toast.error(err.body)
            })
    }

    const handleName = (event) => {
        setUpdatedGroup({ ...updatedGroup, name: event.target.value })
    }

    const handleDesc = event => {
        setUpdatedGroup({ ...updatedGroup, description: event.target.value })
    }

    return (
        <React.Fragment >
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="New Name"
                        fullWidth
                        onChange={handleName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="description"
                        name="description"
                        label="New Description"
                        fullWidth
                        onChange={handleDesc}
                    />
                </Grid>

                <br /><br /><br /><br />
                <Grid item xs={12}>
                    <Button
                        type="button"
                        className="button1"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleGroupEdit}
                    >
                        Save Changes
                    </Button>
                </Grid>
            </Grid>
        </React.Fragment >
    )
}

export default FormEditGroup;