import React, { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import logoBlack from "../assets/icon/black.svg";
import logoWhite from "../assets/icon/logowhite.svg";

// Black social icons
import facebookBlack from "../assets/icon/facebook.svg";
import instagramBlack from "../assets/icon/instagram.svg";
import linkedinBlack from "../assets/icon/linkedin.svg";
import tiktokBlack from "../assets/icon/tiktok.svg";

// White social icons
import facebookWhite from "../assets/icon/whitefacebook.svg";
import instagramWhite from "../assets/icon/whtieinstagram.svg";
import linkedinWhite from "../assets/icon/whitelinkedin.svg";
import tiktokWhite from "../assets/icon/whitetiktok.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollY = useRef(0);
  const location = useLocation();

  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/aboutus" },
    { name: "Projects", path: "/projects" },
    { name: "360 Gallery", path: "/gallery360" },
    { name: "Contact Us", path: "/contactus" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      url: "https://web.facebook.com/dallol.consult",
      whiteIcon: facebookWhite,
      blackIcon: facebookBlack,
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/dallolconsult?igsh=Z2kwcXlheXpid2Np",
      whiteIcon: instagramWhite,
      blackIcon: instagramBlack,
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/dallol-consult/",
      whiteIcon: linkedinWhite,
      blackIcon: linkedinBlack,
    },
    {
      name: "TikTok",
      url: "https://www.tiktok.com/@dallol.consult?_t=ZM-8tsMnv9lVHp&_r=1",
      whiteIcon: tiktokWhite,
      blackIcon: tiktokBlack,
    },
  ];

  // Scroll listener for past-hero detection and hide-on-scroll-down / show-on-scroll-up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Detect whether navbar has scrolled past the hero section
      const heroElement = document.getElementById("Hero-section");
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        setIsPastHero(rect.bottom <= 80);
      } else {
        setIsPastHero(true);
      }

      // 2. Hide on scroll down, show on scroll up behavior
      if (currentScrollY <= 20) {
        // Near the top of the page: always visible
        setIsVisible(true);
      } else if (currentScrollY > prevScrollY.current + 6) {
        // Scrolling down: hide navbar
        setIsVisible(false);
      } else if (currentScrollY < prevScrollY.current - 6) {
        // Scrolling up: show navbar
        setIsVisible(true);
      }

      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [location.pathname]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 font-montserrat transition-all duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        } ${
          isPastHero
            ? "py-2.5 sm:py-3 lg:py-3.5"
            : "py-2.5 sm:py-3 lg:py-3.5 bg-transparent"
        }`}
        style={
          isPastHero
            ? {
                background:
                  "linear-gradient(180deg, rgba(255, 76, 29, 0.09) 0%, rgba(255, 76, 29, 0.05) 100%)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }
            : {
                background: "transparent",
              }
        }
      >
        <div className="w-full flex items-center justify-between px-3 sm:px-6 md:px-8 lg:px-10">
          {/* Left Column: White logo in Hero, Black logo past Hero */}
          <div className="flex-1 flex justify-start items-center">
            <NavLink
              to="/"
              className="inline-block transition-transform duration-200 hover:opacity-90"
            >
              <img
                src={isPastHero ? logoBlack : logoWhite}
                alt="Dallol Consult"
                className="h-8 sm:h-9 md:h-10 lg:h-11 xl:h-12 w-auto object-contain transition-all duration-300"
              />
            </NavLink>
          </div>

          {/* Center Column: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-10">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `text-xs xl:text-[13px] uppercase tracking-[0.16em] font-medium transition-colors duration-200 ${
                    isPastHero
                      ? isActive
                        ? "text-[#FF4C1D] font-bold"
                        : "text-black hover:text-[#FF4C1D]"
                      : isActive
                      ? "text-[#FFA53F] font-bold"
                      : "text-white hover:text-[#FFA53F]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Column: Social Media Icons (Desktop) & Mobile Hamburger */}
          <div className="flex-1 flex justify-end items-center gap-4">
            {/* Desktop Social Icons */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`p-1.5 rounded-full transition-all duration-200 hover:scale-115 flex items-center justify-center ${
                    isPastHero ? "hover:bg-[#FF4C1D]/10" : "hover:bg-white/10"
                  }`}
                >
                  <img
                    src={isPastHero ? social.blackIcon : social.whiteIcon}
                    alt={social.name}
                    className="w-5 h-5 object-contain transition-opacity duration-200"
                  />
                </a>
              ))}
            </div>

            {/* Mobile Hamburger Button (Only on Mobile/Tablet) */}
            <button
              onClick={() => setIsOpen(true)}
              aria-label="Open Menu"
              className="lg:hidden p-1.5 rounded-md focus:outline-none transition-colors"
            >
              <Menu
                size={28}
                className={`transition-colors duration-200 ${
                  isPastHero ? "text-black" : "text-white"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          onClick={closeMenu}
        />
      )}

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white shadow-2xl transform transition-transform duration-500 ease-out z-50 flex flex-col justify-between p-8 font-montserrat ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Header with Close Button */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <img
              src={logoBlack}
              alt="Dallol Consult"
              className="h-7 w-auto object-contain"
            />
            <button
              onClick={closeMenu}
              aria-label="Close Menu"
              className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={32} className="text-black" />
            </button>
          </div>

          {/* Nav Links in Drawer */}
          <ul className="flex flex-col space-y-6 mt-10">
            {navLinks.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    `text-2xl font-medium tracking-wide uppercase transition-colors ${
                      isActive
                        ? "text-[#FF4C1D] font-bold"
                        : "text-black hover:text-[#FF4C1D]"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer in Drawer with Social Links */}
        <div className="pt-6 border-t border-gray-100">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            Follow Us
          </p>
          <div className="flex items-center gap-5">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-2 rounded-full bg-gray-100 hover:bg-[#FF4C1D]/15 transition-colors"
              >
                <img
                  src={social.blackIcon}
                  alt={social.name}
                  className="w-5 h-5 object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
