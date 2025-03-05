import { useEffect, useState } from "react";
import logo from "../assets/icon/black.svg";
import facebook from "../assets/icon/facebook.svg";
import instagram from "../assets/icon/instagram.svg";
import linkedin from "../assets/icon/linkedin.svg";
import tiktok from "../assets/icon/tiktok.svg";

const FooterNew = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  return (
    <article className="bg-[#E8EDF5] overflow-hidden  ">
      <section className="flex flex-row items-start  justify-center">
        <div className="container mx-auto flex flex-col  items-center justify-between ">
          {/* Logo and Description */}
          <section className="flex flex-col items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0 pt-20">
            <img src={logo} alt="Dallol Consult Logo" className="w-[196px]" />
            <p className="w-[80%] pt-4 lg:block hidden">
              We provide comprehensive architectural design services,
              transforming ideas into tangible forms. Let us help you create
              your ideal space with our meticulous attention to detail.
            </p>
          </section>

          {/* Get in Touch Section */}
          <section className="flex flex-col  items-center lg:items-start text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-lg font-semibold ">Get in Touch</h1>
            <p>contact@dallolconsult.com</p>
            <p>+251911606260</p>
            <h1 className="text-lg font-semibold pt-4">Locations</h1>
            <p>Addis Ababa, Ethiopia</p>
            <p>+251911606260</p>
            <p className="font-neuwelt-light w-[70%] text-center capitalize pt-4">
              © {currentYear} Dallol Design Build, All Rights Reserved
            </p>
          </section>
        </div>
        <section className="flex flex-col items-center ml-auto pr-2">
          <div className="border-r-2 border-black h-[25vh]"></div>
          <div className="flex flex-col items-center space-y-4 mt-4">
            <a href="https://web.facebook.com/dallol.consult">
              <img src={facebook} alt="Facebook" className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/dallolconsult?igsh=Z2kwcXlheXpid2Np">
              <img src={instagram} alt="Instagram" className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/company/dallol-consult/">
              <img src={linkedin} alt="LinkedIn" className="w-5 h-5" />
            </a>
            <a href="https://www.tiktok.com/@dallol.consult?_t=ZM-8tsMnv9lVHp&_r=1">
              <img src={tiktok} alt="TikTok" className="w-5 h-5" />
            </a>
          </div>
        </section>
      </section>
    </article>
  );
};

export default FooterNew;
