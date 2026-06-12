// Base Page


// src/components/GetStudios.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./studio.css";

import CarouselOneStep from "../caraousel_one_step";
import Modal from 'react-bootstrap/Modal';

import UpdatePhotographer from "./UpdatePhotographer"
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const ModalComponent = (props) => {
  return (
    <Modal show={props.show} fullscreen={true} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Samples</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdatePhotographer service={props.service} currentStudio={props.currentStudio} setShow={props.setShow} />
      </Modal.Body>
    </Modal>
  )
}

const GetStudios = (props) => {
  const [studios, setStudios] = useState([]);
  const [show, setShow] = useState(false);
  const [currentStudio, setCurrentStudio] = useState(null);

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const service = props.service;

        const serviceData = { "service": service };
        const response = await axios.get(`${apiBaseUrl}/getStudios`, { params: serviceData });
        setStudios(response.data);
      } catch (error) {
        console.error("Error fetching studios:", error);
      }
    };

    fetchStudios();
  }, [show]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container-details">
      <ModalComponent setShow={setShow} show={show} handleClose={handleClose} currentStudio={currentStudio} service={props.service} />
      <h2>{props.service}'s in Goa</h2>
      <CarouselOneStep />
      {
        props.admin ?
          <Link to="/addStudios" className="add">
            <span>Add {props.service || "Studio"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg>
          </Link> : ""
      }
      {studios.length === 0 ? (
        <p>No studios found.</p>
      ) : (
        <div className="studio-list">
          {studios.map((studio) => (
            <div className="studio-card-wrapper">
              <div className="edit-btn-wrapper">
                {
                  props.admin ?
                    <button className="edit-btn"  onClick={() => { handleShow(); setCurrentStudio(studio) }}>Edit <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" /></svg></button> : ""
                }
              </div>
              <Link
                to={`/getPhotographerImages/${studio._id}`}
                key={studio._id}
                className="studio-card-link"
              >
                <div className="studio-card" style={{ cursor: "pointer" }}>
                  <div className="studio-img">
                    <img
                      src={`${apiBaseUrl}${studio.studio_image}`}
                      alt={studio.studio_name}
                    />
                  </div>
                  <div className="studio-details">
                    <h2>{studio.studio_name}</h2>
                    <p className="studio-location">
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#515151">
                        <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                      </svg>
                      {studio.studio_location}
                    </p>
                    <p>{studio.studio_description}</p>
                    <div className="studio-contact" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={`https://wa.me/+91${studio.studio_contact}?text=Hello%20${studio.studio_name},%20I%20found%20you%20at%20${studio.studio_location}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        contact
                      <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                            <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67Z" />
                          </svg>
                    
                      </a>
                      <a
                        href={`mailto:${studio.studio_email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        send mail
               
                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                            <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                          </svg>
                 
                      </a>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GetStudios;
