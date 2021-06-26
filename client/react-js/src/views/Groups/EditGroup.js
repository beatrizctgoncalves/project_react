import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer.js';
import { getSpecificGroup } from '../Services/BasicService';
import Alert from 'react-bootstrap/Alert'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoBack from '../Components/GoBack';
import Form from './FormEditGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Grid, Box } from '@material-ui/core';


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
        marginBottom: theme.spacing(2),
    },
    listItem: {
        padding: theme.spacing(1, 2),
    }
}));

function EditGroup(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params

    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })


    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])


    function notify() {
        toast("Wow so easy!", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    const classes = useStyles();
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <br /><br />
                <div className="container px-4 px-lg-2">
                    <h2 className="text-center mt-0">Editing Group {group.name}...</h2>
                    <hr className="divider" />
                </div>
                {
                    error.shouldShow &&
                    <Alert variant={'warning'} onClose={() => setError(false)} dismissible>
                        {error.errorMessage}
                    </Alert>
                }
                <br />

                <Grid container spacing={3}>
                    <Grid item xs={12} className={classes.div}>
                        <Form {...props}/>
                    </Grid>
                </Grid>

                <Box mt={4}>
                    <br /><br />
                    <GoBack />
                </Box>

                <Box mt={8}>
                    <Footer />
                </Box>
            </div >
        </Container>
    )
}


export default EditGroup;