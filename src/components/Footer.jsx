import React, { useEffect, useState } from "react";
import logo from "../assets/icon/black.svg";

import facebook from "../assets/icon/facebook.svg";
import instagram from "../assets/icon/instagram.svg";
import linkedin from "../assets/icon/linkedin.svg";
import tiktok from "../assets/icon/tiktok.svg";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <article className="bg-[#E8EDF5] overflow-hidden">
      <div className="flex flex-row items-center justify-center">
        <section className="flex lg:flex-row flex-col  items-center justify-evenly">
          <div className="w-[60%] p-10">
            <img src={logo} alt="" className="" />
            <p className="w-[80%] pt-4 lg:block hidden">
              We provide comprehensive architectural design services,
              transforming ideas into tangible forms. Let us help you create
              your ideal space with our meticulous attention to detail.
            </p>
          </div>

          <ul className="w-1/2 lg:block hidden">
            <li>
              <a href="/"></a>Home
            </li>
            <li>About Us</li>
            <li>Projects</li>
            <li>Contact Us</li>
          </ul>

          <div className="w-1/2">
            <h1>Addis Ababa, Ethiopia</h1>
            <h1>+251911606260</h1>
            <h1>contact@dallolconsult.com</h1>
          </div>

          <div className="lg:flex hidden bottom-0  flex-col items-center space-y-6 p-1 w-[10%]">
            <div className="border-r-4 border-black h-[35vh] "></div>
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
        </section>

        <div className="lg:hidden bottom-0 flex flex-col items-center ml-auto space-y-6 pr-2 ">
          <div className="border-r-4 border-black h-[35vh] "></div>
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
      <p className="font-neuwelt-light w-full text-[16px] text-center capitalize pt-10 border-t">
        © {currentYear} Dallol Design Build, All Rights Reserved
      </p>
    </article>
  );
};

export default Footer;
