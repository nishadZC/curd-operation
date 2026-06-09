// Subevent form



// src/components/SubEvent.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./sub-event.css"; // Assuming you have a CSS file for styling
// import UploadImages from "./UploadImages";
const SubEvent = (props) => {
  const { studioId } = useParams(); // Getting studio ID from the route
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const service = props.service;
      
      const subEventData = { title, price, description, service };
      await axios.post(`http://localhost:3001/studios/${studioId}/subevents`, subEventData);
      setMessage("Sub-event added successfully!");
      setTitle("");
      setPrice("");
      setDescription("");
    navigate(`/getPhotographerImages/${studioId}`); // Redirect to the fetch sub-event page or any other page
    } catch (error) {
      console.error("Error adding sub-event:", error);
      setMessage("Error adding sub-event.");
    }
  };

  return (
    <div className="sub-event-form">
      {/* <h2>Add 10 sample images</h2>
      <UploadImages studioId={studioId} /> */}
      <span><h4>Add Sub Event for ID:</h4></span>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label >Sub Event Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit" className="add">Add Sub Event <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor" ><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></button>
      </form>
    </div>
  );
};

export default SubEvent;
