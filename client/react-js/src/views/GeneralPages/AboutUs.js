import React from 'react'
import Footer from '../Components/Footer.js';
import Box from '@material-ui/core/Box';


function About() {
    return (
        <section class="page-section">
            <div class="container px-4 px-lg-5">
                <h2 class="text-center mt-0">About Us</h2>
                <hr class="divider" />
                <div class="row gx-4 gx-lg-5">
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <div class="mb-2"><i class="bi-gem fs-1 text-primary"></i></div>
                            <h3 class="h4 mb-2">Up to Date</h3>
                            <p class="text-muted mb-0">All dependencies are kept current to keep things fresh.</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <div class="mb-2"><i class="bi-laptop fs-1 text-primary"></i></div>
                            <h3 class="h4 mb-2">Responsive Design</h3>
                            <p class="text-muted mb-0">Something</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <div class="mb-2"><i class="bi-globe fs-1 text-primary"></i></div>
                            <h3 class="h4 mb-2">Something</h3>
                            <p class="text-muted mb-0">Something</p>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6 text-center">
                        <div class="mt-5">
                            <div class="mb-2"><i class="bi-heart fs-1 text-primary"></i></div>
                            <h3 class="h4 mb-2">Something</h3>
                            <p class="text-muted mb-0">Something</p>
                        </div>
                    </div>
                </div>
            </div>

            <Box mt={8}>
                <br/><br/>
                <Footer />
            </Box>
        </section>
    )
}

export default About