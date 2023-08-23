import React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='flex justify-center items-center w-full h-screen bg-gray-200'>
            <div className='mr-10'>
                <Link to="login" >
                    <Button variant="contained">LOGIN</Button>
                </Link>
            </div>
            <div>
                <Link to="signin">
                    <Button variant="contained">SIGNUP</Button>
                </Link>
            </div>
        </div>
    )
}

export default Home;
