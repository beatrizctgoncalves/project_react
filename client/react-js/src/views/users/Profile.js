import React from 'react'
import LockIcon from '@material-ui/icons/Lock';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';


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
            <div class="homeItems">
                <div class="box-home m-3">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="intro">
                                <br></br>                                
                                <br></br>
                                <br></br>
                                <h2>User's Profile</h2>
                                <br></br>
                                <br></br>
                                <br></br>
                                <h4>Name:
                                    <br></br>
                                    Surname:
                                    <br></br>
                                    Email:                                                           
                                    <br></br>
                                    Additional Information:
                                    <br></br>
                                    <br></br>
                                </h4>
                            </div>
                        </div>
                        <div class="col-10 col-sm-2 offset-0 intro">
                            <img src="https://thumbs.dreamstime.com/b/programmer-linear-icon-technologist-freelancer-thin-line-illustration-contour-symbol-vector-isolated-outline-drawing-programmer-197065655.jpg" 
                                width="auto" height="150"></img>
                                <br></br><br></br><br></br><br></br>
                            <div class="d-none d-md-block"></div>
                            <input type="submit" name="" value="Edit Profile" href="#"></input>
                            <input type="submit" name="" value="Change Password" href="#"></input>
                        </div>
                    </div>
                </div>
                <div class="box-home features m-3">
                    <div class="container">
                        <div class="row h-100 justify-content-center align-items-center">
                            <div class="col-sm">
                                <div class="box-profile-statistics">
                                    <h1>Account Statistics</h1>
                                    <div class="card-body">
                                        <h5 class="card-title"><i><LockIcon style={{ width: 30, height: 'auto' }}/></i> Groups</h5>
                                        <p class="card-text"><b>groups_length</b> Groups Registered</p>
                                        <h5 class="card-title"><i><SportsEsportsIcon style={{ width: 30, height: 'auto' }}/></i> Projects</h5>
                                        <p class="card-text"><b>projects_length</b> Projects Saved</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm">
                                <form class="box-create-groups" action="/site/groups" method="POST">
                                    <h2>Create A New Group!</h2>
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
                </div>
            </div>
        )
    }
}

export default Profile