import React from 'react';
import { Link } from 'react-router-dom';// Optional: for styling

const AdminLink = () => {
    return (
        <div className="admin-home-container">
            <h1 className="admin-title">Admin Dashboard <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor"><path d="M528-624v-192h288v192H528ZM144-432v-384h288v384H144Zm384 288v-384h288v384H528Zm-384 0v-192h288v192H144Zm72-360h144v-240H216v240Zm384 288h144v-240H600v240Zm0-479h144v-49H600v49ZM216-216h144v-48H216v48Zm144-288Zm240-191Zm0 239ZM360-264Z"/></svg></h1>
            <nav className="admin-nav">
                <Link to="/addStudios" className="admin-link">Add Studio</Link>
                <Link to="/uploadImages" className="Upload ">Manage Users</Link>
                <Link to="/admin/bookings" className="admin-link">View Bookings</Link>
                <Link to="/admin/reports" className="admin-link">Reports</Link>
                <Link to="/admin/settings" className="admin-link">Settings</Link>
                <Link to="/" className="admin-link logout">Logout</Link>
            </nav>
        </div>
    );
};

export default AdminHome;
