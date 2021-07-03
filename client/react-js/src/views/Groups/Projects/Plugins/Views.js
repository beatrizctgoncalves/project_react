import React, { useState } from 'react'
import { getToolProjects, addMemberInfo } from '../../../Services/BasicService.js';
import { useStyles } from '../../../Components/Style';
import { Typography, Button, Box, Card, TextField, Grid } from '@material-ui/core';
import { ButtonGreen } from '../../../Components/ColorButtons';
import { toast } from 'react-toastify';
import ToolsProjects from '../ToolsProjects.jsx';
import { SyncLoader } from 'react-spinners';


export function Gitlab(props) {
    const { groupId } = props
    const owner = window.sessionStorage.getItem("username")

    const [availableProjects, setAvailableProjects] = useState([])
    const [isLoading, setisLoading] = useState(false)
    function handleGetProjects() {
        setisLoading(true)
        getToolProjects('Gitlab', URL, ownerCredentials)
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

    const [toGitlab, setGitlab] = useState(false)
    function handleToEditProjectsChange() {
        if (toGitlab) {
            setGitlab(false)
        } else {
            setGitlab(true)
        }
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
                        {isLoading ?
                            <Box mt={4} align='center'>
                                <SyncLoader color="#3f51b5" />
                                <br /><br />
                            </Box>
                            :
                            <ToolsProjects availableProjects={availableProjects} id={groupId} ownerCredentials={ownerCredentials} tool={'Gitlab'} />
                        }
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
/* <Grid container spacing={2} justify='center'>
                        {group.projects && group.projects !== 0 ? group.projects.map((project) =>
                            <>
                                {username !== group.owner ?
                                    '' :
                                    <>
                                        {project.memberCredentials && project.memberCredentials[username] ?
                                            '' :
                                            <>
                                                {toAddCredentials ?
                                                    <>
                                                        <Grid item xs={5}>
                                                            <Card>
                                                                <Box mt={3} align='center'>
                                                                    <CardContent>
                                                                        <Typography variant="subtitle1" color="textSecondary">
                                                                            Add your Credentials to the Project<br /> {project.title} <br />so we can gamify your work!
                                                                        </Typography>
                                                                        <br />

                                                                        <GitlabCredentialsMembers groupId={group.id} projectId={project.id} url={project.URL} />
                                                                    </CardContent>
                                                                </Box>
                                                                <br />
                                                            </Card>
                                                        </Grid>
                                                        <Grid item xs={5}>
                                                            <Card>
                                                                <Box mt={3} align='center'>
                                                                    <CardContent>
                                                                        <Typography variant="subtitle1" color="textSecondary">
                                                                            Add your Credentials to the Project<br /> {project.title} <br />so we can gamify your work!
                                                                        </Typography>
                                                                        <br />
                                                                        
                                                                        <GitlabCredentialsMembers groupId={group.id} projectId={project.id} url={project.URL} />
                                                                    </CardContent>
                                                                </Box>
                                                                <br />
                                                            </Card>
                                                        </Grid>
                                                        <Grid item xs={5}>
                                                            <Card>
                                                                <Box mt={3} align='center'>
                                                                    <CardContent>
                                                                        <Typography variant="subtitle1" color="textSecondary">
                                                                            Add your Credentials to the Project<br /> {project.title} <br />so we can gamify your work!
                                                                        </Typography>
                                                                        <br />

                                                                        <GitlabCredentialsMembers groupId={group.id} projectId={project.id} url={project.URL} />
                                                                    </CardContent>
                                                                </Box>
                                                                <br />
                                                            </Card>
                                                        </Grid>
                                                    </> : ""}
                                                
                                                <Grid item xs={12} align='center'>
                                                    <br />
                                                    <ButtonGreen onClick={handleAddCredentials}>
                                                        <AddIcon />
                                                        {toAddCredentials ? "" : "Add Credentials"}
                                                    </ButtonGreen>
                                                </Grid>
                                            </>
                                        }
                                    </>
                                }
                            </>
                        ) : ''}
                    </Grid>*/

export function GitlabCredentialsMembers(props) {
    const { groupId, projectId, url } = props
    const username = window.sessionStorage.getItem("username")
    const [memberCredentials, setMemberCredentials] = useState({ AppUsername: username })

    function handleAddCredentials() {
        addMemberInfo(groupId, projectId, username, url, memberCredentials)
            .then(resp => window.location.replace(`/group/${groupId}`))
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

    const [URL, setUrl] = useState()
    const handleUrl = event => {
        setUrl(event.target.value)
    }

    return (
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
                    onClick={handleAddCredentials}
                >
                    Save
                </Button>
            </Grid>
        </Grid>
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