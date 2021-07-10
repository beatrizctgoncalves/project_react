import { loginGoogle } from "../../Services/BasicService"
import { ButtonRed } from '../Styles/ColorButtons';

function SignInG(){

   function  handlebutton(){
       loginGoogle().then(resp => {
           console.log("resp")
           console.log(resp)
       }).catch(err => {
           console.log(err)
       })

    }
    return(
        <div>
            <p>ola</p>
            <ButtonRed size="small" color="primary" onClick={handlebutton}>
        </ButtonRed>
        </div>
        
    )
}

export default SignInG;