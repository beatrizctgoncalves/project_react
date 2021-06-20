import React from 'react';
import './App.css';
import Head from './views/Components/Head';
import Navbar from './views/Components/Navbar';
import Home from './views/HomePage/Home';
import Profile from './views/Profile/Profile';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Contact from './views/GeneralPages/ContactUs';
import About from './views/GeneralPages/AboutUs';
import Groups from './views/Groups/Groups';
import Group from './views/Groups/Group';
import Terms from './views/GeneralPages/Terms';
import Privacy from './views/GeneralPages/Privacy';
import EditProfile from './views/Profile/EditProfile';
/*
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {apiResponse: ""};
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
              >
                <SignUp> </SignUp>
              </Route>

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
              exact path = "/groups/:id"
              render = {(props) => <Group {...props}></Group>}
              ></Route>

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
