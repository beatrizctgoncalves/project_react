import React, { useEffect, useState } from 'react'
import { addMemberToGroup, getSpecificGroup, removeMemberFromGroup } from '../../Services/BasicService.js';
import Alert from 'react-bootstrap/Alert'
import Footer from '../../Components/Footer';
import GoBack from '../../Components/GoBack';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import { Typography, CardHeader, Container, Card, CardContent, CssBaseline, Grid, Button, Box } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';


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


function Members(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })
    const [edit, setEdit] = useState(false)

    const [toAddMembers, setAddMembers] = useState(false)
    const [newMember, setNewMember] = useState("")

    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])


    function handleMemberDelete(member) {
        removeMemberFromGroup(id, member)
            .then(resp => {
                let aux = group.members.filter(m => {
                    if (m != member) {
                        return m
                    }
                })
                setGroup(aux)
                setEdit(false)
            })
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
            })
    }

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
                getSpecificGroup(group.id)
                    .then(groupObj => {
                        let aux = groupObj.message.members
                        aux.push(newMember)
                        setGroup(aux)
                        setAddMembers(false)
                    })
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
                    <h2 className="text-center mt-0">{group.name}</h2>
                    <hr className="divider" />
                </div>
                <ToastContainer />
                <br />

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card align="center">
                            <CardHeader
                                title={'Members'}
                                titleTypographyProps={{ align: 'center' }}
                                className={classes.cardHeader}
                            />

                            <CardContent>
                                {group.members ? group.members.map(member =>
                                    <div className={classes.cardGroup} key={member}>
                                        <Grid item xs={6}>
                                            <Typography variant="h6" color="textSecondary">
                                                {member}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={6}>
                                            <ColorButton variant="contained" color="primary" className={classes.margin} onClick={handleMemberDelete.bind(null, member)}>
                                                <i className="bi bi-trash-fill"></i>
                                            </ColorButton>
                                        </Grid>
                                    </div>
                                ) : ""}
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

export default Members