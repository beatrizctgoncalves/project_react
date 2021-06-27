import { useEffect, useState } from "react";
import { getRankings } from "../Services/BasicService";
import { ToastContainer, toast } from 'react-toastify';


function Sprint(props){
    const { id } = props.match.params
    const[sprints,setSprints] = useState([])

    useEffect(()=>{
        getRankings(id)
            .then(resp =>{
                setSprints(resp.message)
            }).catch(err => {
                console.log(err)
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



    },[])
    return(
    <div>
        <ToastContainer/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <ul>
            {sprints?sprints.map(sprint => {
                console.log(sprint)

                return(
                <li key={sprint}>
                    {sprint.SprintTitle}
                    <br/>
                    <ul>
                        {sprint.Scores.map(score => {
                             console.log(score)
                            return(<li key = {score}>{score.AppUsername} = {score.Points}</li>)
                        })}
                    </ul>
                     </li>)
            }):"there is no sprints"}
        </ul>

    </div>
    )
}


export default Sprint;