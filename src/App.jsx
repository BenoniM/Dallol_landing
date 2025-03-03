import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Footer from "./components/Footer";
import About from "./page/About";
import Project from "./page/Project";
import Gallery from "./page/Gallery";
import ContactUs from "./components/contact/ContactUs";
import Contact from "./page/Contact";
import BlogDetails from "./components/project/BlogDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/projects/:id" element={<BlogDetails />} />

        <Route path="/gallery360" element={<Gallery />} />
        <Route path="/contactus" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
