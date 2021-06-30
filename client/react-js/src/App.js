import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Head from './views/Components/Head';
import Home from './views/GeneralPages/Home';
import Profile from './views/Profile/Profile';
import EditProfile from './views/Profile/EditProfile';
import EditInfo from './views/Profile/EditInfo';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';
import Groups from './views/Groups/Groups';
import Group from './views/Groups/Group';
import EditGroup from './views/Groups/EditGroup';
import About from './views/GeneralPages/AboutUs';
import Contact from './views/GeneralPages/ContactUs';
import Privacy from './views/GeneralPages/Privacy';
import Terms from './views/GeneralPages/Terms';
import Notifications from './views/Notifications/Notifications';
import Members from './views/Groups/Members/Members';
import ToolsProjects from './views/Groups/Projects/ToolsProjects';
import Sprints from './views/Groups/Sprint/Sprints';
import Projects from './views/Groups/Projects/Projects';
import UserProfile from './views/Profile/UserProfile';
import Rankings from './views/Groups/Rankings/Rankings';


function App() {
  return (
    <div>
      <Head></Head>

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
            {window.sessionStorage.getItem('username') ? <Redirect to="/groups" /> : <SignIn />}

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


          {/*PROFILE*/}
          <Route
            exact path='/profile'
            render={(props) => window.sessionStorage.getItem('username') ? <Profile {...props} /> : <Redirect to="/sign-in" />}
          />

          <Route
            exact path='/profile/:username'
            render={(props) => window.sessionStorage.getItem('username') ? <UserProfile {...props} /> : <Redirect to="/sign-in" />}
          />

          <Route
            exact path='/profile/:username/edit'
            render={(props) => window.sessionStorage.getItem('username') ? <EditProfile {...props} /> : <Redirect to="/sign-in" />}
          />

          <Route
            exact path='/profile/:username/edit/info'
            render={(props) => window.sessionStorage.getItem('username') ? <EditInfo {...props} /> : <Redirect to="/sign-in" />}
          />

          <Route
            exact path='/notifications'
            render={(props) => window.sessionStorage.getItem('username') ? <Notifications {...props} /> : <Redirect to="/sign-in" />}
          />


          {/*GROUPS*/}
          <Route
            exact path="/groups/:id/edit"
            render={(props) => window.sessionStorage.getItem('username') ? <EditGroup {...props} /> : <Redirect to="/sign-in" />}
          />

          <Route
            exact path="/groups/:id"
            render={(props) => window.sessionStorage.getItem('username') ? <Group {...props} /> : <Redirect to="/sign-in" />}
          />

          <Route
            exact path="/groups/:id/tools/:tool"
            render={(props) => window.sessionStorage.getItem('username') ? <ToolsProjects {...props} /> : <Redirect to="/sign-in" />}
          />

          <Route
            exact path="/groups/:id/projects"
            render={(props) => window.sessionStorage.getItem('username') ? <Projects {...props} /> : <Redirect to="/sign-in" />}
          />

          <Route
            exact path="/groups/:id/sprints"
            render={(props) => window.sessionStorage.getItem('username') ? <Sprints {...props} /> : <Redirect to="/sign-in" />}
          />

          <Route
            exact path="/groups/:id/rankings"
            render={(props) => window.sessionStorage.getItem('username') ? <Rankings {...props} /> : <Redirect to="/sign-in" />}
          />{/*TODO*/}

          <Route
            exact path="/groups/:id/members"
            render={(props) => window.sessionStorage.getItem('username') ? <Members {...props} /> : <Redirect to="/sign-in" />}
          />

          <Route
            exact path='/groups'
          >
            {sessionStorage.getItem('username') ? <Groups /> : <SignIn />}
          </Route>

        </Switch>
      </Router>
    </div >

  );
}
export default App;
