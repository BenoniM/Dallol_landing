import React, { useEffect } from "react";
import logo from "../../assets/icon/black.svg";

const Hero = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <article className="flex flex-col items-center py-10 w-full">
      <h1 className="lg:text-7xl text-6xl  font-bold">Get in Touch</h1>

      <section className="flex lg:flex-row flex-col items-start lg:items-center justify-center pt-10 p-5">
        <img src={logo} alt="" />
        <div className="border-b-2 border-black h-1 w-[250px] lg:w-[350px] mr-5 pb-4"></div>
        <p className="lg:w-[56%] w-full text-justify pt-5 lg:pt-0">
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
