import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuBook from '@material-ui/icons/MenuBook';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonPin from '@material-ui/icons/PersonPin';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import LockOpen from '@material-ui/icons/LockOpen';
import Close from '@material-ui/icons/Close';
import Home from '@material-ui/icons/Home';
import { toast } from 'react-toastify';
import { logout } from '../Services/authenticationService';
import React from 'react';


const username = window.sessionStorage.getItem("username")

function handleLogout() {
  logout()
    .then(resp => {
      window.sessionStorage.removeItem("username");
      window.location.replace('/');
    })
    .catch(err => {
      toast.error(err.body, {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    })
}

function handleSignIn() {
  window.location.replace("/sign-in");
}

function handleSignUp() {
  window.location.replace("/sign-up");
}

function handleHome() {
  window.location.replace("/");
}

function handleAbout() {
  window.location.replace("/about-us");
}

function handleContacts() {
  window.location.replace("/contacts");
}

function handleGroups() {
  window.location.replace("/groups");
}

function handleProfile() {
  window.location.replace("/profile");
}

export const mainListItems = (
  <div>
    <ListItem button onClick={handleHome}>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>

    {username ? "" :
      <>
        <ListItem button onClick={handleSignIn}>
          <ListItemIcon>
            <LockOpen />
          </ListItemIcon>
          <ListItemText primary="Sign In" />
        </ListItem>
        <ListItem button onClick={handleSignUp}>
          <ListItemIcon>
            <LockOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Up" />
        </ListItem>
      </>
    }

    <ListItem button onClick={handleAbout}>
      <ListItemIcon>
        <MenuBook />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItem>
    <ListItem button onClick={handleContacts}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Contacts" />
    </ListItem>

  </div>
);

export const secondaryListItems = (
  <div>
    {username ?
      <>
        <ListSubheader inset>Your account</ListSubheader>
        <ListItem button onClick={handleProfile}>
          <ListItemIcon>
            <PersonPin />
          </ListItemIcon>
          <ListItemText primary={username} />
        </ListItem>
        <ListItem button onClick={handleGroups}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Groups" />
        </ListItem>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <Close />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </>
      : ""
    }
  </div>
);