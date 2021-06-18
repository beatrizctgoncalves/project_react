import React from 'react';
import './App.css';
import Head from './views/Components/Head';
import Navbar from './views/Components/Navbar';
import Home from './views/HomePage/Home';
import Profile from './views/Profile/Profile';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ContactUs from './views/GeneralPages/ContactUs';
import AboutUs from './views/GeneralPages/AboutUs';
import Groups from './views/Groups/Groups';
import Terms from './views/GeneralPages/Terms';
import Privacy from './views/GeneralPages/Privacy';
import EditProfile from './views/Profile/EditProfile';


function App() {
  return (
    <>
      <Head></Head>

      <Navbar></Navbar>

      <Router>
        <Switch>
          <Route
            exact path='/'
            render={() => <Home/>}
          />

          <Route
            exact path='/terms'
            render={() => <Terms/>}
          />

          <Route
            exact path='/privacy-policy'
            render={() => <Privacy/>}
          />

          <Route
            exact path='/sign-up'
            render={(props) => <SignUp {...props} />}
          />

          <Route
            exact path='/sign-in'
          >
            <SignIn/>
          </Route>

          <Route
            exact path='/contacts'
            render={(props) => <ContactUs {...props} />}
          />

          <Route
            exact path='/about-us'
            render={(props) => <AboutUs {...props} />}
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
    </>

  );
}
export default App;
