import React from 'react'
import '../../App.css';
import Box from '@material-ui/core/Box';
import Footer from '../Components/Footer';


function Home() {
    return (
        <div className="homeItems">
            <header className="masthead">
                <div className="container px-4 px-lg-5 h-100">
                    <div className="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
                        <div className="col-lg-8 align-self-end">
                            <h1 className="text-white font-weight-bold">Pluggable Gamification</h1>
                            <hr className="divider" />
                        </div>
                        <div className="col-lg-8 align-self-baseline">
                            <p className="text-white-75 mb-5">Start gamifying your projects so you never feel bored! <br/>
                            Just create an account and start adding your team and projects to groups!</p>
                            <a className="btn btn-primary btn-xl" href="/about">Find Out More</a>
                        </div>
                    </div>
                </div>
            </header>

            <section className="page-section bg-primary">
                <div className="container px-4 px-lg-5">
                    <div className="row gx-4 gx-lg-5 justify-content-center">
                        <div className="col-lg-8 text-center">
                            <h2 className="text-white mt-0">We've got what you need!</h2>
                            <hr className="divider divider-light" />
                            <p className="text-white-75 mb-4">Never get bored of your work! <br/>
                            Our website is always free! <br/>
                            You can add your own projects to be gamify, no strings attached!</p>
                            <a className="btn btn-light btn-xl" href="/sign-up">Get Started!</a>
                        </div>
                    </div>
                </div>
            </section>

            <Box mt={8}>
                <Footer/>
                <br/><br/>
            </Box>
        </div>
    )
}

export default Home;