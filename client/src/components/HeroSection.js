import React from "react";
import Banner1 from "../Assets/hero.jpeg";

const HeroSection = () => {
  return (
    <>
      <div className="w-full mt-0 h-72 overflow-hidden rounded-b-3xl md:h-3/4">
        <div className="duration-700 ease-in-out">
          <img src={Banner1} className="w-full h-full object-cover md:h-fit" alt="Hero Image" />
        </div>
      </div>
    </>
  );
};

export default HeroSection;
