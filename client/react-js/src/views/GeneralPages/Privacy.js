import React from 'react'
import Footer from '../Components/Footer.js';
import Box from '@material-ui/core/Box';


function About() {
    return (
        <section className="page-section">
            <div className="container px-4 px-lg-5">
                <h2 className="text-center mt-0">Privacy Policy</h2>
                <hr className="divider" />
                
            </div>

            <Box mt={8}>
                <br/><br/>
                <Footer />
            </Box>
        </section>
    )
}

export default About