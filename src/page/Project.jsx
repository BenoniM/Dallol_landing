import React from "react";
import Navbar from "../components/Navbar";
import BlogPost from "../components/project/Bolg";
import Hero from "../components/project/hero";
import OurHappyClients from "../components/home/ourhappyclients";

const Project = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <BlogPost />
      <OurHappyClients />
    </>
  );
};

export default Project;
