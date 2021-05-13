import React from 'react';
import './App.css';
import Head from './views/Head';
import Navbar from './views/Navbar';
import Home from './views/Home';
import Profile from './views/users/Profile';
import SignUp from './views/users/SignUp';
import Login from './views/users/Login';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Group from './views/Group';
import Footer from './views/Footer';
import ContactUs from './views/ContactUs';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {apiResponse: ""};
  }

  callApi() {
    fetch("http://localhost:8080")
      .then(res => res.text())
      .then(res => this.setState({apiResponse: res}))
  }

  componentWillMount() {
    this.callApi();
  }

  render() {
    return (
      <div>
        <head>
          <Head></Head>
        </head>
        
        <body>
          <Navbar></Navbar>

          <Router>
            <Route
              exact path='/'
              render={() => <Home></Home>}
            />

            <Route
              exact path='/groups'
              render={(props) => (
                this.isLoggedIn() ? (
                  <Group {...props} />
                ) : (
                  <Login {...props} />
                )
              ) }
            />

            <Route
              exact path='/sign-up'
              render={(props) => <SignUp {...props} />}
            />

            <Route
              exact path='/log-in' 
              render={(props) => <Login {...props} onLogin = {this.setStateLogin}/>}
            />

            <Route
              exact path='/contact-us'
              render={(props) => <ContactUs {...props} />}
            />

            <Route
              exact path='/profile'
              render={(props) => <Profile {...props} />}
            />

          </Router>

          <Footer></Footer>
        </body>
      </div>
    )
  }
}

export default App;
