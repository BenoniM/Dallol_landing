import React from "react";
import Hero from "../components/home/Hero";
import Navbar from "../components/Navbar";
import About from "../components/home/about";
import Expertise from "../components/home/expertise";
import Carousel from "../components/home/Carosle";
import OurHappyClients from "../components/home/ourhappyclients";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Expertise />
      <Carousel />
      <OurHappyClients />
    </>
  );
};

export default Home;
