import React, { useEffect, useState, useParams } from 'react'
import Box from '@material-ui/core/Box';
import { addMemberToGroup, getSpecificGroup, addProjectToGroup } from '../Services/BasicService.js';
import Button from '@material-ui/core/Button';
import Alert from 'react-bootstrap/Alert'
import Footer from '../Components/Footer.js';
import GoBack from '../Components/GoBack';
import { Link } from 'react-router-dom';


function Group(props) {
    const [group, setGroup] = useState({})
    const { id } = props.match.params

    const [toAddMembers, setAddMembers] = useState(false)
    const [newMember, setNewMember] = useState("")
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const [toAddProjects, setAddProjects] = useState(false)
    const [newProject, setNewProject] = useState("")

    useEffect(() => {
        getSpecificGroup(id)
            .then(resp => setGroup(resp.message))
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }, [])


    const handleMember = event => {
        setNewMember(event.target.value)
    }

    function handleToEditMembersChange() {
        if (toAddMembers) {
            setAddMembers(false)
        } else {
            setAddMembers(true)
        }
    }

    function handleAddMembers() {
        addMemberToGroup(id, newMember)
            .then(resp => {
                let aux = group;
                aux.members.push(newMember)
                setGroup(aux)
                setAddMembers(false)
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }


    const handleProject = event => {
        setNewProject(event.target.value)
    }

    function handleToEditProjjectsChange() {
        if (toAddProjects) {
            setAddProjects(false)
        } else {
            setAddProjects(true)
        }
    }

    function handleAddProjects() {
        addProjectToGroup(id, newProject)
            .then(resp => {
                let aux = group;
                aux.members.push(newProject)
                setGroup(aux)
                setAddProjects(false)
            })
            .catch(err => setError({ errorMessage: err.body, shouldShow: true }))
    }

    return (
        <section className="page-section">
            <div className="container px-2 px-lg-5">
                <h2 className="text-center mt-0">Your Group Details</h2>
                <hr className="divider" />
                <div className="row text-center">
                    {
                        error.shouldShow &&
                        <Alert variant={'warning'} onClose={() => setError(false)} dismissible>
                            {error.errorMessage}
                        </Alert>
                    }

                    <div className="container px-4 px-lg-2 mt-2">
                        <div className="row gx-2 gx-lg-2 row-cols-2 row-cols-md-3 row-cols-xl-2 justify-content-center">
                            <div className="col mb-5">
                                <div className="card h-100">
                                    <div className="card-body p-4">
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div className="text-center">
                                                <p className="h3 mb-2">{group.name}</p>
                                                <Link className="btn btn-outline-dark mt-auto" type="button" to={`/groups/${group.id}/edit`}>
                                                    <i className="bi bi-pencil-fill"></i>
                                                </Link>

                                                <br /><br />
                                                <h5>{group.description}</h5>
                                                <br />
                                                <p className="lead">Owner:</p>
                                                <li>{group.owner}</li>
                                                <br /><br />

                                                <p className="lead">Members:</p>
                                                {group.members ? group.members.map(username => {
                                                    return <li>{username}</li>
                                                }) : ""}
                                                <br /><br />

                                                <p className="lead">Projects:</p>
                                                {group.projects ? group.projects.map(project => {
                                                    return <li>{project}</li>
                                                }) : ""}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {toAddMembers ?
                    <div className="container px-4 px-lg-2 mt-2">
                        <div className="row gx-2 gx-lg-2 row-cols-2 row-cols-md-3 row-cols-xl-2 justify-content-center">
                            <div className="col mb-5">
                                <div className="card h-100">
                                    <div className="card-body p-4">
                                        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                            <div className="text-center">
                                                <h3 className="h4 mb-2">Insert New Members</h3>
                                                <br />
                                                <input
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    type="text"
                                                    name="newMember"
                                                    className="form-control"
                                                    placeholder="Enter new Member"
                                                    value={newMember}
                                                    onChange={handleMember}
                                                />
                                                <br /><br />

                                                <Button
                                                    type="button"
                                                    className="button1"
                                                    fullWidth
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={handleAddMembers}
                                                >
                                                    Add Member
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> : ""}

                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-lg-8 text-center">
                        <button className="btn btn-groups btn-xl" type="button" onClick={handleToEditMembersChange}>
                            <i className="bi bi-person-plus-fill">   </i>
                            {toAddMembers ? "" : "Add Members"}
                        </button>

                        {toAddProjects ?
                            <div className="container px-4 px-lg-2 mt-2">
                                <div className="row gx-2 gx-lg-2 row-cols-2 row-cols-md-3 row-cols-xl-2 justify-content-center">
                                    <div className="col mb-5">
                                        <div className="card h-100">
                                            <div className="card-body p-4">
                                                <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                                                    <div className="text-center">
                                                        <h3 className="h4 mb-2">Insert New Projects</h3>
                                                        <br />
                                                        <input
                                                            variant="outlined"
                                                            margin="normal"
                                                            required
                                                            fullWidth
                                                            type="text"
                                                            name="newProject"
                                                            className="form-control"
                                                            placeholder="Enter New Project Identifier"
                                                            value={newProject}
                                                            onChange={handleProject}
                                                        />
                                                        <br /><br />

                                                        <Button
                                                            type="button"
                                                            className="button1"
                                                            fullWidth
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={handleAddProjects}
                                                        >
                                                            Add Project
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> : ""}

                        <button className="btn btn-groups btn-xl" type="button" onClick={handleToEditProjjectsChange}>
                            <i className="bi bi-patch-plus-fill">    </i>
                            {toAddProjects ? "" : "Add Projects"}
                        </button>
                    </div>
                </div>
                <br />
                <Box mt={4}>
                    <GoBack />
                </Box>
            </div>

            <Box mt={8}>
                <Footer />
            </Box>
        </section>
    )
}

export default Group