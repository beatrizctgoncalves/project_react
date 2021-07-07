import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { useStyles } from './Styles/Style';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import { mainListItems, otherListItems, secondaryListItems } from './ListItems';
import { toast } from 'react-toastify';
import { logout } from '../Services/AuthenticationService';
import { getUserNotifications } from '../Services/BasicService';
import InputIcon from '@material-ui/icons/Input';


function Navbar() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);
    const username = window.sessionStorage.getItem("username")

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

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

    function handleNotifications() {
        getUserNotifications(username)
            .then(resp => window.location.replace('/notifications'))
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

    return (
        <>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <Button
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        onClick={handleDrawerOpen}
                    >
                        <MenuIcon />
                    </Button>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Pluggable Gamification
                    </Typography>
                    {username ?
                        <Button color="inherit" onClick={handleLogout}>
                            <InputIcon />
                        </Button>
                        : ''}
                </Toolbar>
            </AppBar>
            <Drawer
                variant='persistent'
                classes={{ paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose) }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems}</List>
                <Divider />
                {username ?
                    <List>{secondaryListItems}</List>
                    :
                    <List>{otherListItems}</List>
                }
            </Drawer>
        </>
    )
}


export default Navbar
