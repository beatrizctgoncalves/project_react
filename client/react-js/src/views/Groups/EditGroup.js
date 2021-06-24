import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer.js';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { editGroup, getSpecificGroup } from '../Services/BasicService';
import Button from '@material-ui/core/Button';
import Alert from 'react-bootstrap/Alert'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoBack from '../Components/GoBack';


function EditGroup(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params

    const [updatedGroup, setUpdatedGroup] = useState({})

    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const [groups, setGroups] = useState([])
    const [edit, setEdit] = useState(false)

    const [toEdit, setToEdit] = useState(false)


    useEffect(() => {
        getSpecificGroup(id).then(resp => setGroup(resp.message))
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])

    function handleGroupEdit() {
        editGroup(id, updatedGroup)
            .then(resp => {
                getSpecificGroup(resp.message.id)
                    .then(group => {
                        let aux = groups
                        aux.push(group.message)
                        setGroups(aux)
                        setToEdit(false)
                    })
            })
            .catch(err => {
                setError({ errorMessage: err.body, shouldShow: true });
                toast.error(err.body)
            })
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setUpdatedGroup({ ...updatedGroup, [name]: value })
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
                <h2 className="text-center mt-0">Editing Group</h2>
                <hr className="divider" />

                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 text-center">
                        <div className="container px-4 px-lg-2 mt-2">
                            <div className="row gx-2 gx-lg-2 row-cols-2 row-cols-md-3 row-cols-xl-2 justify-content-center">
                                <div className="col mb-5">
                                    <div className="card h-100">
                                        <div className="card-body p-4">
                                            <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                <div className="text-center">
                                                    <h3 className="h4 mb-2">{group.name}</h3>
                                                    <br />
                                                    <input
                                                        variant="outlined"
                                                        margin="normal"
                                                        className="form-control"
                                                        required
                                                        fullWidth
                                                        type="text"
                                                        name="name"
                                                        placeholder="Enter New Group Name"
                                                        onChange={handleChange}
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
                                                        onChange={handleChange}
                                                        placeholder="Enter New Group Description"
                                                    />
                                                    <br /><br />

                                                    <Button
                                                        type="button"
                                                        className="button1"
                                                        fullWidth
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={handleGroupEdit}
                                                    >
                                                        Save Changes
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
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


export default EditGroup;