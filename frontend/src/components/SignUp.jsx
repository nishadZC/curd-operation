import React, { useState } from 'react'
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from 'react-router-dom';
import env from 'dotenv';
env.config();
const signUp = () => {
    const [admin_name, setName] = useState("")
    const [admin_email, setEmail] = useState("");
    const [admin_password, setPassword] = useState("")
    const navigate = useNavigate();

    const Submit = (e) => {
        e.preventDefault();
        axios.post(`${process.env.VITE_API_BASE_URL}`, { admin_name, admin_email, admin_password })
            .then(result => {
                console.log(result)
                navigate("/login")
            })
            .catch(err => console.log(err))
    }
    return (
        <div className='d-flex bg-light vh-100 justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3 text-center shadow-lg'>
                <form onSubmit={Submit}>
                    <h2 className='m-3'>Create an Account</h2>
                    <div className="m-3">
                        <input type="text" placeholder='Enter Name' className='form-control' autoComplete='off'
                            value={admin_name} onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="m-3">
                        <input type="email" placeholder='Enter Email' className='form-control' autoComplete='off'
                            value={admin_email} onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </div>
                    <div className="m-3">
                        <input type="password" placeholder='Enter Password' className='form-control' autoComplete='off'
                            value={admin_password} onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    <div className="m-3">
                        <button className="btn btn-success fw-bold mb-3 w-100">Register</button>
                    </div>

                </form>
                <Link to="/login">Already have an account? Login</Link>
            </div>
        </div>)
}
export default signUp
