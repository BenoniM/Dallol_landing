import React from "react";
import logo from "../../assets/icon/black.svg";

const Hero = () => {
  return (
    <article className="flex flex-col items-center py-10 w-full">
      <h1 className="text-7xl font-bold">About Us</h1>

      <section className="flex flex-row items-center justify-center pt-10">
        <img src={logo} alt="" />
        <div className="border-b-2 border-black h-1 w-[350px] mr-5"></div>
        <p className="w-[56%] text-start">
          At Dallol Design Build, we believe that great design starts with
          understanding. Our mission is to craft spaces that resonate with our
          clients’ visions while being grounded in the needs of the local
          community. With a team of skilled architects, engineers, and project
          managers, we are dedicated to delivering not just buildings, but
          enduring relationships built on trust, quality, and collaboration.
        </p>
      </section>
    </article>
  );
};

export default Hero;
