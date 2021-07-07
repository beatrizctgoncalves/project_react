import React, { useState } from 'react'
import { useStyles } from '../Styles/Style';
import { Typography, CardHeader, Box, Card, CardContent, Grid, CardActions, TextField, FormControlLabel, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeTaskFromGroup, updateTaskOfGroup } from '../../Services/BasicService';
import { toast } from 'react-toastify';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';


function CardProject(props) {
    const { task, group } = props
    const owner = window.sessionStorage.getItem('username');
    const [toUpdateTasks, setUpdatedTasks] = useState(false)
    const [updateTask, setUpdateTask] = useState({ title: task.title })
    const [groupUpdated, setGroup] = useState([])

    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        setError(false);
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

    function handleUpdateTask() {
        console.log(updateTask)
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

    function handleTaskDelete(title) {
        removeTaskFromGroup(group.id, { title: title })
            .then(resp => {
                let aux = groupUpdated.tasks.filter(task => {
                    if (task.title !== title) {
                        return task
                    } else {
                        return null
                    }
                })
                setGroup(aux)
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
                        <div className={classes.cardGroup}>
                            <ul className={classes.listItem}>
                                <Typography variant="body1" color='primary'>
                                    Begin Date
                                </Typography>

                                <div>
                                    <ul className={classes.listItem}>
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
                                    <ul className={classes.listItem}>
                                        <Typography variant="body2" color="textSecondary">
                                            {task.endDate}
                                        </Typography>
                                    </ul>
                                </div>
                            </ul>

                            {!task.updatedInfo ?
                                <Typography variant="body1" color="primary">
                                    Give points to a user if it is done!
                                </Typography>
                                :
                                <Typography variant="body1" color="primary">
                                    You already gave points to a user for finishing this taks but you can give to other user.
                                </Typography>
                            }
                        </div>
                    </Box>
                </CardContent>
                {owner === group.owner ?
                    <>
                        {toUpdateTasks ?
                            <>
                                <Box mt={0} align='center'>
                                    <Grid item xs={6} align='center'>
                                        <Typography variant="body1" color="textSecondary">
                                            Give scores about this task!
                                        </Typography>

                                        {group.members.map(member =>
                                            <>
                                                <form onSubmit={handleUpdateTask}>
                                                    <FormControl component="fieldset" error={error} className={classes.formControl} align='center'>
                                                        <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={handleRadioChange}>
                                                            <FormControlLabel value={member} control={<Radio />} label={member} />
                                                        </RadioGroup>

                                                        <TextField
                                                            type="text"
                                                            id="points"
                                                            name="points"
                                                            required
                                                            fullWidth
                                                            label="Points"
                                                            onChange={handlePoints}
                                                        />

                                                        <br />

                                                        <Button size="small" type="submit" color="primary" className={classes.button}>
                                                            Save
                                                        </Button>
                                                    </FormControl>
                                                </form >
                                                <br />
                                            </>
                                        )}
                                    </Grid>
                                </Box>
                                <br />
                            </>
                            : ""}
                        <CardActions>
                            <Grid item xs={12} align='left'>
                                <Button size="small" color="primary" onClick={handleToEditTasksChange}>
                                    {toUpdateTasks ? "-" : "Update"}
                                </Button>
                            </Grid>
                            <Button size="small" color="secondary" onClick={handleTaskDelete.bind(null, task.title)}>
                                <DeleteIcon />
                            </Button>
                        </CardActions>
                    </>
                    : ''}
            </Card>
        </Grid>
    )
}

export default CardProject