import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Head from './views/Components/Head';
import Navbar from './views/Components/Navbar';
import Home from './views/HomePage/Home';
import Profile from './views/Profile/Profile';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';
import Contact from './views/GeneralPages/ContactUs';
import About from './views/GeneralPages/AboutUs';
import Groups from './views/Groups/Groups';
import Group from './views/Groups/Group';
import Terms from './views/GeneralPages/Terms';
import Privacy from './views/GeneralPages/Privacy';
import EditProfile from './views/Profile/EditProfile';


function App() {
  return (
    <div>
      <Head></Head>

      <Navbar></Navbar>

      <Router>
        <Switch>
          <Route
            exact path='/'
          >
            <Home />
          </Route>

          <Route
            exact path='/terms'
          >
            <Terms />
          </Route>

          <Route
            exact path='/privacy-policy'
          >
            <Privacy />
          </Route>

          <Route
            exact path='/sign-up'
          >
            <SignUp />
          </Route>

          <Route
            exact path='/sign-in'
          >
            <SignIn />
          </Route>

          <Route
            exact path='/contact'
          >
            <Contact />
          </Route>

          <Route
            exact path='/about'
          >
            <About />
          </Route>

          <Route
            exact path='/profile'
            render={(props) => <Profile {...props} />}
          />

          <Route
            exact path='/edit-profile'
            render={(props) => <EditProfile {...props} />}
          />

          <Route
            exact path="/groups/:id"
            render={(props) => <Group {...props} />}
          />

          <Route
            exact path='/groups'
          >
            <Groups />
          </Route>

        </Switch>
      </Router>
    </div >

  );
}
export default App;
