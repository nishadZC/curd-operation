import React, { useState, useEffect } from "react";
import "./main-css/style.css";

import image3 from "../assets/studio-image/image3.png";
import image4 from "../assets/studio-image/image4.png";
import image1 from "../assets/studio-image/image3.png";
import image2 from "../assets/studio-image/image4.png";
const images = [image1, image2, image3, image4];


const CarouselOneStep = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [currentIndex]);

  return (
    <div className="carouselOneStep">
      <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
    </div>
  );
};

export default CarouselOneStep;
