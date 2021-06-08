import React, {useState} from 'react'

function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top py-3" id="mainNav">
            <div class="container px-4 px-lg-5">
                <a class="navbar-brand" href="/">Pluggable Gamification</a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto my-2 my-lg-0">
                        <li class="nav-item"><a class="nav-link" href="/about">About</a></li>
                        <li class="nav-item"><a class="nav-link" href="/contact">Contact</a></li>
                        
                        <li class="nav-item"><a class="nav-link" href="/sign-in">Sign In</a></li>
                        <li class="nav-item"><a class="nav-link" href="/sign-up">Sign Up</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
