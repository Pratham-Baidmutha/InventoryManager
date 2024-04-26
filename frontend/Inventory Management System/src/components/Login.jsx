import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'


function Login() {
    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({ email , password })
            })
            const json = await response.json()
            console.log(json);

            if (json.success) {
                localStorage.setItem("authToken",json.authToken)
                // console.log(localStorage.getItem("authToken"))
                // console.log("loggedIn")
                history.push('/')
                window.location.reload()
            }     
            
        }

        catch (error) {
            console.log(error)
        }
    }

  return (
    <div id="container">
    <form id='qr-form' onSubmit={handleSubmit}>
        <h2>Login</h2>

        <div className='form-input'>
        <label>Email:
        </label>
            <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        
        <div className='form-input'>
        <label>Password:
        </label>
            <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>

        <button type="submit">Login</button>

    </form>
</div>
  )
}

export default Login