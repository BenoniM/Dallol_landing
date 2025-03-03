import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import Footer from "./components/Footer";
import About from "./page/About";
import Project from "./page/Project";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/AboutUs" element={<About />} />
        <Route path="/projects" element={<Project />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
