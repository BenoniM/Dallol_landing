import React from "react";
import Hero from "../components/home/Hero";
import Navbar from "../components/Navbar";
import About from "../components/home/about";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
    </>
  );
};

export default Home;
