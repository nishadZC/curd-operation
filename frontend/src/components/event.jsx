import React from "react";
import { Link } from "react-router-dom";
import "./main-css/Event.css"; // Assuming you will style it here

const Event = (props) => {
  return (
    <section id="home" className="event-section">
      <h1>Event Management</h1>
      <p>
        We provide end-to-end event management solutions to ensure your event runs smoothly and successfully. Whether it’s a wedding, corporate gathering, birthday, or product launch, we handle everything from planning to execution.
      </p>

      <div className="list_of_event">
        <Link to="/getStudios" onClick={()=>{props.setService("Photographer")}} className="event-card">
          <img
            src="https://media.istockphoto.com/id/610259354/photo/young-woman-using-dslr-camera.jpg?s=612x612&w=0&k=20&c=gjAR4JiqA8lkGQzssSrXxo3yl-cwr5j7Hy47cy-10c4="
            alt="Photographer"
          />
          <span className="event-title">Photographer</span>
        </Link>

        <Link to="/getStudios" onClick={()=>props.setService("Hall")} className="event-card">
          <img
            src="https://www.shutterstock.com/image-photo/banquet-hall-tables-chairs-set-600nw-2438817641.jpg"
            alt="Hall"
          />
          <span className="event-title">Hall</span>
        </Link>

        <Link to="/getStudios" onClick={()=>props.setService("Caterer")} className="event-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxDDy1QxcXhYj7ALL3etnTgBPO-AEV4Pd5Q&s"
            alt="Caterer"
          />
          <span className="event-title">Caterer</span>
        </Link>

        <Link to="/getStudios" onClick={()=>props.setService("Decoration")} className="event-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBmdsyuRmujYTZEirqXdzPjvcFy-7zJ_Uy0Oipplas7tx292GksAG5I5QplEGXt4LLRPI&usqp=CAU"
            alt="Decoration"
          />
          <span className="event-title">Decoration</span>
        </Link>

        <Link to="/getStudios" onClick={()=>props.setService("Bartender")} className="event-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX7gibV9919nIhXfMlqlltDfq9K3dxCbwrgE1jK9iwHTKpFkmJGbODlXhquMIvKmG_qPw&usqp=CAU"
            alt="Bartender"
          />
          <span className="event-title">Bartender</span>
        </Link>
      </div>

      <h2>Packages</h2>
      <div className="list_of_event">
        <Link to="/get_package" onClick={() => {props.setPackageType("Wedding");}} className="event-card">
          <img
            src="https://images.stockcake.com/public/f/a/7/fa76812e-16a2-4a87-8ead-b78b726c9636_large/traditional-indian-wedding-stockcake.jpg"
            alt="Wedding"
          />
          <span className="event-title">Wedding</span>
        </Link>

        <Link to="/get_package" onClick={() => {props.setPackageType("Birthday");}} className="event-card">
          <img
            src="https://www.shutterstock.com/image-photo/banquet-hall-tables-chairs-set-600nw-2438817641.jpg"
            alt="Birthday"
          />
          <span className="event-title">Birthday</span>
        </Link>

        <Link to="/get_package" onClick={() => {props.setPackageType("Anniversary");}} className="event-card">
          <img
            src="https://www.gudlu.in/img/gallery/anniversary-celebration-in-gudlu-resort-chikmagaluru.webp"
            alt="Anniversary"
          />
          <span className="event-title">Anniversary</span>
        </Link>

        <Link to="/get_package" onClick={() => {props.setPackageType("Baby Shower");}} className="event-card">
          <img
            src="https://www.funkypigeon.com/blog/wp-content/uploads/2025/01/baby-shower.jpg"
            alt="Baby Shower"
          />
          <span className="event-title">Baby Shower</span>
        </Link>
      </div>
    </section>
  );
};

export default Event;
