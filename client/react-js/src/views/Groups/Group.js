import React, { useEffect,useState,useParams } from 'react'
import Box from '@material-ui/core/Box';
import { addMemberToGroup, editGroup, getSpecificGroup } from '../Services/BasicService.js';
import Button from '@material-ui/core/Button';
import Alert from 'react-bootstrap/Alert'


function Group(props) {

        
    const[group,setGroup] = useState({})
    const {id}  = props.match.params

    const[toAddMembers,setAddMembers] = useState(false)
    const[toEdit,setToEdist] = useState(false)


    const[newMember,setNewMember] = useState("")
    const [error, setError] = useState({ errorMessage: undefined, shouldShow: false })

    const[values,setValues] = useState({})

    useEffect(()=>{
        
        console.log(id)
       
        getSpecificGroup(id).then(resp =>{
            console.log(resp.message)
            setGroup(resp.message)
        }).catch(err=>{
            console.log(err)
            setError({ errorMessage: err.body, shouldShow: true });
        })
        
    },[])

    const handleChange = (event) =>{ 
        console.log(event.target.value)
        console.log(values)
        const {name, value} = event.target
        setValues({ ...values,  [name]: value })
    }


    const handleMember= event => {
        console.log(event.target.value)
        setNewMember(event.target.value)
    }

    
    function handleToAddChange(){
           if(toAddMembers){
            setAddMembers(false)
           }
           else setAddMembers(true)
        }


        function handleToEditChange(){
            if(toEdit){
             setToEdist(false)
            }
            else setToEdist(true)
         }

       

        function handleAddMembers(){
            console.log(newMember)
            addMemberToGroup(id,newMember)
            .then(resp =>{   
                let aux = group;
                 aux.members.push(newMember)
                setGroup(aux)
                 setAddMembers(false) 
            }).catch(err => {
                console.log(err)
                setError({ errorMessage: err.body, shouldShow: true });
            })
        }


        function handleToEditGroup(){
            editGroup(id,values)
            .then(resp => {
                getSpecificGroup(resp.message.id).then(resp =>{
                    console.log(resp.message)
                    setGroup(resp.message)
                }).catch(err=>{
                    console.log(err)
                    setError({ errorMessage: err.body, shouldShow: true });
                })
                
            })
          
        }
    

  

    return (
        <section class="page-section">
            <div class="container px-2 px-lg-5">
                <h2 class="text-center mt-0">Your Groups</h2>
                <hr class="divider" />
                <div class="row text-center">
                {
                error.shouldShow &&
                <Alert variant={'warning'} onClose={() => setError(false)} dismissible>
                    {error.errorMessage}
                </Alert>
                }
                    <h3>{group.description}</h3>
                    <ul>
                        <li>{group.name}</li>
                        <li>{group.description}</li>
                        <li>{group.email}</li>
                        <ul>
                        {group.members?group.members.map(username=>{
                            return <li>{username}</li>
                        }):""}
                        </ul>
                        {toAddMembers? 
                            <>
                            <label><h3>Insert New Members</h3></label>
                             <input
                                type="text" 
                                name = "newMember"
                                className="form-control" 
                                placeholder="Enter new Member" 
                                value={newMember}
                                onChange= {handleMember}
                            /> 

               
                <Button  className="button1" onClick = {handleAddMembers}> Add Member </Button>

            </>:""}
                                  
                        
                        <Button onClick = {handleToAddChange}>{toAddMembers?"-":"Add Members"} </Button>
                        <h3>Sprints</h3>
                        <ul>
                            {group.sprints?group.sprints.map(sprint=>{
                                 console.log("sprint")
                                console.log(sprint)
                            return <li>{sprint.title}</li>
                             }):""}
                        </ul>

                        <Button onClick = {handleToEditChange}>{toEdit?"-":"Update"} </Button>


                        
                    {toEdit?
                    <>
                <h3>Update Group</h3>
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
                    <Button   type="button" className="button1" onClick = {handleToEditGroup}>Update</Button>
                    <br/>  

                    </>
                    
                    
                    
                    :""}
                        
                          
                        
                        
                       
                    </ul>              
                </div>

            </div>
            <Box mt={8}>
                
            </Box>
        </section>
 
    )
}






export default Group