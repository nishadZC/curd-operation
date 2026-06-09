import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import Carousel from "./carousel";
import image from "./images/image.png";
import Contact from "./contact";
import About from "./About";
import Services from "./services";
import Event from "./event";

const Home = (props) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    props.setAdmin(false);
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <>
      <header className="header">
        <nav className="top-bar">
          <Link to="/" className="logo">
            <img src={image} alt="Eventify Logo" />
          </Link>

          <ul className="nav-links desktop-only">
            <li><a href="#home">Home</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <div className="authentication">
            {!props.admin ? (
              <Link to="/Login" className="auth-btn" id="sign-in">
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

      <main className="main-content">
        <Carousel />
        <Event setService={props.setService} setPackageType={props.setPackageType} />
        <Services />
        <About />
        <Contact />
      </main>

      <ul className="bottom-nav mobile-only">
        <li><a href="#home">Home</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>

      <footer className="footer">
        <p>&copy; 2025 Eventify. All rights reserved.</p>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </footer>
    </>
  );
};

export default Home;
