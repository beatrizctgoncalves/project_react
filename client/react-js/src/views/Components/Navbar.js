import React, { useState } from 'react';
import { logout } from '../Services/authenticationService';


function Navbar() {
    const username = window.sessionStorage.getItem("username")
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    function handleLogout() {
        logout()
            .then(resp => {
                window.sessionStorage.removeItem("username");
                console.log(window.sessionStorage.getItem("username") ? "yes" : "no")
                window.location.replace('/');
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }

    const [menu, setMenu] = useState(false)
    function handleMenu() {
        if (menu) {
            setMenu(false)
        } else {
            setMenu(true)
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top py-3" id="mainNav">
            <div className="container px-4 px-lg-5">
                {menu ?
                    <div className="navbar">
                        <ul className="navbar-nav ms-auto my-2 my-lg-0">
                            <li className="nav-item"><a className="nav-link" href="/about-us">About Us</a></li>
                            <li className="nav-item"><a className="nav-link" href="/contacts">Contacts</a></li>

                            {username ?
                                <>
                                    <div className="dropdown">
                                        <button className="btn-drop">
                                            {username}
                                            <i className="bi bi-arrow-down"></i>
                                        </button>

                                        <ul className="dropdown-content">
                                            <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                            <li><a className="dropdown-item" href="/notifications">Notifications</a></li>
                                            <li><a className="dropdown-item" href="/groups">Groups</a></li>
                                        </ul>
                                    </div>
                                    <li className="nav-item"><a className="nav-link" onClick={handleLogout}>Logout</a></li>
                                </>
                                :
                                <>
                                    <li className="nav-item"><a className="nav-link" href="/sign-in">Sign In</a></li>
                                    <li className="nav-item"><a className="nav-link" href="/sign-up">Sign Up</a></li>
                                </>
                            }
                        </ul>
                    </div> : ""}

                <button
                    color="primary"
                    className="navbar-toggler navbar-toggler-right"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarResponsive"
                    aria-controls="navbarResponsive"
                    aria-expanded="false" aria-label="Toggle navigation"
                    onClick={handleMenu}>
                    {menu ? "" : <span className="navbar-toggler-icon"></span>}
                </button>

                <a className="navbar-brand" href="/">Pluggable Gamification</a>

                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto my-2 my-lg-0">
                        <li className="nav-item"><a className="nav-link" href="/about-us">About Us</a></li>
                        <li className="nav-item"><a className="nav-link" href="/contacts">Contacts</a></li>

                        {username ?
                            <>
                                <div className="dropdown">
                                    <button className="btn-drop">
                                        {username}
                                        <i className="bi bi-arrow-down"></i>
                                    </button>

                                    <ul className="dropdown-content">
                                        <li><a className="dropdown-item" href="/profile">Profile</a></li>
                                        <li><a className="dropdown-item" href="/notifications">Notifications</a></li>
                                        <li><a className="dropdown-item" href="/groups">Groups</a></li>
                                    </ul>
                                </div>
                                <li className="nav-item"><a className="nav-link" onClick={handleLogout}>Logout</a></li>
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
