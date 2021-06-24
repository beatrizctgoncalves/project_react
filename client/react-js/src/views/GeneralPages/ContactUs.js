import React from 'react';
import Footer from '../Components/Footer.js';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';


function ContactUs() {
    return (
        <section className="page-section">
            <div className="container px-2 px-lg-5">
                <h2 className="text-center mt-0">Contact Us</h2>
                <hr className="divider"/>
                <div className="row text-center">
                    <div className="col-md-4 text-center">
                        <div className="mt-5">
                            <div className="mb-3">
                                <img className="card-img-top" src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif"
                                alt="Card image cap"></img>
                            </div>
                            <Link color="inherit" href="https://github.com/beatrizctgoncalves">
                                <h3 className="h4 mb-2">Beatriz Gonçalves</h3>
                            </Link>{' '}
                            <p className="text-muted mb-0"> Engineering student at ISEL<br></br>(Instituto Politécnico Engenharia de Lisboa)</p>                    
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="mt-5">
                            <div className="mb-3">
                                <img className="card-img-top" src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif"
                                alt="Card image cap"></img>
                            </div>
                            <Link color="inherit" href="https://github.com/A44866">
                                <h3 className="h4 mb-2">Maksym</h3>
                            </Link>{' '}
                            <p className="text-muted mb-0"> Engineering student at ISEL<br></br>(Instituto Politécnico Engenharia de Lisboa)</p>                    
                        </div>
                    </div>
                    <div className="col-md-4 text-center">
                        <div className="mt-5">
                            <div className="mb-3">
                                <img className="card-img-top" src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif"
                                alt="Card image cap"></img>
                            </div>
                            <Link color="inherit" href="https://github.com/pinto6">
                                <h3 className="h4 mb-2">Miguel Pinto</h3>
                            </Link>{' '}
                            <p className="text-muted mb-0"> Engineering student at ISEL<br></br>(Instituto Politécnico Engenharia de Lisboa)</p>                    
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

export default ContactUs