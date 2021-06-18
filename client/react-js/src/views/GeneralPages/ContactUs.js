import React from 'react';
import Footer from '../Components/Footer.js';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';


function ContactUs() {
    return (
        <section class="page-section">
            <div class="container px-2 px-lg-5">
                <h2 class="text-center mt-0">Contact Us</h2>
                <hr class="divider"/>
                <div class="row text-center">
                    <div class="col-md-4 text-center">
                        <div class="mt-5">
                            <div class="mb-3">
                                <img class="card-img-top" src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif"
                                alt="Card image cap"></img>
                            </div>
                            <Link color="inherit" href="https://github.com/beatrizctgoncalves">
                                <h3 class="h4 mb-2">Beatriz Gonçalves</h3>
                            </Link>{' '}
                            <p class="text-muted mb-0"> Engineering student at ISEL<br></br>(Instituto Politécnico Engenharia de Lisboa)</p>                    
                        </div>
                    </div>
                    <div class="col-md-4 text-center">
                        <div class="mt-5">
                            <div class="mb-3">
                                <img class="card-img-top" src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif"
                                alt="Card image cap"></img>
                            </div>
                            <Link color="inherit" href="https://github.com/A44866">
                                <h3 class="h4 mb-2">Maksym</h3>
                            </Link>{' '}
                            <p class="text-muted mb-0"> Engineering student at ISEL<br></br>(Instituto Politécnico Engenharia de Lisboa)</p>                    
                        </div>
                    </div>
                    <div class="col-md-4 text-center">
                        <div class="mt-5">
                            <div class="mb-3">
                                <img class="card-img-top" src="https://cdn.discordapp.com/attachments/841329211448360997/841469679876440074/gif.gif"
                                alt="Card image cap"></img>
                            </div>
                            <Link color="inherit" href="https://github.com/pinto6">
                                <h3 class="h4 mb-2">Miguel Pinto</h3>
                            </Link>{' '}
                            <p class="text-muted mb-0"> Engineering student at ISEL<br></br>(Instituto Politécnico Engenharia de Lisboa)</p>                    
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