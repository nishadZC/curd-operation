import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";

const Studios = (props) => {
    const [formData, setFormData] = useState({
        studio_name: "",
        studio_location: "",
        studio_description: "",
        studio_contact: "",
        studio_email: "",
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
            await axios.post("http://localhost:3001/addStudios", formDataWithImage, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setFormData({
                studio_name: "",
                studio_location: "",
                studio_description: "",
                studio_contact: "",
                studio_email: "",
            });
            setImage(null);
            alert("Studio added successfully!");
            navigate("/getStudios");
        } catch (error) {
            console.error("Error adding studio:", error);
        }
    };

    return (
        <div className="container">
            <h2>Add Details</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="studio_name" placeholder="Title" value={formData.studio_name} onChange={handleChange} required />
                <input type="text" name="studio_location" placeholder="Location" value={formData.studio_location} onChange={handleChange} required />
                <textarea name="studio_description" placeholder="Description" value={formData.studio_description} onChange={handleChange} required />
                <input type="tel" name="studio_contact" placeholder="Contact" value={formData.studio_contact} onChange={handleChange} required />
                <input type="email" name="studio_email" placeholder="Email" value={formData.studio_email} onChange={handleChange} required />
                <input type="file" name="studio_image" accept="image/*" onChange={handleImageChange} required />
                <button type="submit" >Add <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor" ><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></button>
            </form>
        </div>
    );
};

export default Studios;
