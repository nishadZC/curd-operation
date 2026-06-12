import React, { useState } from 'react'
import axios  from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const CreateUser = () => {
    const[emp_name,setName]=useState("")
    const[emp_email,setEmail]=useState("");
    const [emp_age,setAge]=useState("")
    const navigate=useNavigate();

    const Submit=(e)=>{
        e.preventDefault();
       axios.post(`${apiBaseUrl}/createUser`,{emp_name,emp_email,emp_age})
        .then(result=>{
            console.log(result)
            navigate("/home") })
        .catch(err=>console.log(err))}
  return (
    <div className='d-flex bg-success vh-100 justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <form onSubmit={Submit}>
                <h2>Add user</h2>
                <div className="mb-2">
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder='Enter Name' className='form-control'
                        value={emp_name} onChange={(e)=>{setName(e.target.value)}}/>
                </div>
                <div className="mb-2">
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Enter Email' className='form-control'
                        value={emp_email} onChange={(e)=>{setEmail(e.target.value)}}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="age">Age</label>
                    <input type="text" placeholder='Enter Age' className='form-control'
                        value={emp_age} onChange={(e)=>{setAge(e.target.value)}}
                    /></div>
                <button className="btn btn-success fw-bold mb-3">Submit</button></form>
        </div></div>)}
export default CreateUser
