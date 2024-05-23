import Form from "../Form"
import { UserDataTypes } from "../types"
import axios from "axios"

const Register = () => {
  const handleRegister =async(data:UserDataTypes)=>{
    // console.log(data);
    const response = await axios.post('http://localhost:3000/register',data)
    

  }
  return (
    <Form type="register" onSubmit = {handleRegister}/>
  )
}

export default Register