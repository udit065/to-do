import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import axios from 'axios';

const Edit = () => {

    const [field, setField] = useState([]);
    // console.log(field);
    const tokenId = localStorage.getItem('tokenId');
    const param = useParams();
    // console.log(param)

    useEffect(() => {
        axios.get(`https://todos-api-aeaf.onrender.com/api/v1/todo/getById?id=${param.id}`, {
            headers: {
                Authorization: `Bearer ${tokenId}`,
            }
        }).then((res) => {
            const data = res.data;
            // console.log(data);
            setField(data);

        })
    }, [param.id]);

    const handleNameChange = (event) => {
        const updatedField = { ...field, name: event.target.value };
        // console.log(field);
        setField(updatedField);
        // console.log(updatedField);
    };
    // console.log(updatedField);
    const handleDescriptionChange = (event) => {
        const updatedField = { ...field, description: event.target.value };
        setField(updatedField);
    };

    const handleStatusChange = (event) => {
        const updatedField = { ...field, status: event.target.checked };
        setField(updatedField);
    };

    //Update API
    const createTodoApi = () => {
        axios.put(`https://todos-api-aeaf.onrender.com/api/v1/todo/update?id=${param.id}`, {
            body: field,
        }, {
            headers: {
                Authorization: `Bearer + ${tokenId}`,
            }
        }).then((res) => {
            console.log(res.data);
        })
    };


    return (
        <div>
            <div>
                <h2>Add Todo</h2>
            </div>
            <div className='flex flex-col w-40'>
                <input type='text' className='border-4' value={field.name} onChange={handleNameChange} />
                <input type='text' className='border-4' value={field.description} onChange={handleDescriptionChange} />
            </div>
            <div className='flex'>
                <p>Status :</p>
                <input type="checkbox" value={field.status} onChange={handleStatusChange} />
            </div>
            <div className='muiBtn'>
                <Button variant="contained" onClick={createTodoApi}>UPDATE</Button>
                <Link to={`/todohome/${param.id}`}>
                    <ReplyAllIcon className='ml-10 go-back' />
                </Link>
            </div>
            {console.log(field)}
        </div>
    )
}

export default Edit