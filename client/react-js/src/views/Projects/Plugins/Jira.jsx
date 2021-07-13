import React, { useState } from 'react'
import { getToolProjects, addMemberInfo } from '../../Services/BasicService.js';
import { useStyles } from '../../Components/Styles/Style';
import { Typography, Button, Box, TextField, Grid } from '@material-ui/core';
import { ButtonGreen } from '../../Components/Styles/ColorButtons';
import { toast } from 'react-toastify';
import ToolsProjects from '../../Components/Projects/ToolsProjects';
import { SyncLoader } from 'react-spinners';


//Jira
export function Jira(props) {
    const { groupId } = props
    const owner = window.sessionStorage.getItem("username")

    const [availableProjects, setAvailableProjects] = useState([])
    const [isLoading, setisLoading] = useState(false)
    function handleGetProjects() {
        setisLoading(true)
        getToolProjects('Jira', URL, ownerCredentials)
            .then(resp => {
                setAvailableProjects(resp.message)
                setisLoading(false)
            })
            .catch(err => {
                setisLoading(false)
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

    const [toJira, setJira] = useState(false)
    function handleToEditProjectsChange() {
        if (toJira) {
            setJira(false)
        } else {
            setJira(true)
        }
    }

    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4}>
            {toJira ?
                <Box mt={2} align='center'>
                    <Typography variant="h6" color="textPrimary">
                        Add your Credentials so we can search for your Project
                    </Typography>
                    <br />

                    <Grid container spacing={3} justify='center'>
                        <Grid item sm={12} align='center'>
                            <TextField
                                required
                                id="url"
                                name="url"
                                label="URL"
                                onChange={handleUrl}
                            />
                        </Grid>
                        <Grid item sm={12} align='center'>
                            <TextField
                                required
                                id="accountId"
                                name="accountId"
                                label="Account ID"
                                onChange={handleAccountId}
                            />
                        </Grid>
                        <Grid item sm={6} align='center'>
                            Please insert your email and access token this way:
                            <br />email:access_token<br /><br />
                            <TextField
                                required
                                id="AToken"
                                name="AToken"
                                label="Email and AToken"
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
                        {isLoading ?
                            <Box mt={4} align='center'>
                                <SyncLoader color="#3f51b5" />
                                <br /><br />
                            </Box>
                            :
                            <ToolsProjects availableProjects={availableProjects} id={groupId} ownerCredentials={ownerCredentials} url={URL} tool={'Jira'} icon={'https://logos-world.net/wp-content/uploads/2021/02/Jira-Emblem-700x394.png'} />
                        }
                    </Box>
                </Box>
                : ""}

            <Box mt={3} align='center'>
                <ButtonGreen variant="contained" color="primary" className={classes.margin} onClick={handleToEditProjectsChange}>
                    {toJira ? "-" : "Jira"}
                </ButtonGreen>
            </Box>
        </Grid >
    )
}

export function JiraCredentialsMembers(props) {
    const { groupId, project } = props
    const username = window.sessionStorage.getItem("username")
    const [memberCredentials, setMemberCredentials] = useState({ AppUsername: username })

    function handleAddCredentials() {
        addMemberInfo(groupId, project.id, username, project.URL, memberCredentials)
            .then(resp => window.location.replace(`/groups/${groupId}/projects`))
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

    const handleAccountId = (event) => {
        setMemberCredentials({ ...memberCredentials, accountId: event.target.value })
    }
    const handleAToken = event => {
        setMemberCredentials({ ...memberCredentials, AToken: event.target.value })
    }

    return (
        <Grid item xs={12}>
            <Box mt={0} align='center'>
                <Typography variant="body1" color="textPrimary">
                    Add your Credentials so we can gamify your work
                </Typography>
                <br />

                <Grid container spacing={3} justify='center'>
                    <Grid item sm={12} align='center'>
                        <TextField
                            required
                            id="accountId"
                            name="accountId"
                            label="Account ID"
                            onChange={handleAccountId}
                        />
                    </Grid>
                    <Grid item sm={12} align='center'>
                        Please insert your email and access token this way:
                        <br />email:access_token<br />
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
                            onClick={handleAddCredentials}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Grid >
    )
}