import React, { useState } from 'react'
import { getToolProjects } from '../../../Services/BasicService.js';
import { useStyles } from '../../../Components/Style';
import { Typography, Button, Box, Card, TextField, Grid } from '@material-ui/core';
import { ButtonGreen } from '../../../Components/ColorButtons';
import { toast } from 'react-toastify';
import ToolsProjects from '../ToolsProjects.jsx';


export function Gitlab(props) {
    const { groupId } = props
    const [edit, setEdit] = useState(false)
    const [availableProjects, setAvailableProjects] = useState({})
    const owner = window.sessionStorage.getItem("username")

    function handleGetProjects() {
        getToolProjects('Gitlab', URL, ownerCredentials)
            .then(resp => setAvailableProjects(resp.message))
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
    }

    const [ownerCredentials, setOwnerCredentials] = useState({ AppUsername: owner })
    const handleAccountId = (event) => {
        setOwnerCredentials({ ...ownerCredentials, accountId: event.target.value })
    }

    const handleAToken = event => {
        setOwnerCredentials({ ...ownerCredentials, AToken: event.target.value })
    }

    const [URL, setUrl] = useState()
    const handleUrl = event => {
        setUrl(event.target.value)
    }

    const [toGitlab, setGitlab] = useState(false)
    function handleToEditProjectsChange() {
        if (toGitlab) {
            setGitlab(false)
        } else {
            setGitlab(true)
        }
    }

    function handleToProjects(type) {
        window.location.replace(`/groups/${groupId}/tools/${type}`)
    }

    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4}>
            {toGitlab ?
                <Box mt={2} align='center'>
                    <Typography variant="h6" color="textPrimary">
                        Add your Credentials so we can search for your Project
                    </Typography>
                    <br />

                    <Grid container spacing={3}>
                        <Grid item sm={12} align='center'>
                            <TextField
                                required
                                id="url"
                                name="url"
                                label="URL"
                                onChange={handleUrl}
                            />
                        </Grid>
                        <Grid item sm={6} align='center'>
                            <TextField
                                required
                                id="accountId"
                                name="accountId"
                                label="Username"
                                onChange={handleAccountId}
                            />
                        </Grid>
                        <Grid item sm={6} align='center'>
                            <TextField
                                required
                                id="AToken"
                                name="AToken"
                                label="Access Token"
                                onChange={handleAToken}
                            />
                        </Grid>
                        <br /><br /><br /><br />
                        <Grid item xs={12} align='center'>
                            <Button
                                type="button"
                                className="button1"
                                variant="contained"
                                color="primary"
                                onClick={handleGetProjects}
                            >
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                    <Box mt={3} align='center'>
                        <ToolsProjects project={availableProjects} id={groupId} />
                    </Box>
                </Box>
                : ""}

            <Box mt={3} align='center'>
                <ButtonGreen variant="contained" color="primary" className={classes.margin} onClick={handleToEditProjectsChange}>
                    {toGitlab ? "-" : "Gitlab"}
                </ButtonGreen>
            </Box>
        </Grid >
    )
}

export function Jira(props) {
    const { groupId } = props
    const [edit, setEdit] = useState(false)
    const [groupUpdated, setGroup] = useState({})

    function handleProjectDelete(projectId) {

    }

    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <Grid container spacing={3}>
                    <Grid item xs={12} align='center'>
                        <Grid item sm={6} align='center'>
                            <TextField
                                required
                                id="name"
                                name="name"
                                label="New Name"
                            />
                        </Grid>
                        <Grid item sm={6} align='center'>
                            <TextField
                                required
                                id="description"
                                name="description"
                                label="New Description"
                            />
                        </Grid>
                    </Grid>
                    <br /><br /><br /><br />
                    <Grid item xs={12} align='center'>
                        <Button
                            type="button"
                            className="button1"
                            variant="contained"
                            color="primary"
                        >
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}