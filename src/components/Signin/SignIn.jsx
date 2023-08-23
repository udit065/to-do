import React, { useState } from 'react';
import LockIcon from '@mui/icons-material/Lock';
import { Link, redirect, useNavigate, useHistory } from 'react-router-dom';
import Button from '@mui/material/Button';
import axios from 'axios';


const Signin = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();



    const handleApi = async () => {
        try {
            // console.log(name, email, password);
            const response = await axios.post('https://todos-api-aeaf.onrender.com/api/v1/auth/register', {
                name: name,
                email: email,
                password: password
            });

            console.log(response.data);

            if (response.status === 201) {
                console.log("success");
                navigate("/login");
            }

        } catch (error) {
            console.log(error);
        }
    };


    return (
        <form>
            <div className='flex justify-center items-center flex-col'>
                <div>
                    <span className='lock-icon-span'>
                        <LockIcon className='lock-icon' />
                    </span>
                </div>
                <div className='flex flex-col'>
                    <label className='mb-4'>Username</label>
                    <input type='text' placeholder='Username' className='border-4' value={name} onChange={(e) => setName(e.target.value)} />
                    <label className='mb-4'>Email</label>
                    <input type='text' placeholder='Email' className='border-4' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className='mb-4'>Password</label>
                    <input type='text' placeholder='Password' className='border-4' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='muiBtn'>
                    <Button variant="contained" onClick={handleApi}>SIGNUP</Button>
                </div>
                <div>
                    <p>Already have an account?  </p>
                    <Link to="/login">
                        Login
                    </Link>
                </div>
            </div>
        </form>

    )
}

export default Signin;