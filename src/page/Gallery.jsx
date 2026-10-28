import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/gallery/hero";
import CardGallery from "../components/gallery/CardGallery";

const Gallery = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <CardGallery />
    </>
  );
};

export default Gallery;
