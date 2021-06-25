import React, { useEffect, useState, useParams } from 'react'
import Box from '@material-ui/core/Box';
import { addMemberToGroup, getSpecificGroup, addProjectToGroup } from '../Services/BasicService.js';
import Button from '@material-ui/core/Button';
import Alert from 'react-bootstrap/Alert'
import Footer from '../Components/Footer.js';
import GoBack from '../Components/GoBack';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Typography, CardHeader } from '@material-ui/core';


const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: green[500],
        fontFamily: [
            "Merriweather Sans",
            '-apple-system',
            'BlinkMacSystemFont',
            "Segoe UI",
            'Roboto',
            "Helvetica Neue",
            'Arial',
            "Noto Sans",
            'sans-serif',
            "Apple Color Emoji",
            "Segoe UI Emoji",
            "Segoe UI Symbol",
        ].join(','),
        '&:hover': {
            backgroundColor: green[700],
        },
        margin: '4px'
    },
}))(Button);


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#274e81e1',
    },
    div: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
}));

function Group(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params

    const [toAddMembers, setAddMembers] = useState(false)
    const [newMember, setNewMember] = useState("")
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const [toAddProjects, setAddProjects] = useState(false)
    const [newProject, setNewProject] = useState("")

    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])


    const handleMember = event => {
        setNewMember(event.target.value)
    }

    function handleToEditMembersChange() {
        if (toAddMembers) {
            setAddMembers(false)
        } else {
            setAddMembers(true)
        }
    }

    function handleAddMembers() {
        addMemberToGroup(id, newMember)
            .then(resp => {
                let aux = group;
                aux.members.push(newMember)
                setGroup(aux)
                setAddMembers(false)
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }


    const handleProject = event => {
        setNewProject(event.target.value)
    }

    function handleToEditProjectsChange() {
        if (toAddProjects) {
            setAddProjects(false)
        } else {
            setAddProjects(true)
        }
    }

    function handleAddProjects() {
        addProjectToGroup(id, newProject)
            .then(resp => {
                let aux = group;
                aux.members.push(newProject)
                setGroup(aux)
                setAddProjects(false)
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }

    const classes = useStyles();

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">Your Group Details</h2>
                    <hr className="divider" />
                </div>
                {
                    error.shouldShow &&
                    <Alert variant={'warning'} onClose={() => setError(false)} dismissible>
                        {error.errorMessage}
                    </Alert>
                }

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card align="center">
                            <CardHeader
                                title={group.name}
                                subheader={<Link to={`/groups/${group.id}/edit`}><i className="bi bi-pencil-fill" /></Link>}
                                titleTypographyProps={{ align: 'center' }}
                                subheaderTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                            />
                            <CardContent>
                                <div className={classes.cardPricing}>
                                    <Typography component="h2" variant="h5" color="textPrimary">
                                        {group.description}
                                    </Typography>
                                    <br />

                                    <Typography variant="h6" color="textSecondary">
                                        Owner: {group.owner}
                                    </Typography>
                                    <br />

                                    <Typography variant="h6" color="textSecondary">
                                        Members:
                                    </Typography>
                                    {group.members ? group.members.map((member) => (
                                        <Typography component="p" variant="subtitle1" align="center" key={member}>
                                            {member}
                                        </Typography>
                                    )) : ""}
                                    <br />

                                    <Typography variant="h6" color="textSecondary">
                                        Projects:
                                    </Typography>
                                    {group.projects ? group.projects.map((project) => (
                                        <Typography component="p" variant="subtitle1" align="center" key={project}>
                                            {project}
                                        </Typography>
                                    )) : ""}
                                </div>
                            </CardContent>

                            <CardContent>
                                {toAddMembers ?
                                    <Box mt={4}>
                                        <h3 className="h4 mb-2">Insert New Members</h3>
                                        <br />
                                        <input
                                            variant="outlined"
                                            margin="normal"
                                            required
                                            fullWidth
                                            type="text"
                                            name="newMember"
                                            className="form-control"
                                            placeholder="Enter new Member"
                                            value={newMember}
                                            onChange={handleMember}
                                        />
                                        <br />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className={classes.margin}
                                            onClick={handleAddMembers}
                                        >
                                            Add Member
                                        </Button>
                                    </Box> : ""}

                                <Box mt={4}>
                                    <ColorButton variant="contained" color="primary" className={classes.margin} onClick={handleToEditMembersChange}>
                                        <i className="bi bi-person-plus-fill">&nbsp;&nbsp;</i>
                                        {toAddMembers ? "" : "Add Members"}
                                    </ColorButton>

                                    {toAddProjects ?
                                        <Box mt={4}>
                                            <h3 className="h4 mb-2">Insert New Projects</h3>
                                            <br />
                                            <input
                                                variant="outlined"
                                                margin="normal"
                                                required
                                                fullWidth
                                                type="text"
                                                name="newProject"
                                                className="form-control"
                                                placeholder="Enter New Project Identifier"
                                                value={newProject}
                                                onChange={handleProject}
                                            />
                                            <br />
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                className={classes.margin}
                                                onClick={handleAddProjects}
                                            >
                                                Add Project
                                            </Button>
                                        </Box> : ""}
                                    <ColorButton variant="contained" color="primary" className={classes.margin} onClick={handleToEditProjectsChange}>
                                        <i className="bi bi-patch-plus-fill">&nbsp;&nbsp;</i>
                                        {toAddProjects ? "" : "Add Projects"}
                                    </ColorButton>
                                </Box>

                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box mt={5}>
                    <GoBack />
                </Box>
                
                <Box mt={5}>
                    <br /><br />
                    <Footer />
                    <br />
                </Box>
            </div>
        </Container >
    )
}

export default Group