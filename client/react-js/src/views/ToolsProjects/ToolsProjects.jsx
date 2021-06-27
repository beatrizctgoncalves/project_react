import { useEffect, useState } from "react"
import { addProjectToGroup, getToolProjects } from '../Services/BasicService';
import { ToastContainer, toast } from 'react-toastify';
import { Button,Container, GridList,CssBaseline, GridListTile, Card, CardHeader, CardContent } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { grey, purple } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
    root: {
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: grey[500],
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
            backgroundColor: grey[700],
        },
        margin: '4px'
    },
}))(Button);


const useStyles = makeStyles((theme) => ({
    gridList: {
        width: 1000,
        height: 300,
    },
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
        fontSize: '20'
    }
}));





function ToolsProjects(props){
    const owner = window.sessionStorage.getItem("username")
    const { tool } = props.match.params
    const { id } = props.match.params
    const[availableProjects,setavailableProjects] = useState([])


    useEffect(()=>{
        getToolProjects(tool,owner)
        .then(resp => {
            setavailableProjects(resp.message)
        })
        .catch(err => {
            console.log(err)
            toast.error(err.body, {
                position: "top-left",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        })
    },[])



    function handleAddProjectToGroup(projId){
        
        console.log(id)
        console.log(projId)
        console.log(tool)
        addProjectToGroup(id,projId,tool)
            .then(resp => {
                window.location.replace(`/groups/${id}`)
            }).catch(err => {
                console.log(err)
                toast.error(err.body, {
                    position: "top-left",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

            })

    }
    const classes = useStyles();


    return(
               <Container component="main" maxWidth="xs">
                <CssBaseline />
                <br /><br />
                <br /><br />
                <div className="container px-4 px-lg-5">
                    <h2 className="text-center mt-0">Available projects in {tool}</h2>
                    <hr className="divider" />
                </div>
                <ToastContainer/>        
                <br />
                <GridList cellHeight={160} className={classes.gridList} cols={5}>
                    {availableProjects ? availableProjects.map(project => {
                        return (
                            <GridListTile cols={1}>
                                <Card align="center">
                                    <CardHeader
                                        title={project.title}
                                        key = {project.id}
                                        titleTypographyProps={{ align: 'center' }}
                                        className={classes.cardHeader}
                                    />
                                    <CardContent>
                                        <ColorButton variant="contained" color="primary" className={classes.margin} onClick={handleAddProjectToGroup.bind(null, project.id)}>
                                            <i className="bi bi-trash-fill"></i>
                                        </ColorButton>
                                    </CardContent>
                                </Card>
                            </GridListTile>
                        )
                    }) : ""}
                </GridList>
                 </Container>
                )
}


export default ToolsProjects