import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const Users = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get(`${apiBaseUrl}/home`)
            .then(result => setUsers(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleDelete = id => {
        const confirmation = window.confirm("Are you sure you want to delete this user?\nPress OK to confirm or Cancel to abort.");
        if (confirmation) {
            axios.delete(`${apiBaseUrl}/deleteUser/${id}`)
                .then(res => {
                    console.log(res)
                    window.location.reload()
                })
                .catch(err => console.log(err))
        }
    }

    return (
        <div className='d-flex vh-100 bg-success justify-content-center align-items-center'>
            <div className="w-50 bg-white rounded p-3">
                <Link to="/createUser" className="btn btn-success fw-bold mb-3">Add Employee +</Link>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((EmployeeModel, index) => (
                                <tr key={index}>
                                    <td>{EmployeeModel.emp_name}</td>
                                    <td>{EmployeeModel.emp_email}</td>
                                    <td>{EmployeeModel.emp_age}</td>
                                    <td>
                                        <Link to={`/updateUser/${EmployeeModel._id}`} className="btn btn-success">Update</Link>
                                        <button className="btn btn-danger ms-3" onClick={() => handleDelete(EmployeeModel._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Users;
