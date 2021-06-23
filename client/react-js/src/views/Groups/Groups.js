import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer.js';
import Box from '@material-ui/core/Box';
import { Link } from 'react-router-dom';
import { createGroup, deleteGroup, getSpecificGroup, getUserGroups } from '../Services/BasicService';
import Button from '@material-ui/core/Button';
import Alert from 'react-bootstrap/Alert'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





function Groups() {

    const[groups,setGroups] = useState([])
    const[edit,setEdit] = useState(false)

    const [toCreate, setToCreate] = useState(false)


   
    const owner = window.sessionStorage.getItem("username")
    const [newGroup,setNewGroup] = useState({owner:owner})
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    useEffect(()=>{
        
        console.log(owner)
        getUserGroups(owner).then(resp =>{
            console.log(resp.message)
            setGroups(resp.message)


        }).catch(err=>{
            console.log(err)
            setError({ errorMessage: err.body, shouldShow: true });
            toast.error(err.body,{
                position: "top-left",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })

        })
    },[])

    function handleGroupDelete(groupId){
        deleteGroup(groupId)
        .then(resp => {
            
            let aux =  groups.filter(group =>{
                if(group.id !== groupId ){
                    return group
                }
            })
            setGroups(aux)
            setEdit(false)

        }).catch(err => {
            console.log(err)
            setError({ errorMessage: err.body, shouldShow: true });
        })

    }



    function handleGroupCreate(){
        console.log("creating Group")
        createGroup(newGroup)
            .then(resp => {
                getSpecificGroup(resp.message.id)
                    .then(group => {
                        let aux = groups
                        aux.push(group.message)
                         setGroups(aux)
                         setToCreate(false)
                    })
                    
        })
        .catch(err => {
            console.log(err)
            setError({ errorMessage: err.body, shouldShow: true });
            toast.error(err.body)
        } )

    }


    const handleChange = (event) =>{ 
        console.log(event.target.value)
        console.log(newGroup)
        const {name, value} = event.target
        setNewGroup({ ...newGroup,  [name]: value })
    }

    function handleToEditChange(){
        if(edit){
            setEdit(false)
        }
        else setEdit(true)
     }


     function handleToCreate(){
        if(toCreate){
            setToCreate(false)
        }
        else setToCreate(true)
     }

     

    function notify(){
    toast("Wow so easy!",{
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
        <section class="page-section">
            <div class="container px-2 px-lg-5">
                <h2 class="text-center mt-0">Your Groups</h2>
                <hr class="divider" />
                <div class="row text-center">
            
                <ToastContainer/>

                    {edit?
                    <>
                       <ul>
                        {groups?groups.map(group=>{
                            return(
                                <li key = {group.name}><Link to={`/groups/${group.id}`}>{group.name}</Link>
                                    <Button  onClick={handleGroupDelete.bind(null,group.id)} >Delete</Button>
                                </li>
                            
                           )
                           }):""}
                    </ul> 
                    
                    </>
                    :
                    <>

                    <div>

                    <ul>
                        {groups?groups.map(group=>{
                            return(
                                <li key = {group.name}><Link to={`/groups/${group.id}`}>{group.name}</Link>
                                </li>
                            
                           )
                           }):""}
                    </ul> 
                 </div>
                    
                    
                    </>}

                    <Button   type="button" className="button1" onClick = {handleToEditChange}>{edit?"-":"Delete"}</Button>

                    {toCreate?
                    <>
                <h3>Create Group</h3>
                <label>Name</label>
                <br/>
                    <input 
                    className = "form-control"
                    type="text"
                    name = "name"  
                    placeholder="Enter Group name"
                    onChange={handleChange}
                   
                    />
                    <br/>
                    <label>Description</label>
                    <br/>
                    <input
                        className = "form-control"
                        type="text" 
                        name = "description"
                        onChange={handleChange}
                        placeholder="Enter project Description" 
                        
                    />
                    <br/>
        
                    <br/>
                    <Button   type="button" className="button1" onClick = {handleGroupCreate}>Create</Button>
                    <br/>  

                    </>
                    
                    
                    
                    :""}
                    <Button   type="button" className="button1" onClick = {handleToCreate}>{toCreate?"-":"Create"}</Button>
                  

                </div>
            
            <Box mt={8}>
                <Footer />
            </Box>
           </div> 
        </section>
    )
}

export default Groups;