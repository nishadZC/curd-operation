import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import DisplayService from "./DisplayService";

import './package-css/get-package.css'

import Modal from 'react-bootstrap/Modal';
import UpdatePackage from "./UpdatePackage"
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const ModalComponent = (props) => {
  return (
    <Modal show={props.show} fullscreen={true} onHide={() => props.setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Samples</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UpdatePackage pkg={props.pkg} setShow={props.setShow} packageType={props.packageType}/>
      </Modal.Body>
    </Modal>
  )
}


const GetPackage = (props) => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // console.log("Get Package: ",props.packageType);

        const response = await axios.get(`${apiBaseUrl}/get_packages`, {
          params: {
            packageType: props.packageType,
          },
        });
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, [show]);

  // 🔍 Fetch studioID based on photographer name
  const handlePhotographerClick = async (name, serviceType) => {
    try {
      const response = await axios.get(`${apiBaseUrl}/getStudios`, {
        params: {
          service: serviceType,
        },
      });
      const studios = response.data;

      const matchedStudio = studios.find(
        (studio) => studio.studio_name === name
      );

      if (matchedStudio && matchedStudio._id) {
        navigate(`/getPhotographerImages/${matchedStudio._id}`);
      } else {
        alert("Photographer not found in studios.");
      }
    } catch (error) {
      console.error("Error fetching studios:", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="package_box">
      <ModalComponent setShow={setShow} show={show} handleClose={handleClose} pkg={currentPackage} packageType={props.packageType}/>
      <div className="package-container">
        <h2>All Packages</h2>
        {
          props.admin ?
            <Link to={"/add_package"} className="add_package">Add Package</Link> : ""
        }
        <div className="package-card-grid">
          {
            packages.length < 0 ? (
              <p>No packages found.</p>) : (
              packages.map((pkg) => (
                <div className="package-card" key={pkg._id}>
                  {
                    props.admin? 
                    <div className="edit-btn-container">
                    <button className="edit-btn"  onClick={() => { handleShow(); setCurrentPackage(pkg);}}>Edit</button>
                  </div>:""
                  }
                  <div className="package-card-body">
                    <h3>{pkg.package_name}</h3>
                    <strong> ₹{pkg.package_price}</strong>
                    <div className="package-services">
                      <DisplayService className="display-service" parsed={pkg.package_photographer || []} handlePhotographerClick={handlePhotographerClick} serviceType="Photographer" setService={props.setService} />
                      <DisplayService className="display-service" parsed={pkg.package_hall || []} handlePhotographerClick={handlePhotographerClick} serviceType="Hall" setService={props.setService} />
                      <DisplayService className="display-service" parsed={pkg.package_caterer || []} handlePhotographerClick={handlePhotographerClick} serviceType="Caterer" setService={props.setService} />
                      <DisplayService className="display-service" parsed={pkg.package_bartender || []} handlePhotographerClick={handlePhotographerClick} serviceType="Bertender" setService={props.setService} />
                      <DisplayService className="display-service" parsed={pkg.package_decoration || []} handlePhotographerClick={handlePhotographerClick} serviceType="Decoration" setService={props.setService} />
                    </div>
                    <p><strong>Description:</strong> {pkg.package_description}</p>
                    <div className="package-enquire-link">
                      <Link to={`/user_form/${pkg._id}`} className="admin-link">Enquire Now!</Link>
                    </div>

                  </div>
                </div>
              ))
            )
          }

        </div>
      </div>
    </div>
  );
};

export default GetPackage;
