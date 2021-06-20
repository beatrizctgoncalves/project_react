import React from 'react'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top py-3" id="mainNav">
            <div className="container px-4 px-lg-5">
                <a className="navbar-brand" href="/">Pluggable Gamification</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                        <li className="nav-item"><a className="nav-link" href="/about-us">About Us</a></li>
                        <li className="nav-item"><a className="nav-link" href="/contacts">Contacts</a></li>
                        
                        <li className="nav-item"><a className="nav-link" href="/sign-in">Sign In</a></li>
                        <li className="nav-item"><a className="nav-link" href="/sign-up">Sign Up</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
