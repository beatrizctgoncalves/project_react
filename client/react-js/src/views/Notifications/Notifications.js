import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer.js';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { getUserNotifications, removeUserNotification } from '../Services/BasicService';
import Button from '@material-ui/core/Button';
import Alert from 'react-bootstrap/Alert'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoBack from '../Components/GoBack';


function Notifications() {
    const [notifications, setNotifications] = useState([])
    const [edit, setEdit] = useState(false)

    const [toCreate, setToCreate] = useState(false)

    const username = window.sessionStorage.getItem("username")
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    useEffect(() => {
        getUserNotifications(username)
            .then(resp => setNotifications(resp.message))
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
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
    }, [])

    function handleNotificationReject(groupId) {
        removeUserNotification(username, groupId)
            .then(resp => {
                let aux = notifications.filter(notification => {
                    if (notification.group_id !== groupId) {
                        return notification
                    }
                })
                setNotifications(aux)
                setEdit(false)
            })
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
            })
    }

    function handleNotificationAccept() {
        //TODO
    }


    function notify() {
        toast("Wow so easy!", {
            position: "top-left",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }


    return (
        <section className="page-section">
            <div className="container px-2 px-lg-5">
                <h2 className="text-center mt-0">Your Notifications</h2>
                <hr className="divider" />

                <div className="container px-4 px-lg-5 mt-5">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                        {notifications ? notifications.map(group => {
                            return (
                                <div className="col mb-5">
                                    <div className="card h-100">
                                        <div className="card-body p-4">
                                            <div className="text-center">
                                                <h3 className="h4 mb-2" key={group.name}>
                                                    <Link color="inherit" to={`/notifications/${group.id}`}>{group.name} </Link>
                                                </h3>
                                                {group.description}
                                            </div>
                                        </div>

                                        <div className="row gx-4 gx-lg-5 justify-content-center">
                                            <div className="col-lg-8 text-center">
                                                <Link className="btn btn-outline-dark mt-auto" type="button" to={`/notifications/${group.id}/edit`}>
                                                    <i className="bi bi-pencil-fill"></i>
                                                </Link>
                                                <button className="btn btn-outline-dark mt-auto" type="button" onClick={"handleGroupDelete.bind(null, group.id)"}>
                                                    <i className="bi bi-trash-fill"></i>
                                                </button>
                                                <br /><br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : ""}
                    </div>
                </div>

                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 text-center">
                        {toCreate ?
                            <div className="container px-4 px-lg-2 mt-2">
                                <div className="row gx-2 gx-lg-2 row-cols-2 row-cols-md-3 row-cols-xl-2 justify-content-center">
                                    <div className="col mb-5 card h-100 card-body p-4">
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
                                            <h3 className="h4 mb-2">Create New Group</h3>
                                            <br />
                                            <input
                                                variant="outlined"
                                                margin="normal"
                                                className="form-control"
                                                required
                                                fullWidth
                                                type="text"
                                                name="name"
                                                placeholder="Enter Group Name"
                                                onChange={"handleChange"}
                                            />
                                            <br />
                                            <input
                                                variant="outlined"
                                                margin="normal"
                                                className="form-control"
                                                required
                                                fullWidth
                                                type="text"
                                                name="description"
                                                onChange={"handleChange"}
                                                placeholder="Enter Group Description"
                                            />
                                            <br /><br />

                                            <Button
                                                type="button"
                                                className="button1"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                onClick={"handleGroupCreate"}
                                            >
                                                Create Group
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : ""}
                        <button className="btn btn-groups btn-xl" type="button" onClick={"handleToCreate"}>
                            <i className="bi bi-plus-circle-fill">         </i>
                            {toCreate ? "" : "Create Group"}
                        </button>
                        <Box mt={4}>
                            <GoBack />
                        </Box>
                    </div>
                </div>
            </div>

            <Box mt={8}>
                <Footer />
            </Box>
        </section >
    )
}


export default Notifications;