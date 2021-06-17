import React from 'react'
import { signUpFetch } from '../../components/Services/authenticationService'

/*
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
        //TODO
    }

    handleLoginClick = () => {this.props.history.push('#login')}

    render() {
        return (
            <div class="sign">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <form action="/users/signUp" method="POST" class="box" id="myForm">
                                <h1>Sign up</h1>
                                <input type="email" name="email" placeholder="Email" id="mail" required></input>
                                <input type="text" name="username" placeholder="Username" required></input>
                                <input type="password" name="password" placeholder="Password" id="password" required></input>
                                <input type="password" name="passwordRepeat" placeholder="Repeat your password" id="passwordRepeat" required></input>
                                <input type="button" id="sub" value="Login" onclick={this.handleSignUpClick}></input>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
*/console

function SignUp(){
    const [userToCreate, setUserToCreate] = useState({ username: undefined, password: undefined, name : undefined, surname : undefined })
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

/*
    const handlePassword = event => {
        console.log(event.target.value)
        setUserToCreate({ ...userToCreate, password: event.target.value })
    }

    const handleUsername = event => {
      console.log(event.target.value)
        setUserToCreate({ ...userToCreate, username: event.target.value })
    }
    const handleName = event => {
        console.log(event.target.value)
          setUserToCreate({ ...userToCreate, name: event.target.value })
      }
      
    const handleSurname = event => {
        console.log(event.target.value)
          setUserToCreate({ ...userToCreate, surname: event.target.value })
    }
    */


   const handleChange = (event) =>{ 
        console.log(event.target.value)
        console.log(userToCreate)
        const {name, value} = event.target
        setUserToCreate({ ...userToCreate,  [name]: value })
        
    }

    function handleSignUpClick(){

        signUpFetch(userToCreate)
            .then(resp=>{
                window.location.assign('/sign-in')        
                }).catch(err => {
                    setError({errorMessage:error,shouldShow: true })
                    
                })  

    }




    return (
        <div class="sign">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <form >
                            <h1>Sign up</h1>
                            <input type="email" name="email" placeholder="Email" id="mail" ></input>
                            <input type="text" name="username" placeholder="Username" onChange = {handleChange} required></input>
                            <input type="password" name="password" placeholder="Password" id="password" onChange = {handleChange} required></input>
                            <input type="password" name="passwordRepeat" placeholder="Repeat your password" id="passwordRepeat"></input>
                            <input type="text" name="name" placeholder="Name" id="name" onChange = {handleChange}></input>
                            <input type="text" name="surName" placeholder="surName" id="surName" onChange = {handleChange} ></input>
                            <input type="button" id="sub" value="Login" onclick={handleSignUpClick}></input>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )


}

export default SignUp