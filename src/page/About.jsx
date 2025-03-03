import React from "react";
import Hero from "../components/about/hero";
import Nabbar2 from "../components/Nabbar2";
import WeAre from "../components/about/WeAre";
import Mission from "../components/about/mission";
import ExpertiseAbout from "../components/about/expertiseabout";

const About = () => {
  return (
    <>
      <Nabbar2 />
      <Hero />
      <WeAre />
      <Mission />
      <ExpertiseAbout />
    </>
  );
};

export default About;
