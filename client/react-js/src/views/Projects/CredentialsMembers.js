import React, { useState } from 'react'
import { getProjectFromGroup } from '../Services/BasicService.js';
import { Typography, Box, CardActions, Paper } from '@material-ui/core';
import { ButtonGreen } from '../Components/Styles/ColorButtons';
import { GitlabCredentialsMembers } from './Plugins/Gitlab';
import { JiraCredentialsMembers } from './Plugins/Jira';
import AddIcon from '@material-ui/icons/Add';


export default function CredentialsMembers(props) {
    const { project, group } = props
    const [toAddMemberCredentials, setAddMemberCredentials] = useState(false)

    function handleAddCredentials() {
        getProjectFromGroup(group.id, project.id, project.URL)
            .then(resp => {
                if (toAddMemberCredentials) {
                    setAddMemberCredentials(false)
                } else {
                    setAddMemberCredentials(true)
                }
                return null
            })
    }

    return (
        <>
            {toAddMemberCredentials ?
                <Paper>
                    <Box mt={2} align='center'>
                        <br />
                        <Typography variant="h6" color="textSecondary">
                            Select one of these options
                        </Typography>
                        <br />
                        {project.type === 'Jira' ?
                            <JiraCredentialsMembers groupId={group.id} project={project} />
                            :
                            <GitlabCredentialsMembers groupId={group.id} project={project} />
                        }
                    </Box>
                    <br />
                </Paper> : ""}
            <CardActions>
                <ButtonGreen size="small" color="primary" onClick={handleAddCredentials.bind(null, project)}>
                    {toAddMemberCredentials ? "" : <AddIcon />}
                </ButtonGreen>
            </CardActions>
        </>
    )
}