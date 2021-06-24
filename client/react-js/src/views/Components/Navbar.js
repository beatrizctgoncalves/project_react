import React from 'react'

function Navbar() {
    const username = window.sessionStorage.getItem("username")

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

                        {username ?
                            <>
                                <div class="dropdown">
                                    <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        {username}
                                    </a>

                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li className="nav-item"><a className="nav-link" href="/profile">Profile</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>
                                <li className="nav-item"><a className="nav-link" href="/logout">Logout</a></li>
                            </>
                            :
                            <>
                                <li className="nav-item"><a className="nav-link" href="/sign-in">Sign In</a></li>
                                <li className="nav-item"><a className="nav-link" href="/sign-up">Sign Up</a></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
