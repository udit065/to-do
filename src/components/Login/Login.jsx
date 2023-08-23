import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.log(email, password);
        await axios.post("https://todos-api-aeaf.onrender.com/api/v1/auth/login", {
            email: email,
            password: password,
        }).then(result => {
            console.log(result);
            if (result.status == 200) {
                localStorage.setItem("tokenId", result.data.data.token);
                console.log("success login");
                navigate("/todohome")
            }
        }).catch(error => {
            console.log(error);
        })
    };


    return (
        <form>
            <div className="flex justify-center items-center flex-col">
                <div>
                    <span className='lock-icon-span'>
                        <LockIcon className='lock-icon' />
                    </span>
                </div>
                <div className='flex flex-col'>
                    <label className='mb-4'>Email</label>
                    <input type="text" placeholder='Email' className='border-4' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className='mb-4'>Password</label>
                    <input type="text" placeholder='Password' className='border-4' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='muiBtn'>
                    <Button variant="contained" onClick={handleLogin}>LOGIN</Button>
                </div>
                <div>
                    <p>Don't have an account?  </p>
                    <Link to="/signin">
                        Signin
                    </Link>
                </div>
            </div>
        </form>
    )
}

export default Login