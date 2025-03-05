import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Footer from "./components/Footer";
import About from "./page/About";
import Project from "./page/Project";
import Gallery from "./page/Gallery";
import Contact from "./page/Contact";
import BlogDetails from "./components/project/BlogDetails";
import HotelMall from "./components/project/Hotelmall";
import SchoolDetails from "./components/project/SchoolDetails";
import ResidenceHenok from "./components/project/ResidenceHenok";
import FooterNew from "./components/FooterNew";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/blogdetails" element={<BlogDetails />} />
        <Route path="/hotelmall" element={<HotelMall />} />
        <Route path="/schooldetails" element={<SchoolDetails />} />
        <Route path="/henok-t-residence" element={<ResidenceHenok />} />

        <Route path="/gallery360" element={<Gallery />} />
        <Route path="/contactus" element={<Contact />} />
      </Routes>
      <div className="hidden lg:block">
        <Footer />
      </div>
      <div className="lg:hidden">
        <FooterNew />
      </div>
    </>
  );
}

export default App;
