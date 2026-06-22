import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./main-css/login.css";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const Login = (props) => {
    const [admin_email, setEmail] = useState("");
    const [admin_password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (!admin_email || !admin_password) {
            toast.warn("Please fill in all fields");
            return;
        }

        axios.post(`${apiBaseUrl}/login`, { admin_email, admin_password }, {
            headers: { "Content-Type": "application/json" }
        })
            .then(result => {
                console.log("Login Success:", result.data);
                localStorage.setItem("isAdmin", "true"); // persist login
                localStorage.setItem("adminToken", result.data.token); // Store JWT Token
                props.setAdmin(true);
                toast.success("Login successful!");
                setTimeout(() => navigate("/", { replace: true }), 1500);

            })
            .catch(err => {
                console.error("Login Error:", err.response?.status, err.response?.data || "Unknown Error");
                toast.error("Invalid email or password");
            });
    };

    return (
        <div className='login-container'>
            <div className='login-card'>
                <form onSubmit={handleLogin}>
                    <h2 className='login-title'>Admin Login</h2>

                    <div className="form-group">
                        <input
                            name='admin_email'
                            type="email"
                            placeholder='Enter Email'
                            className='form-input'
                            autoComplete='off'
                            value={admin_email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                     
                    </div>

                    <div className="form-group">
                        <input
                            type={showPassword ? "text" : "password"}
                            name='admin_password'
                            placeholder='Enter Password'
                            className='form-input'
                            value={admin_password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <span className="toggle-password" onClick={() => setShowPassword(prev => !prev)}>
                            {showPassword ? (
                                // eye open icon
                                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                                    <path d="M480-312q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Zm0-72q-40 0-68-28t-28-68q0-40 28-68t68-28q40 0 68 28t28 68q0 40-28 68t-68 28Zm0 192q-142.6 0-259.8-78.5Q103-349 48-480q55-131 172.2-209.5Q337.4-768 480-768q142.6 0 259.8 78.5Q857-611 912-480q-55 131-172.2 209.5Q622.6-192 480-192Zm0-288Zm0 216q112 0 207-58t146-158q-51-100-146-158t-207-58q-112 0-207 58T127-480q51 100 146 158t207 58Z" />
                                </svg>
                            ) : (
                                // eye closed icon
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                                </svg>
                            )}
                        </span>
                    </div>

                    <div className="form-group">
                        <button className="login-button" type="submit">Login</button>
                    </div>
                    <Link className="signup-link" to="/">Don't have an account? Go Back</Link>
                </form>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
};

export default Login;
