import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Dna, RotatingLines, MagnifyingGlass } from 'react-loader-spinner';


const TodoHome = () => {
    const [searchData, setSearchData] = useState('');
    const [todoData, setTodoData] = useState([]);
    const tokenId = localStorage.getItem('tokenId');
    const navigate = useNavigate();
    // console.log(todoData)
    const [selectValue, setSelectValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [filterLoading, setFilterLoading] = useState(false);

    const headers = {
        Authorization: `Bearer ${tokenId}`,
    }
    // console.log(headers);

    //Get API 
    useEffect((tokenId) => {
        async function fetchData() {

            try {
                const allData = await axios.get("https://todos-api-aeaf.onrender.com/api/v1/todo/getAll",
                    {
                        headers: headers
                    }
                )
                // console.log(allData);
                // console.log(allData.data);
                // console.log(allData.data[1].status);

                setTodoData(allData.data);
                setLoading(false);
                // console.log(todoData, "fdgfgghggy");
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [])

    //Search Api 
    const handleSearch = () => {
        axios.get(`https://todos-api-aeaf.onrender.com/api/v1/todo/getAll?search=${searchData}`, {
            headers: {
                Authorization: `Bearer ${tokenId}`
            },
        }).then((res) => {
            // console.log(res.data);
            setTodoData(res.data);
        });
    };

    useEffect(() => {
        handleSearch();
    }, [tokenId]);

    const handleDropdown = (event) => {
        setSelectValue(event.target.value);
        setFilterLoading(true);
        filterStatus(event.target.value);
    }

    const filterStatus = async (id) => {
        await axios.get(`https://todos-api-aeaf.onrender.com/api/v1/todo/getAll?search=${id}`, {
            headers: {
                Authorization: `Bearer ${tokenId}`
            },
        }).then((res) => {
            // console.log(res.data);
            setTodoData(res.data);
            setFilterLoading(false);

        });
    };


    return (
        <>
            <div className='flex justify-around mt-10'>
                <Link to='/createtodo'>
                    <div className='muiBtn'>
                        <Button variant="contained">Add Todo</Button>
                    </div>
                </Link>
                <div>
                    <input type='text' placeholder='Search todos..' className='border-2' value={searchData} onChange={(e) => setSearchData(e.target.value)} />
                    <Button variant="contained" onClick={handleSearch}>Search</Button>
                </div>
                {filterLoading ? (
                    <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        width="40"
                        visible={true}
                    />
                ) :
                    (
                        <div className='border-2'>
                            <select value={selectValue} onChange={handleDropdown}>
                                <option value="">All</option>
                                <option value="false">Pending</option>
                                <option value="true">Completed</option>
                            </select >
                        </div >
                    )


                }
            </div >
            <div className='flex flex-wrap gap-2'>
                {/* {JSON.stringify(todoData)} */}
                {loading ? (
                    <div className="circle-spin">
                        <Dna
                            visible={true}
                            height="80"
                            width="80"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                    </div>
                ) : (
                    // {
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
                                <div> <p className='font-light'>Status</p>{elm.status ? "Completed" : "Pending"}</div>
                                {/* <div> <p className='font-light'></p>{elm._id}</div> */}
                            </div>
                        </div>
                    ))
                    // }
                )}
            </div>
        </>
    )
}

export default TodoHome;