import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';


const TodoHome = () => {
    const [searchData, setSearchData] = useState('');
    const [todoData, setTodoData] = useState([]);
    const tokenId = localStorage.getItem('tokenId');

    const headers = {
        Authorization: `Bearer ${tokenId}`,
    }
    // console.log(headers);


    useEffect((tokenId) => {
        async function fetchData() {

            try {
                const allData = await axios.get("https://todos-api-aeaf.onrender.com/api/v1/todo/getAll",
                    {
                        headers: headers
                    }
                )
                console.log(allData);
                // console.log(allData.data);

                setTodoData(allData.data);
                // console.log(todoData, "fdgfgghggy");
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])

    return (
        <>
            <div className='flex justify-around mt-10'>
                <Link to='/createtodo'>
                    <div className='muiBtn'>
                        <Button variant="contained">Add Todo</Button>
                    </div>
                </Link>
                <div>
                    <input type='text' placeholder='Search todos..' value={searchData} className='border-2' onChange={(e) => setSearchData(e.target.value)} />
                    <Button variant="contained">Add Todo</Button>
                </div>
                <div className='border-2'>
                    <select>
                        <option value="all">All</option>
                        <option value="active">Active</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>
            <div>
                {/* {JSON.stringify(todoData)} */}
                {
                    todoData?.map((elm) => (
                        <div key={elm._id} className='flex justify-center items-center mt-10'>
                            <div className='bg-slate-300 p-16'>
                                <Link to={`/todohome/${elm._id}`}>
                                    <div className='font-bold'>{elm.name}</div>
                                </Link>
                                <div>
                                    <p className='font-light'>description</p>
                                    {elm.description}
                                </div>
                                <div> <p className='font-light'>Status</p>{elm.status}</div>
                                <div> <p className='font-light'></p>{elm._id}</div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </>
    )
}

export default TodoHome;