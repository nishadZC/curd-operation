import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
// import "../style.css";
import "./package-css/user-form.css"
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const UserForm = () => {
    const { packageId } = useParams(); // Fetching package ID from URL
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        user_name: "",
        email: "",
        location: "",
        phone: "",
        package_id: packageId || ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${apiBaseUrl}/user_form`, formData, {
                headers: { "Content-Type": "application/json" }
            });
            alert("Enquiry submitted successfully!");
            navigate("/"); // redirect to home or confirmation page
        } catch (err) {
            console.error("Submission Error:", err);
            alert("Failed to submit the form. Please try again.");
        }
    };

    return (
        <div className="form-wrapper">
            <div className="userform-container">
            <h2>Enquiry Form</h2>
            <form onSubmit={handleSubmit} className="form-style">
            <div className="form-group">
                    <label>Package ID:</label>
                    <input
                        type="text"
                        name="package_id"
                        value={formData.package_id}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="user_name"
                        value={formData.user_name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Phone:</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                </div>
               

                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default UserForm;
