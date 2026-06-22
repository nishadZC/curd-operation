import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./main-css/style.css";
import Carousel from "./Carousel";
import image from "../assets/images/image.png";
import Contact from "./Contact";
import About from "./About";
import Services from "./Services";
import Event from "./Event";

const Home = (props) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    props.setAdmin(false);
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminToken");
    navigate("/");
  };

  return (
    <>
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
        <p>&copy; 2025 Your Company. All rights reserved.</p>
        <ul>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Terms of Service</a></li>
        </ul>
      </footer>
    </>
  );
};

export default Home;
