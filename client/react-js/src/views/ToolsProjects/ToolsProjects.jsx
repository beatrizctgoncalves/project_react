import { useEffect } from "react"
import { getToolProjects } from '../Services/BasicService';


function ToolsProjects(props){
    const owner = window.sessionStorage.getItem("username")
    useEffect(()=>{
        getToolProjects()
    })
    return(<p></p>)
}


export default ToolsProjects