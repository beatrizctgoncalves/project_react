import React from 'react'
import Footer from '../Components/Footer.js';
import Box from '@material-ui/core/Box';


function About() {
    return (
        <section className="page-section">
            <div className="container px-4 px-lg-5">
                <h2 className="text-center mt-0">About Us</h2>
                <hr className="divider" />
                <div className="row gx-4 gx-lg-5">
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-gem fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">Up to Date</h3>
                            <p className="text-muted mb-0">All dependencies are kept current to keep things fresh.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-laptop fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">Responsive Design</h3>
                            <p className="text-muted mb-0">Something</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-globe fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">Something</h3>
                            <p className="text-muted mb-0">Something</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
                            <div className="mb-2"><i className="bi-heart fs-1 text-primary"></i></div>
                            <h3 className="h4 mb-2">Something</h3>
                            <p className="text-muted mb-0">Something</p>
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