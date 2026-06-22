import React from "react";
import { Link, useNavigate } from "react-router-dom";
import image from "../assets/images/image.png";

const Header = ({ admin, setAdmin }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    setAdmin(false);
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="top-bar">
        <Link to="/" className="logo">
          <img src={image} alt="Eventify Logo" />
        </Link>

        <ul className="nav-links desktop-only">
          <li><Link to="/">Home</Link></li>
          <li><a href="/#about">About</a></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/getStudios">Services</Link></li>
        </ul>

        <div className="authentication">
          {!admin ? (
            <Link to="/login" className="auth-btn" id="sign-in">
              <span>Admin login</span>
              <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
              </svg>
            </Link>
          ) : (
            <>
              <Link to="/admin_home" className="auth-btn" id="sign-in">
                <span>Admin Dashboard</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="currentColor">
                  <path d="M528-624v-192h288v192H528ZM144-432v-384h288v384H144Zm384 288v-384h288v384H528Zm-384 0v-192h288v192H144Zm72-360h144v-240H216v240Zm384 288h144v-240H600v240Zm0-479h144v-49H600v49ZM216-216h144v-48H216v48Zm144-288Zm240-191Zm0 239ZM360-264Z" />
                </svg>
              </Link>

              <button onClick={handleSignOut} className="auth-btn sign-out-btn">
                <span>Sign Out</span>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                  <path d="M627-271 585-313l102-102H360v-80h327L585-597l42-42 174 174-174 174ZM120-120v-720h360v80H200v560h280v80H120Z" />
                </svg>
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
