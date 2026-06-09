import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./get-photographer-details.css"; // Optional for styling
import FetchSubEvent from "./fetch_sub_event";
import { Link } from "react-router-dom";

import Modal from 'react-bootstrap/Modal';
import Carousel from "react-bootstrap/Carousel";

const ModalComponent = (props) => {
    return (
        <Modal show={props.show} fullscreen={true} onHide={() => props.setShow(false)}>
            
            <Modal.Header closeButton>
                <Modal.Title>Samples</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Carousel>
                    {
                        props.images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img
                                    className="modal-image"
                                    src={`http://localhost:3001${image}`}
                                    alt={`Slide ${index + 1}`}
                                    height={50}
                                />
                            </Carousel.Item>
                        ))
                    }
                </Carousel>
            </Modal.Body>
        </Modal>
    )
}

const GetPhotographerDetail = (props) => {
    const { studioId } = useParams();
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const service = props.service;
                // console.log("From GetPhotographerDetail:"+service);

                const response = await axios.get(`http://localhost:3001/getPhotographerImages/${studioId}`, {
                    params: {
                        service: service
                    }
                });
                setImages(response.data.images);
                
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };
        fetchImages();
    }, [studioId]);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="main-container">
            <div className="image-container">
                <span ><h2>{props.service} Samples</h2>
                    {
                        props.admin ?
                            <Link to={`/uploadImages/${studioId}`} className="Button">Add Sample Images <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor" ><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160Zm40 200q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg></Link> : ""
                    }
                    <ModalComponent setShow={setShow} show={show} handleClose={handleClose} images={images} />
                </span>
                {images.length > 0 ? (
                    <div className="get-photographer-image-grid">
                        {images.map((image, index) => (
                            <span onClick={handleShow}>
                                <img key={index} src={`http://localhost:3001${image}`} alt={`Sample ${index + 1}`} className="get-photographer-grid-image" />
                            </span>
                        ))}

                    </div>

                ) : (
                    <p>No images uploaded yet.</p>
                )}
            </div>
            <div className="price-list-container">
                <h2>Price List</h2>
                <FetchSubEvent service={props.service} admin={props.admin} />
            </div>
        </div>
    );
};

export default GetPhotographerDetail;
