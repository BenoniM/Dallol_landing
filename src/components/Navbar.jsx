import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../assets/icon/black.svg";
import menu from "../assets/icon/menublack.svg";
import facebook from "../assets/icon/facebook.svg";
import instagram from "../assets/icon/instagram.svg";
import linkedin from "../assets/icon/linkedin.svg";
import tiktok from "../assets/icon/tiktok.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  // Helper function to generate valid paths
  const getPath = (item) => {
    if (item === "Home") return "/";
    if (item === "360 Gallery") return "/gallery360";
    return `/${item.replace(/\s/g, "").toLowerCase()}`;
  };

  return (
    <>
      <article className="absolute top-0 left-0 w-full flex items-center justify-center z-20 font-montserrat ">
        <img src={logo} alt="" />

        <button onClick={() => setIsOpen(true)}>
          <img size={32} src={menu} className="text-black" />
        </button>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          ></div>
        )}

        {/* Sidebar Menu (Visible on All Screens) */}
        <div
          className={`fixed top-0 right-0 h-full w-[550px] pt-14 bg-white shadow-lg transform transition-transform duration-500 ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } z-50`}
        >
          <div className="absolute top-4 right-4 ">
            <button onClick={closeMenu} className="">
              <X size={60} className="text-black font-bold" />
            </button>

            {/* Social Media Links */}
            <div className="bottom-0 flex flex-col items-center space-y-6 p-1">
              <div className="border-r-4 border-black h-[65vh] "></div>
              <a
                className="text-white text-2xl hover:text-gray-400 transition duration-300"
                href="https://web.facebook.com/dallol.consult"
              >
                <i className="">
                  <img src={facebook} alt="" className="w-5 h-5" />
                </i>
              </a>
              <a
                className="text-white text-2xl hover:text-gray-400 transition duration-300"
                href="https://www.instagram.com/dallolconsult?igsh=Z2kwcXlheXpid2Np"
              >
                <i className="">
                  <img src={instagram} alt="" className="w-5 h-5" />
                </i>
              </a>
              <a
                className="text-white text-2xl hover:text-gray-400 transition duration-300"
                href="https://www.linkedin.com/company/dallol-consult/"
              >
                <i className="">
                  <img src={linkedin} alt="" className="w-5 h-5" />
                </i>
              </a>
              <a
                className="text-white text-2xl hover:text-gray-400 transition duration-300"
                href="https://www.tiktok.com/@dallol.consult?_t=ZM-8tsMnv9lVHp&_r=1"
              >
                <i className="">
                  <img src={tiktok} alt="" className="w-5 h-5" />
                </i>
              </a>
            </div>
          </div>

          <section className="flex flex-col items-start mt-20 pl-14 ">
            <img src={logo} alt="" className="w-[15rem]" />
            <ul className="flex flex-col items-start mt-16 space-y-4 capitalize">
              {[
                "Home",
                "About Us",
                "Projects",
                "360 Gallery",
                "Contact Us",
              ].map((item, index) => (
                <li key={index}>
                  <NavLink
                    to={getPath(item)}
                    className="text-black text-5xl font-medium hover:text-primary transition "
                    onClick={closeMenu}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </article>
    </>
  );
};

export default Navbar;
