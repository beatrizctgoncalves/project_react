import React from 'react'
import '../../App.css';
import Box from '@material-ui/core/Box';
import Copyright from '../Copyright';


function Home() {
    return (
        <div class="homeItems">
            <header class="masthead">
                <div class="container px-4 px-lg-5 h-100">
                    <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div class="col-lg-8 align-self-end">
                            <h1 class="text-white font-weight-bold">Pluggable Gamification</h1>
                            <hr class="divider" />
                        </div>
                        <div class="col-lg-8 align-self-baseline">
                            <p class="text-white-75 mb-5">Start gamifying your projects so you never feel bored! <br/>
                            Just create an account and start adding your team and projects to groups!</p>
                            <a class="btn btn-primary btn-xl" href="/about">Find Out More</a>
                        </div>
                    </div>
                </div>
            </header>

            <section class="page-section bg-primary">
                <div class="container px-4 px-lg-5">
                    <div class="row gx-4 gx-lg-5 justify-content-center">
                        <div class="col-lg-8 text-center">
                            <h2 class="text-white mt-0">We've got what you need!</h2>
                            <hr class="divider divider-light" />
                            <p class="text-white-75 mb-4">Never get bored of your work! <br/>
                            Our website is always free! <br/>
                            You can add your own projects to be gamify, no strings attached!</p>
                            <a class="btn btn-light btn-xl" href="/sign-up">Get Started!</a>
                        </div>
                    </div>
                </div>
            </section>

            <Box mt={8}>
                <Copyright/>
                <br/><br/>
            </Box>
        </div>
    )
}

export default Home;