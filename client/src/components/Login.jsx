import { useEffect, useState } from 'react';
import axios from "axios";
import UserToken from './UserToken';


function Login(){

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginSucces, setLoginSuccess] = useState(false);
    const [loginAttempt, setLoginAttempt] = useState(1);

    const { token, removeToken, setToken } = UserToken();

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        if (storedToken) {
            setLoginSuccess(true);
        }
    }, [loginAttempt]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://127.0.0.1:5000/token", {
                username,
                password,
            })
            if (response.status === 200) {
                console.log("Login successful");
                setToken(response.data.access_token);
                setLoginSuccess(true)
            } else {
                console.log("Login failed");
            }
            console.log(response.status);
        } catch (error) {
            console.log(error)
        } finally {
            setLoginAttempt(loginAttempt + 1)
            console.log("Logins attempted: " + loginAttempt)
        }
    };

    return(
        <>
        <div className='login-form-container'>
            <h2>Login</h2>
            {loginSucces && <h1>LOGIN SUCCESSFUL</h1>}
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