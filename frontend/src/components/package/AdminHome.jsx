import React, { useEffect, useState } from "react";
import axios from "axios";
import "./package-css/admin_home.css"; // Optional: for styling
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const AdminDashboard = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/admin_home`);
        setEnquiries(response.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchEnquiries();
  }, []);

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard - User Enquiries</h2>
      {enquiries.length === 0 ? (
        <p>No enquiries found.</p>
      ) : (
        <div className="card-grid">
          {enquiries.map((entry, index) => (
            <div className="admin-card" key={index}>
              <div className="card-body">
                <h3>User Info</h3>
                <p><strong>Name:</strong> {entry.user_name}</p>
                <p><strong>Email:</strong> {entry.email}</p>
                <p><strong>Location:</strong> {entry.location}</p>
                <p><strong>Phone:</strong> {entry.phone}</p>

                <h3>Package Info</h3>
                {entry.packageDetails ? (
                  <>
                    <p><strong>Package Name:</strong> {entry.packageDetails.package_name}</p>
                    <p><strong>Price:</strong> ₹{entry.packageDetails.package_price}</p>
                    <p><strong>Description:</strong> {entry.packageDetails.package_description}</p>
                  </>
                ) : (
                  <p style={{ color: "red" }}>Package not found</p>
                )}
              </div>
              <div className="admin-contact">
                <a
                  href={`https://wa.me/+91${entry.phone}?text=Hello%20${entry.user_name},%20I%20found%20your%20enquiry%20for%20${entry.packageDetails.package_name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-contact-user"
                >
                  Contact
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
                      <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67Z" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
