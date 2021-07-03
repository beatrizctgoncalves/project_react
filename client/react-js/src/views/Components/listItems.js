import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import MenuBook from '@material-ui/icons/MenuBook';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';
import PersonPin from '@material-ui/icons/PersonPin';
import UserPlusIcon from '@material-ui/icons/PersonAdd';
import LockOpen from '@material-ui/icons/LockOpen';
import Home from '@material-ui/icons/Home';
import React from 'react';


const username = window.sessionStorage.getItem("username")

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
  window.location.replace(`/profile/${username}`);
}


export const mainListItems = (
  <div>
    <ListItem button onClick={handleHome}>
      <ListItemIcon>
        <Home />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem>
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
    </>
  </div>
);

export const otherListItems = (
  <div>
    <>
      <ListItem button onClick={handleSignIn}>
        <ListItemIcon>
          <LockOpen />
        </ListItemIcon>
        <ListItemText primary="Sign In" />
      </ListItem>
      <ListItem button onClick={handleSignUp}>
        <ListItemIcon>
          <UserPlusIcon />
        </ListItemIcon>
        <ListItemText primary="Sign Up" />
      </ListItem>
    </>
  </div>
);