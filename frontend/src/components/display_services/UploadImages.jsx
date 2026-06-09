// upload image form

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style.css";

const UploadImages = (props) => {
    const { studioId } = useParams();
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        setImages([...e.target.files]);
    };

    // Upload images and navigate to GetPhotographerDetail
    const handleUpload = async (e) => {
        e.preventDefault();
        if (images.length === 0) {
            alert("Please select images to upload");
            return;
        }

        const formData = new FormData();
        images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            setUploading(true);
            await axios.post(`http://localhost:3001/uploadImages?studioId=${studioId}`, formData, {
                params: {
                    service: props.service
                }
            }, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            alert("Images uploaded successfully");
            navigate(`/getPhotographerImages/${studioId}`); 
        } catch (error) {
            console.error("Error uploading images:", error);
            alert("Failed to upload images");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="container">
            <h2>Upload Images</h2>
            <form onSubmit={handleUpload} className="upload-form">
                <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                <button type="submit" disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload"}
                </button>
            </form>
        </div>
    );
};

export default UploadImages;
