import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar, Head } from './views/Components';
import Home from './views/HomePage/Home';
import { Profile, EditProfile } from './views/Profile';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';
import { Groups, Group, EditGroup } from './views/Groups';
import { Terms, Privacy, Contact, About } from './views/GeneralPages';
import Notifications from './views/Notifications/Notifications';


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
            exact path='/contacts'
          >
            <Contact />
          </Route>

          <Route
            exact path='/about-us'
          >
            <About />
          </Route>

          <Route
            exact path='/profile'
            render={(props) => <Profile {...props} />}
          />

          <Route
            exact path='/profile/edit'
            render={(props) => <EditProfile {...props} />}
          />

          <Route
            exact path='/notifications'
            render={(props) => <Notifications {...props} />}
          />

          <Route
            exact path="/groups/:id/edit"
            render={(props) => <EditGroup {...props} />}
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
