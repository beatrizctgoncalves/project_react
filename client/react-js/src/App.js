import React from 'react';
import './App.css';
import Head from './views/Head';
import Navbar from './views/Navbar';
import Home from './views/HomePage/Home';
import Profile from './views/users/Profile';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contact from './views/Contact';
import About from './views/About';
import Groups from './views/Groups';
import Terms from './views/Terms';
import Privacy from './views/Privacy';
import EditProfile from './views/users/EditProfile';
/*
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
            <Switch>
              <Route
                exact path='/'
                render={() => <Home></Home>}
              />

              <Route
                exact path='/terms'
                render={() => <Terms></Terms>}
              />

              <Route
                exact path='/privacy-policy'
                render={() => <Privacy></Privacy>}
              />

              <Route
                exact path='/sign-up'
                render={(props) => <SignUp {...props} />}
              />

              <Route
                exact path='/sign-in' 
                render={(props) => <SignIn {...props} onLogin = {this.setStateLogin}/>}
              />

              <Route
                exact path='/contact'
                render={(props) => <Contact {...props} />}
              />

              <Route
                exact path='/about'
                render={(props) => <About {...props} />}
              />

              <Route
                exact path='/profile'
                render={(props) => <Profile {...props} />}
              />
              
              <Route
                exact path='/edit-profile'
                render={(props) => <EditProfile {...props} />}
              />

              <Route
                exact path='/groups'
                render={(props) => <Groups {...props} />}
              />
            </Switch>
          </Router>
        </body>
      </div>
    )
  }
}


*/

function App() {
  return (
<div>
        <head>
          <Head></Head>
        </head>
        
        <body>
          <Navbar></Navbar>

          <Router>
            <Switch>
              <Route
                exact path='/'
                render={() => <Home></Home>}
              />

              <Route
                exact path='/terms'
                render={() => <Terms></Terms>}
              />

              <Route
                exact path='/privacy-policy'
                render={() => <Privacy></Privacy>}
              />

              <Route
                exact path='/sign-up'
                render={(props) => <SignUp {...props} />}
              />

              <Route
                exact path='/sign-in' 
              >
                <SignIn></SignIn>
              </Route>

              <Route
                exact path='/contact'
                render={(props) => <Contact {...props} />}
              />

              <Route
                exact path='/about'
                render={(props) => <About {...props} />}
              />

              <Route
                exact path='/profile'
                render={(props) => <Profile {...props} />}
              />
              
              <Route
                exact path='/edit-profile'
                render={(props) => <EditProfile {...props} />}
              />

              <Route
                exact path='/groups'
              > <Groups></Groups></Route>
            </Switch>
          </Router>
        </body>
      </div>
    
  );
}
export default App;
