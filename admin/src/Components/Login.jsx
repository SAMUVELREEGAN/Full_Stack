import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Login = ({setToken}) => {
    const[email,setemail] = useState("")
    const[password,setPassword] = useState("")
    const navigate = useNavigate()

    const handler = async(e) =>{
        try{
            e.preventDefault()
            const response = await axios.post("http://localhost:8000/adminlogin",{email,password})
            if (response.data.success) {
                setToken(response.data.token)
                console.log(response.data.token);
                navigate('/')
                
            } else {
                toast.error(response.data.message)
            }
        }catch (error) {
            console.log(error);
            toast.error(error.message)
        }
        
    }

    
  return (
    <div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"90vh"}}>
                <form onSubmit={handler}>
                <div style={{display:"flex",flexDirection:"column",alignItems:"center"}} className='login'>
                    <h2>Login</h2>
                <input type="text" placeholder='Email' className="mt-4" onChange={(e)=>setemail(e.target.value)}/>
                <input type="password" placeholder='Password' className="mt-4 mb-4" onChange={(e)=>setPassword(e.target.value)}/>
                <button type='submit'>Login</button>
                </div>
                </form>
        </div>
    </div>
  )
}

export default Login