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
      <main className="bg-white relative z-20">
        <BlogPost />
        <OurHappyClients />
      </main>
    </>
  );
};

export default Project;
