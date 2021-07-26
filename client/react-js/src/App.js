import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from './views/GeneralPages/Home';
import Profile from './views/Profile/Profile';
import EditProfile from './views/Profile/EditProfile';
import SignUp from './views/SignUp/SignUp';
import SignIn from './views/SignIn/SignIn';
import Groups from './views/Groups/Groups';
import Group from './views/Groups/Group';
import EditGroup from './views/Groups/EditGroup';
import About from './views/GeneralPages/AboutUs';
import Contact from './views/GeneralPages/ContactUs';
import Members from './views/Members/Members';
import Sprints from './views/Sprint/Sprints';
import Projects from './views/Projects/Projects';
import Rankings from './views/Rankings/Rankings';
import Error404 from './views/Error/Error404';
import Tasks from './views/Tasks/Tasks'
import GooglePage from './views/Google/GooglePage';


function App() {
  return (
    <Router>
      <Switch>
        <Route
          exact path='/404'
        >
          <Error404 />
        </Route>

        <Route
          exact path='/'
        >
          <Home />
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
          exact path='/profile/:username'
          render={(props) => <Profile {...props} />}
        />

        <Route
          exact path='/profile/:username/edit'
          render={(props) => window.sessionStorage.getItem('username') ? <EditProfile {...props} /> : <Redirect to="/sign-in" />}
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
          exact path="/groups/:id/projects"
          render={(props) => window.sessionStorage.getItem('username') ? <Projects {...props} /> : <Redirect to="/sign-in" />}
        />

        <Route
          exact path="/groups/:id/sprints"
          render={(props) => window.sessionStorage.getItem('username') ? <Sprints {...props} /> : <Redirect to="/sign-in" />}
        />

        <Route
          exact path="/groups/:id/tasks"
          render={(props) => window.sessionStorage.getItem('username') ? <Tasks {...props} /> : <Redirect to="/sign-in" />}
        />

        <Route
          exact path="/groups/:id/rankings"
          render={(props) => window.sessionStorage.getItem('username') ? <Rankings {...props} /> : <Redirect to="/sign-in" />}
        />

        <Route
          exact path="/groups/:id/members"
          render={(props) => window.sessionStorage.getItem('username') ? <Members {...props} /> : <Redirect to="/sign-in" />}
        />

        <Route
          exact path='/groups'
        >
          {sessionStorage.getItem('username') ? <Groups /> : <SignIn />}
        </Route>

        <Route
          exact path='/googleAuth/:username'
          render={(props) => <GooglePage {...props} />}
        />

        <Route path='*'>
          <Error404 />
        </Route>
      </Switch>
    </Router >
  );
}
export default App;
