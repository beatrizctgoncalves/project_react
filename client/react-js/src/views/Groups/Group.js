import React, { useEffect, useState } from 'react'
import { addMemberToGroup, getSpecificGroup, addProjectToGroup,getUser } from '../Services/BasicService.js';
import Footer from '../Components/Footer.js';
import GoBack from '../Components/GoBack';
import { Link } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import { green, purple } from '@material-ui/core/colors';
import { Typography, CardHeader, Container, Card, CardContent, CssBaseline, Grid, Button, Box } from '@material-ui/core';


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
    cardGroup: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'baseline',
        marginBottom: theme.spacing(0),
    },
    listItem: {
        padding: theme.spacing(1, 1),
    }
}));

function Group(props) {
    const [group, setGroup] = useState({})
    const [user, setUser] = useState({})
    const { id } = props.match.params

    const [toAddMembers, setAddMembers] = useState(false)
    const [newMember, setNewMember] = useState("")

    const [toAddProjects, setAddProjects] = useState(false)
    const owner = window.sessionStorage.getItem("username")



    

    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
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

                //setError({ errorMessage: err.body, shouldShow: true })
            })
    }, [])

    useEffect(()=>{
           
            getUser(owner)
            .then(resp => {
                console.log(resp.message)
                
                setUser(resp.message)
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
    ,[])





    const handleMember = event => {
        setNewMember(event.target.value)
    }

    function handleToEditMembersChange() {
        if (toAddMembers) {
            setAddMembers(false)
        } else {
            console.log()
            setAddMembers(true)
        }
    }

    function handleAddMembers() {
        addMemberToGroup(id, newMember, group.owner)
            .then(resp => {
                setAddMembers(false)
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


    function handleToEditProjectsChange() {
        if (toAddProjects) {
            setAddProjects(false)
        } else {
            setAddProjects(true)
            console.log(user)
        }

    }
   
    function handleSeeSprints() {
        window.location.replace(`/groups/${id}/sprints`)
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
                <ToastContainer />
                <br />

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
                                <Typography component="h2" variant="h5" color="textPrimary">
                                    {group.description}
                                </Typography>
                                <br />

                                <div className={classes.cardGroup}>
                                    <Typography variant="h6" color="textSecondary">
                                        The Owner of this Group is {group.owner}.
                                    </Typography>
                                    <br /><br />
                                </div>

                                <div className={classes.cardGroup}>
                                    <ul className={classes.listItem}>
                                        <Typography variant="body1">
                                            <Link to={`/groups/${group.id}/members`}>Members</Link>
                                        </Typography>

                                        <div>
                                            {group.members ? group.members.map((member) => (
                                                <ul className={classes.listItem} key={member}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {member}
                                                    </Typography><br />
                                                </ul>
                                            )) : ""}
                                        </div>
                                    </ul>

                                    <ul className={classes.listItem}>
                                        <Typography variant="body1">
                                            <Link to={`/groups/${group.id}/projects`}>Projects</Link>
                                        </Typography>

                                        <div>
                                            {group.projects ? group.projects.map((project) => (
                                                <ul className={classes.listItem} key={project}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        {project.title}
                                                    </Typography><br />
                                                </ul>
                                            )) : ""}
                                        </div>
                                    </ul>
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
                                        <ColorButton
                                            variant="contained"
                                            color="primary"
                                            className={classes.margin}
                                            onClick={handleAddMembers}
                                        >
                                            Add Member
                                        </ColorButton>
                                    </Box> : ""}

                                <Box mt={4}>
                                    <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditMembersChange}>
                                        <i className="bi bi-person-plus-fill">&nbsp;&nbsp;</i>
                                        {toAddMembers ? "" : "Add Members"}
                                    </Button>

                                    {toAddProjects ?
                                        <Box mt={4}>
                                            <h3 className="h4 mb-2">Insert New Projects</h3>
                                            <br />
                                            <ul className={classes.listItem}>
                                                <Typography variant="body1">
                                                    Projects
                                                </Typography>

                                        <div>
                                            {user.info ? user.info.map((info) => (
                                                <ul className={classes.listItem} key={info}>
                                                    <Typography variant="body2" color="textSecondary">
                                                        <Link to ={`/groups/${id}/tools/${info.type}`}>{info.type}</Link>
                                                    </Typography><br />
                                                </ul>
                                            )) : ""}
                                        </div>
                                    </ul>
                                            
                                            
                                            
                                            <br />
                                        
                                        </Box> : ""}
                                    <Button variant="contained" color="primary" className={classes.margin} onClick={handleToEditProjectsChange}>
                                        <i className="bi bi-patch-plus-fill">&nbsp;&nbsp;</i>
                                        {toAddProjects ? "" : "Add Projects"}
                                    </Button>

                                    <Button variant="contained" color="primary" className={classes.margin} onClick={handleSeeSprints}>
                                        <i className="bi bi-eyeglasses">&nbsp;&nbsp;</i>
                                        Sprints
                                    </Button>
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
/*
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
                                            */