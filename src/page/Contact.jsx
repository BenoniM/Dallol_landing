import React from "react";
import Navbar from "../components/Navbar";
import ContactUs from "../components/contact/ContactUs";
import Hero from "../components/contact/hero";

const Contact = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="bg-white relative z-20">
        <ContactUs />
      </main>
    </>
  );
};

export default Contact;
