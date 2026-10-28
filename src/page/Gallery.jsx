import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/gallery/hero";
import CardGallery from "../components/gallery/CardGallery";

const Gallery = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="bg-white relative z-20">
        <CardGallery />
      </main>
    </>
  );
};

export default Gallery;
