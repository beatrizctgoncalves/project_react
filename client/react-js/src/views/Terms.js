import React from 'react'
import Copyright from './Copyright.js';
import Box from '@material-ui/core/Box';


function Terms() {
    return (
        <section class="page-section">
            <div class="container px-4 px-lg-5">
                <h2 class="text-center mt-0">Terms Of Use</h2>
                <hr class="divider" />
                
            </div>

            <Box mt={8}>
                <br/><br/>
                <Copyright />
            </Box>
        </section>
    )
}

export default Terms