import React from "react";
import Hero from "../components/home/Hero";
import Navbar from "../components/Navbar";
import ProjectsSection from "../components/home/ProjectsSection";
import About from "../components/home/about";
import Expertise from "../components/home/expertise";
import Carousel from "../components/home/Carosle";
import OurHappyClients from "../components/home/ourhappyclients";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="relative z-20 shadow-2xl">
        {/* Pinned Curved Scroll-Driven Projects Section (First) */}
        <ProjectsSection />

        {/* About Section (Switched to after Projects) & Light Sections */}
        <div className="bg-white">
          <About />
          <Expertise />
          <Carousel />
          <OurHappyClients />
        </div>
      </main>
    </>
  );
};

export default Home;
