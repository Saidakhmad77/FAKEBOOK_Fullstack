import { useState } from 'react';
import axios from "axios";


function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:5000/login", {
                username,
                password,
            })
            console.log(response.status);
        } catch (error) {
            console.log(error)
        }
    };

    return(
        <>
        <div className='login-form-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <input 
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='input-container'>
                    <input 
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type='submit' className='register-btn'>Login</button>

            </form>
        </div>
        </>
    )
};


export default Login;