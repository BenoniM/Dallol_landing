import React from "react";
import Hero from "../components/about/hero";
import Navbar from "../components/Navbar";
import WeAre from "../components/about/WeAre";
import Mission from "../components/about/mission";
import ExpertiseAbout from "../components/about/expertiseabout";

const About = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="bg-white relative z-20">
        <WeAre />
        <Mission />
        <ExpertiseAbout />
      </main>
    </>
  );
};

export default About;
