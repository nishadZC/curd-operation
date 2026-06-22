import React from "react";
import { Link } from "react-router-dom";
import "./main-css/Event.css"; // Assuming you will style it here

const services = [
  { name: "Photographer", image: "https://media.istockphoto.com/id/610259354/photo/young-woman-using-dslr-camera.jpg?s=612x612&w=0&k=20&c=gjAR4JiqA8lkGQzssSrXxo3yl-cwr5j7Hy47cy-10c4=" },
  { name: "Hall", image: "https://www.shutterstock.com/image-photo/banquet-hall-tables-chairs-set-600nw-2438817641.jpg" },
  { name: "Caterer", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxDDy1QxcXhYj7ALL3etnTgBPO-AEV4Pd5Q&s" },
  { name: "Decoration", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBmdsyuRmujYTZEirqXdzPjvcFy-7zJ_Uy0Oipplas7tx292GksAG5I5QplEGXt4LLRPI&usqp=CAU" },
  { name: "Bartender", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX7gibV9919nIhXfMlqlltDfq9K3dxCbwrgE1jK9iwHTKpFkmJGbODlXhquMIvKmG_qPw&usqp=CAU" }
];

const packages = [
  { name: "Wedding", image: "https://images.stockcake.com/public/f/a/7/fa76812e-16a2-4a87-8ead-b78b726c9636_large/traditional-indian-wedding-stockcake.jpg" },
  { name: "Birthday", image: "https://www.shutterstock.com/image-photo/banquet-hall-tables-chairs-set-600nw-2438817641.jpg" },
  { name: "Anniversary", image: "https://www.gudlu.in/img/gallery/anniversary-celebration-in-gudlu-resort-chikmagaluru.webp" },
  { name: "Baby Shower", image: "https://www.funkypigeon.com/blog/wp-content/uploads/2025/01/baby-shower.jpg" }
];

const Event = (props) => {
  return (
    <section id="home" className="event-section">
      <h1>Event Management</h1>
      <p>
        We provide end-to-end event management solutions to ensure your event runs smoothly and successfully. Whether it’s a wedding, corporate gathering, birthday, or product launch, we handle everything from planning to execution.
      </p>

      <div className="list_of_event">
        {services.map((service, index) => (
          <Link key={index} to="/getStudios" onClick={()=>{props.setService(service.name)}} className="event-card">
            <img src={service.image} alt={service.name} />
            <span className="event-title">{service.name}</span>
          </Link>
        ))}
      </div>

      <h2>Packages</h2>
      <div className="list_of_event">
        {packages.map((pkg, index) => (
          <Link key={index} to="/get_package" onClick={() => {props.setPackageType(pkg.name);}} className="event-card">
            <img src={pkg.image} alt={pkg.name} />
            <span className="event-title">{pkg.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Event;
