import React from 'react'
import Footer from '../Components/Footer.js';
import Box from '@material-ui/core/Box';


function About() {
    return (
        <section class="page-section">
            <div class="container px-4 px-lg-5">
                <h2 class="text-center mt-0">Privacy Policy</h2>
                <hr class="divider" />
                
            </div>

            <Box mt={8}>
                <br/><br/>
                <Footer />
            </Box>
        </section>
    )
}

export default About