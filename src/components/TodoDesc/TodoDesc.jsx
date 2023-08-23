import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

const TodoDesc = () => {
    let params = useParams();
    // console.log(params);
    const tokenId = localStorage.getItem('tokenId');
    const [todoData, setTodoData] = useState([]);
    const navigate = useNavigate();

    const headers = {
        Authorization: `Bearer ${tokenId}`,
    }
    //Get todos by id
    useEffect(() => {
        async function tData() {
            try {
                const tdData = await axios.get(`https://todos-api-aeaf.onrender.com/api/v1/todo/getById?id=${params.id}`, {
                    headers: headers
                });
                console.log(tdData);
                setTodoData(tdData.data);
                // console.log(todoData, "fdgfgghggy");
            } catch (error) {
                console.log(error);
            }
        }
        tData();
    }, [params.id])

    //Delete api
    const handleDelete = async () => {
        const result = await axios.delete(`https://todos-api-aeaf.onrender.com/api/v1/todo/delete?id=${params.id}`, {
            headers: headers
        });
        if (result.status == 200) {
            navigate('/todohome');
        }
    }

    //Edit api setData
    const editApi = () => {
        navigate(`/todohome/edit/${params.id}`);
    }
    return (
        <div>
            <div key={todoData._id} className='flex justify-center items-center mt-10'>
                <div className='bg-slate-300 p-16'>
                    <div className='font-bold'>{todoData.name}</div>
                    <div>
                        <p className='font-light'>Description:</p>
                        {todoData.description}
                    </div>
                    <div> <p className='font-light'>Status:</p>{todoData.status}</div>
                    <div> <p className='font-light'>Created At:</p>{todoData.createdAt}</div>
                    <div> <p className='font-light'>Updated At:</p>{todoData.updatedAt}</div>
                    <div className='muiBtn'>
                        <Button variant="contained" onClick={editApi}>EDIT</Button>
                        <Button variant="contained" onClick={handleDelete}>DELETE</Button>
                        <Link to={"/todohome"}>
                            <ReplyAllIcon className='ml-10 go-back' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoDesc