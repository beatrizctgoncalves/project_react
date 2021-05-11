import React from 'react'
import './../css/Profile.css'


class Profile extends React.Component {

    handleUserChange = (event) => {
        event.persist() //If you want to access the event properties in an asynchronous way, you should call event.persist()
        this.setState(() => 
            ({userName: event.target.value})
        )
    }

    handlePasswordChange = (event) => {
        event.persist()
        this.setState(()=>
            ({password : event.target.value})
        )
    }
  
    handleLoginClick = () =>{
        //TODO
    }

    handleLoginClick = () => {this.props.history.push('#login')}

    render() {
        return (
            <>
                <header class="titlehead">
                    <div class="col-12 text-center">
                        <h1 id="title" class="font-weight-ligth">Your Profile</h1>
                    </div>
                </header>
                <header class="masterhead">
                    <br></br>
                    <div class="row justify-content-center align-items-center">
                        <div class="col-sm left-side">
                            <div class="box-profile">
                                <ul>
                                    <li>
                                        <h3>Username: </h3>
                                    </li>
                                    <br></br>
                                    <li>
                                        <h3>Name: </h3>
                                    </li>
                                    <br></br>
                                    <li>
                                        <h3>Surname: </h3>
                                    </li>
                                    <br></br>
                                    <li>
                                        <h3>Email: </h3>
                                    </li>
                                    <br></br>
                                    <li>
                                        <h3>Information: </h3>
                                    </li>
                                </ul>
                                <br></br>
                                <input type="submit" name="" value="Edit Profile" href="#"></input>
                                <input type="submit" name="" value="Change Password" href="#"></input>
                            </div>
                        </div>
                        <div class="col-sm left-side">
                            <div class="box-profile-avatar">
                                <img src="https://thumbs.dreamstime.com/b/programmer-linear-icon-technologist-freelancer-thin-line-illustration-contour-symbol-vector-isolated-outline-drawing-programmer-197065655.jpg" 
                                width="auto" height="250"></img>
                            </div>
                        </div>
                    </div>
                </header>

                <section class="py-5 section">
                    <div class="container">
                        <div class="row h-100 justify-content-center align-items-center">
                            <div class="col-sm">
                                <div class="box-profile-statistics">
                                    <h1>Account Statistics</h1>
                                    <div class="card-body">
                                        <h5 class="card-title"><i class="fas fa-lock"></i> Groups</h5>
                                        <p class="card-text"><b>groups_length</b> Groups Registered</p>
                                        <h5 class="card-title"><i class="fas fa-gamepad"></i> Projects</h5>
                                        <p class="card-text"><b>projects_length</b> Projects Saved</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm">
                                <h2 class="font-weight-light" id="sec-title">Create A New Group!</h2>
                                <form class="box-create-groups" action="/site/groups" method="POST">
                                    <input type="text" name="name" id="name" placeholder="Enter Group Name" required></input>
                                    <input type="text" id="desc" name="desc" placeholder="Enter Group Description" required></input>
                                    <input type="hidden" name="owner" required></input>
                                    <input type="submit" name="" value="Create" href="#"></input>
                                </form>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-sm">
                                <div class = "mx-auto">
                                    <a onclick="myGroups()" id="groups-button" class="mt-5">
                                        Groups
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Profile