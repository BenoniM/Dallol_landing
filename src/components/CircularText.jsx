import React, { useState } from "react";
import logo from "../assets/icon/logowhite.svg";
import blacklogo from "../assets/icon/black.svg";
import red from "../assets/icon/red.png";

const CircularText = () => {
  const [isHovered, setIsHovered] = useState(false);
  const text = "build your dream With Us";
  const repeatedText = ` ${text} ${text}`;
  const characters = repeatedText.split("");

  characters.splice(
    0,
    0,
    <img src={red} alt="" key="red1" className="red-image " />
  );
  characters.splice(
    26,
    0,
    <img src={red} alt="" key="red2" className="red-image" />
  );

  return (
    <div
      className="circle-container overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="circle-text">
        {characters.map((char, i) => (
          <span
            key={i}
            style={{ transform: `rotate(${i * (360 / characters.length)}deg)` }}
          >
            {char}
          </span>
        ))}
      </div>
      <img
        src={isHovered ? blacklogo : logo}
        alt="Logo"
        className="circle-logo"
      />
    </div>
  );
};

export default CircularText;
