import React, { useState, useEffect } from "react";
import "./style.css";

import image1 from "./studioImage/image2.png";
import image2 from "./studioImage/image2.png";
import image3 from "./studioImage/image3.png";
import image4 from "./studioImage/image4.png";

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
