import React from "react";
import logo from "../assets/icon/logoblack.svg";
import menu from "../assets/icon/menublack.svg";

const Navbar = () => {
  return (
    <>
      <article className="absolute top-0 left-0 w-full flex items-center justify-center z-20 font-montserrat ">
        <img src={logo} alt="" />
        <img src={menu} alt="" />
      </article>
    </>
  );
};

export default Navbar;
