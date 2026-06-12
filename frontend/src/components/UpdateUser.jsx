import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import axios  from "axios";
import env from 'dotenv';
env.config();
const UpdateUser = () => {
    const {id}=useParams()
    const[emp_name,setName]=useState("")
    const[emp_email,setEmail]=useState("");
    const [emp_age,setAge]=useState("")
    const navigate=useNavigate();


    useEffect(() => {
        axios.get(`${process.env.VITE_API_BASE_URL}/getUser/${id}`)
            .then(result => {
                console.log(result);
                setName(result.data.emp_name);
                setEmail(result.data.emp_email);
                setAge(result.data.emp_age);
            })
            .catch(err => console.log(err));
    }, [id]);
    
    const update = e => {
        e.preventDefault();
        axios.put(`${process.env.VITE_API_BASE_URL}/updateUser/${id}`, { emp_name, emp_email, emp_age })
            .then(result => {
                console.log(result);
                navigate("/home");
            })
            .catch(err => console.log(err));
    };
    
  return (
    <div className='d-flex vh-100 bg-success justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={update}>
                <h2>Update user</h2>
                <div className="mb-2">
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Enter Name' className='form-control'
                    value={emp_name} onChange={(e)=>{setName(e.target.value)}}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Enter Email' className='form-control'
                    value={emp_email} onChange={(e)=>{setEmail(e.target.value)}}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Age</label>
                    <input type="text" placeholder='Enter Age' className='form-control'
                    value={emp_age} onChange={(e)=>{setAge(e.target.value)}}
                    />
                </div>
                <button className="btn btn-success fw-bold m-3 ms-0">Update</button>
            </form>
        </div>
    </div>


  )
}
export default UpdateUser