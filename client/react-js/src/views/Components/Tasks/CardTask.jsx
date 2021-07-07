import React, { useState } from 'react'
import { useStyles } from '../Styles/Style';
import { Typography, CardHeader, Box, Card, CardContent, Grid, CardActions, TextField, Checkbox, FormControlLabel } from '@material-ui/core';
import { ButtonRed, ButtonGreen } from '../Styles/ColorButtons';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { updateTaskOfGroup } from '../../Services/BasicService';
import { toast } from 'react-toastify';


function CardProject(props) {
    const { task, group } = props
    const owner = window.sessionStorage.getItem('username');
    const [toUpdateTasks, setUpdatedTasks] = useState(false)
    const [updateTask, setUpdateTask] = useState({ title: task.title })

    const [state, setState] = React.useState({
        member: true
    });
    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
        setUpdateTask({ ...updateTask, member: event.target.id });
    };

    const handlePoints = event => {
        setUpdateTask({ ...updateTask, points: event.target.value })
    }

    function handleToEditTasksChange() {
        if (toUpdateTasks) {
            setUpdatedTasks(false)
        } else {
            setUpdatedTasks(true)
        }
    }

    function handleAddTasks() {
        updateTaskOfGroup(group.id, { title: task.title, updatedInfo: updateTask })
            .then(resp => {
                setUpdatedTasks(false)
            })
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


    function handleTaskDelete(projectId) {
        //TODO
    }

    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
                <CardHeader
                    subheader={task.title}
                    subheaderTypographyProps={{ align: 'center' }}
                    className={classes.cardHeader}
                />

                <CardContent>
                    <Box align='center'>
                        <div className={classes.cardGroup} key={task.id}>
                            <ul className={classes.listItem}>
                                <Typography variant="body1" color='primary'>
                                    Begin Date
                                </Typography>

                                <div>
                                    <ul className={classes.listItem} key={task.id}>
                                        <Typography variant="body2" color="textSecondary">
                                            {task.beginDate}
                                        </Typography>
                                    </ul>
                                </div>
                            </ul>

                            <ul className={classes.listItem}>
                                <Typography variant="body1" color='primary'>
                                    End Date
                                </Typography>

                                <div>
                                    <ul className={classes.listItem} key={task.id}>
                                        <Typography variant="body2" color="textSecondary">
                                            {task.endDate}
                                        </Typography>
                                    </ul>
                                </div>
                            </ul>
                        </div>
                    </Box>
                </CardContent>
                {owner === group.owner ?
                    <>
                        {toUpdateTasks ?
                            <>
                                <Box mt={0} align='center'>
                                    <Grid item xs={6} align='center'>
                                        {group.members.map(member =>
                                            <FormControlLabel
                                                key={member}
                                                control={<Checkbox checked={state.checkedA} onChange={handleChange} name="member" id={member} />}
                                                label={member}
                                            />
                                        )}
                                    </Grid>

                                    <Grid item xs={6} align='center'>
                                        <TextField
                                            type="text"
                                            id="points"
                                            name="points"
                                            required
                                            fullWidth
                                            label="Points"
                                            onChange={handlePoints}
                                        />
                                    </Grid>

                                    <br />
                                    <ButtonGreen
                                        variant="contained"
                                        className={classes.margin}
                                        onClick={handleAddTasks}
                                    >
                                        Add Task
                                    </ButtonGreen>
                                </Box>
                                <br />
                            </>
                            : ""}
                        <CardActions>
                            <ButtonRed size="small" color="primary" onClick={handleTaskDelete.bind(null, task.id)}>
                                <DeleteIcon />
                            </ButtonRed>
                            <Grid item xs={12} align='right'>
                                <ButtonGreen size="small" color="primary" onClick={handleToEditTasksChange}>
                                    {toUpdateTasks ? "" : <AddIcon />}
                                </ButtonGreen>
                            </Grid>
                        </CardActions>
                    </>
                    : ''}
            </Card>
        </Grid>
    )
}

export default CardProject