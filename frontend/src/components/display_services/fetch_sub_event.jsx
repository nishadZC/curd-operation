//display subevents


// src/components/FetchSubEvent.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./display-services-css/fetch-sub-event.css"; // Optional for styling
import { Link } from "react-router-dom";
// import DisplayService from "./display_service"; // Not used in this snippet
import Modal from 'react-bootstrap/Modal';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const ModalComponent = (props) => {
  if (props.event === null) {
    return <></>
  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <p id="sub-event-card-title">{props.event.title}</p>
        <p><strong>₹{props.event.price}</strong> </p>
        <p>{props.event.description}</p>
        <div className='enquire'>
          <a
            href={`mailto:vn07244@gmail.com`}
            target="_blank"
            rel="noopener noreferrer"
          >
            enquire now!
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
              </svg>
          </a>
        </div>
      </Modal.Body>
    </Modal>
  )
}


const FetchSubEvent = (props) => {
  const { studioId } = useParams(); // Get studioId from route
  const [subEvents, setSubEvents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubEvents = async () => {
      try {
        const service = props.service;
        const response = await axios.get(`${apiBaseUrl}/studios/${studioId}/subevents`, {
          params: {
            service: service
          }
        });
        setSubEvents(response.data);
      } catch (err) {
        console.error("Error fetching sub-events:", err);
        setError("Failed to load sub-events.");
      }
    };

    fetchSubEvents();
  }, [studioId]);

  const [show, setShow] = useState(false);
  const [currentSubevent, setCurrentSubevent] = useState(null);

  const handleShow = () => setShow(true);


  const removeSubevent = async (subevent_id) => {
    try {
      const service = props.service;
      const response = await axios.delete(`${apiBaseUrl}/subevents/${subevent_id}`, {
        params: {
          service: service
        }
      });
      console.log("Removed subevent", response.data);

      setSubEvents(response.data.subEvents);
    } catch (err) {
      console.error("Error fetching sub-events:", err);
      setError("Failed to load sub-events.");
    }
  }

  return (
    <div className="fetch-sub-events">
      <ModalComponent
        show={show}
        onHide={() => setShow(false)}
        event={currentSubevent}
      />
      {error && <p className="error">{error}</p>}
      {
        props.admin ?
          <div className="addButton">
            <Link to={`/subevents/${studioId}`} >
              <span>Add Packages<svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" /></svg></span>
            </Link>
          </div> : ""
      }
      {subEvents.length === 0 ? (
        <p>No sub-events found.</p>
      ) : (
        <div>
          <div className="sub-event-card-container">

            {subEvents.map((event) => (
              <div className="subevent-container">
                {
                  props.admin ?
                    <div className="delete-btn-container">
                      <button className="delete-btn edit-btn" onClick={() => { removeSubevent(event._id) }}>✕</button>
                    </div> : ""
                }
                <div className="sub-event-card" key={event._id} onClick={() => { handleShow(); setCurrentSubevent(event) }}>
                  <p id="sub-event-card-title">{event.title.length > 9 ? event.title.slice(0, 9) + "..." : event.title}</p>
                  <p><strong>₹{event.price}</strong> </p>
                  <div className='enquire'>
                    <a
                      href={`mailto:vn07244@gmail.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      enquire now!
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currenrColor">
                          <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
};

export default FetchSubEvent;
