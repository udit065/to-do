import React, { useState } from 'react';
import Button from '@mui/material/Button';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateTodo = () => {
    const [taskName, setTaskName] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [status, setStatus] = useState(false);
    const tokenId = localStorage.getItem('tokenId');
    // console.log(tokenId);
    const navigate = useNavigate();

    const todotData = {
        name: taskName,
        description: taskDesc,
        status: status
    };

    const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenId}`,
        Accept: "*/*",
        // 'Accept-Encoding': "gzip, deflate, br",
        "Cache-Control": "no-cache",
        // Connection: "keep-alive"
    }

    const createTodoApi = async () => {
        console.log(taskName, taskDesc, status);
        try {
            const response = await axios.post("https://todos-api-aeaf.onrender.com/api/v1/todo/create",
                todotData,
                {
                    headers: headers
                });
            console.log(response.data);
            if (response.status == 200) {
                navigate('/todohome')
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div>
            <div>
                <h2>Add Todo</h2>
            </div>
            <div className='flex flex-col w-40'>
                <input type='text' placeholder='Name' className='border-4' value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                <input type='text' placeholder='Description' className='border-4' value={taskDesc} onChange={(e) => setTaskDesc(e.target.value)} />
            </div>
            <div className='flex'>
                <p>Status :</p>
                <input value="completed" type="checkbox" checked={status} onChange={() => setStatus(!status)} />
            </div>
            <div className='muiBtn'>
                <Button variant="contained" onClick={createTodoApi}>Add Todo</Button>
                <Link to={"/todohome"}>
                    <ReplyAllIcon className='ml-10 go-back' />
                </Link>
            </div>
        </div>
    )
}

export default CreateTodo; 