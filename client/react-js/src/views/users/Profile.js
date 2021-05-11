import React from 'react'


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
            <div>
                <section>
                    <div class="card section">
                        <form class="box" action="/users/g5/pluggable/gamification/:username" method="PATCH">
                            <h1>Change Password</h1>
                            <br></br>
                            <input type="password" name="currentPassword" placeholder="Current Password" required></input>
                            <input type="password" name="newPassword" placeholder="New Password" required></input>
                            <input type="password" name="confirmNewPassword" placeholder="Confirm Password" required></input>
                            <br></br>
                            <input type="submit" name="" value="Change Password" href="#"></input>
                        </form>
                    </div>
                </section>
                <section>
                <div class="card section">
                    <form class="box" action="/users/g5/pluggable/gamification/:username" method="PATCH">
                        <h1>Change Password</h1>
                        <br></br>
                        <input type="password" name="currentPassword" placeholder="Current Password" required></input>
                        <input type="password" name="newPassword" placeholder="New Password" required></input>
                        <input type="password" name="confirmNewPassword" placeholder="Confirm Password" required></input>
                        <br></br>
                        <input type="submit" name="" value="Change Password" href="#"></input>
                        </form>
                    </div>
                </section>
            </div>
        )
    }
}

export default Profile