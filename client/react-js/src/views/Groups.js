import React from 'react'
import EditIcon from '@material-ui/icons/Edit';
import Copyright from './Copyright.js';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';


function Group() {
    return (
        <section class="page-section">
            <div class="container px-2 px-lg-5">
                <h2 class="text-center mt-0">Your Groups</h2>
                <hr class="divider" />
                <div class="row text-center">
                    TODO
                </div>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
        </section>
    )
}

export default Group;