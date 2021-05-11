import React from 'react'
import './../css/SignUp.css';


class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName: "",
            password: ""
        }
    }

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

    handleSignUpClick = () =>{
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value

        if(!username | !password){
            return
        }

        if(password != document.getElementById("passwordRepeat").value){
            //send alert password must match
            return
        }
        
        return fetch('http://localhost:8080/users/g5/pluggable/gamification/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
    }

    handleLoginClick = () => {this.props.history.push('#login')}

    render() {
        return (
            <div class="sign-up">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <form class="box" id="myForm">
                                <h1>Sign up</h1>
                                <input type="email" name="email" placeholder="Email" id="mail" required></input>
                                <input type="text"  id="username" name="username" placeholder="Username" required></input>
                                <input type="text" name="name" placeholder="Name" required></input>
                                <input type="text" name="surname" placeholder="Surname" required></input>
                                <input type="password" name="password" placeholder="Password" id="password" required></input>
                                <input type="password" name="passwordRepeat" placeholder="Repeat your password" id="passwordRepeat" required></input>
                                <input type="button" id="sub" value="Sign Up" onClick={this.handleSignUpClick}></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp