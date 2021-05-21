import React, {useState} from 'react'


function Navbar() {
    return (
        <nav class="navbar-custom navbar navbar-expand-lg navbar-dark shadow fixed-top">
            <div class="container">
                <div id="isel-logo">
                    <div class="collapse navbar-collapse" id="navbarResponsive">
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item">
                                <a href="/">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Video-Game-Controller-Icon.svg/1024px-Video-Game-Controller-Icon.svg.png" width="auto" height="80"></img>
                                </a>
                                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                                    aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                            </li>
                            <li class="nav-item">
                                <br></br>
                                <a class="nav-link" href="#rankings"><span class="material-icons">
                                    search
                                </span></a>
                            </li>
                            <li class="nav-item">
                                <br></br>
                                <a class="nav-link" href="/about-us">About</a>
                            </li>
                            <li class="nav-item">
                                <br></br>
                                <a class="nav-link" href="/contact-us">Contact Us</a>
                            </li>
                            <li class="nav-item">
                                <br></br>
                                <a class="nav-link" href="/profile">Profile</a>
                            </li>
                            <li class="nav-item">
                                <br></br>
                                <p class="nav-link">|</p>
                            </li>
                            <li class="nav-item">
                                <br></br>
                                <a class="nav-link" href="/sign-up">Sign Up</a>
                            </li>
                            <li class="nav-item">
                                <br></br>
                                <a class="nav-link" href="/log-in">Log In</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
