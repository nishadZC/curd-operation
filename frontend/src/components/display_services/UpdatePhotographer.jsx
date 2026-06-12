// add new studio form


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";
import env from 'dotenv';
env.config();
const Studios = (props) => {
    const studio = props.currentStudio;
    console.log("Service Name:" + props.service);
    

    const [formData, setFormData] = useState({
        studio_id: studio._id,
        studio_name: studio.studio_name,
        studio_location: studio.studio_location,
        studio_description: studio.studio_description,
        studio_contact: studio.studio_contact,
        studio_email: studio.studio_email,
        service: props.service
    });

    const [image, setImage] = useState(null);
    const navigate = useNavigate(); // ✅ Initialize navigate

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataWithImage = new FormData();

        Object.keys(formData).forEach((key) => {
            formDataWithImage.append(key, formData[key]);
        });

        if (image) {
            formDataWithImage.append("studio_image", image);
        }

        try {
            await axios.post(`${process.env.VITE_API_BASE_URL}/updateStudio`, formDataWithImage, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setFormData({
                studio_id: "",
                studio_name: "",
                studio_location: "",
                studio_description: "",
                studio_contact: "",
                studio_email: "",
            });
            setImage(null);
            alert("Studio Updated successfully!");
            props.setShow(false);
            navigate("/getStudios");
        } catch (error) {
            console.error("Error adding studio:", error);
        }
    };

    return (
        <div className="container">
            <h2>Add Studio</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="studio_name" placeholder="Studio Name" value={formData.studio_name} onChange={handleChange} required />
                <input type="text" name="studio_location" placeholder="Location" value={formData.studio_location} onChange={handleChange} required />
                <textarea name="studio_description" placeholder="Description" value={formData.studio_description} onChange={handleChange} required />
                <input type="tel" name="studio_contact" placeholder="Contact" value={formData.studio_contact} onChange={handleChange} required />
                <input type="email" name="studio_email" placeholder="Email" value={formData.studio_email} onChange={handleChange} required />
                <input type="file" name="studio_image" accept="image/*" onChange={handleImageChange}  />
                <button type="submit">Update Studio</button>
            </form>
        </div>
    );
};

export default Studios;
