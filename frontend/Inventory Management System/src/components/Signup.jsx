import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'


function Signup() {

    const history = useHistory();

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/createuser", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, password })
            })
            const json = await response.json()
            console.log(json);

            if (json.success) {
                history.push('/login')
            }

        }
        catch (error) {
            console.log(error)
        }

    }

    return (

        <div id="container">
            <form id='qr-form' onSubmit={handleSubmit}>
                <h2>Sign Up</h2>


                <div className='form-input'>
                    <label>Name:
                    </label>
                    <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
                </div>

                <div className='form-input'>
                    <label>Email:
                    </label>
                    <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>

                <div className='form-input'>
                    <label>password:
                    </label>
                    <input type="text" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <button type="submit" >Create User</button>

            </form>
        </div>

    )
}


export default Signup