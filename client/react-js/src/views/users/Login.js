import React from 'react'
import './../css/Login.css'


class Login extends React.Component {
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
        this.setState(() => ({password : event.target.value}))
    }

    handleLoginClick = () => {
        //TODO
        return fetch('http://localhost:8080/users/g5/pluggable/gamification/login')
    }

    handleLoginClick = () => {this.props.history.push('#login')}

    render() {
        return (
            <div class="log-in">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <form class="box-login" action="/users/login" method="POST">
                                <h1>Login</h1>
                                <br></br>
                                <p class="text-muted"> Please enter your username and password!</p>
                                <input type="text" name="username" placeholder="Username" required></input>
                                <input type="password" name="password" placeholder="Password" required></input>
                                <input type="submit" name="" value="Login" href="#"></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login