import React, { useState, useEffect, useRef } from "react";
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

const Navbar = ({ forceDark = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isOverDarkSection, setIsOverDarkSection] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const prevScrollY = useRef(0);
  const location = useLocation();

  const lightRoutes = [
    "/blogdetails",
    "/hotelmall",
    "/schooldetails",
    "/henok-t-residence",
  ];
  const isLightHero = forceDark || lightRoutes.includes(location.pathname);
  const useDarkTheme =
    isOpen || (!isOverDarkSection && (isLightHero || isPastHero));

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

  // Disable background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu on desktop viewport resize or Escape key press
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Scroll listener for past-hero detection and hide-on-scroll-down / show-on-scroll-up
  useEffect(() => {
    const handleScroll = () => {
      // Don't modify visibility while mobile menu is open
      if (isOpen) {
        setIsVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;

      // 1. Detect whether navbar has scrolled past the hero section
      const heroElement = document.getElementById("Hero-section");
      if (heroElement) {
        const rect = heroElement.getBoundingClientRect();
        setIsPastHero(rect.bottom <= 80);
      } else {
        setIsPastHero(currentScrollY > 80);
      }

      // 2b. Detect if navbar is overlapping a dark section (the
      // mission/vision/values section, or any element marked data-nav-dark)
      const darkEls = document.querySelectorAll(
        "#mission-section, [data-nav-dark]"
      );
      setIsOverDarkSection(
        Array.from(darkEls).some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= 80 && r.bottom > 80;
        })
      );

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
    const rafId = requestAnimationFrame(handleScroll);
    const timeoutId = setTimeout(handleScroll, 60);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
  }, [location.pathname, isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 w-full z-50 font-montserrat transition-all duration-300 ease-in-out ${
          isVisible || isOpen ? "translate-y-0" : "-translate-y-full"
        } ${
          isPastHero || isLightHero
            ? "py-2.5 sm:py-3 lg:py-3.5"
            : "py-2.5 sm:py-3 lg:py-3.5 bg-transparent"
        }`}
        style={
          isOpen
            ? {
                background: "transparent",
              }
            : isOverDarkSection
            ? {
                background: "transparent",
              }
            : isPastHero
            ? {
                background:
                  "linear-gradient(180deg, rgba(255, 76, 29, 0.09) 0%, rgba(255, 76, 29, 0.05) 100%)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }
            : isLightHero
            ? {
                background: "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
              }
            : {
                background: "transparent",
              }
        }
      >
        <div className="w-full flex items-center justify-between px-3 sm:px-6 md:px-8 lg:px-10">
          {/* Left Column: White logo in Hero, Black logo past Hero or when menu is open or on light hero */}
          <div className="flex-1 flex justify-start items-center">
            <NavLink
              to="/"
              onClick={closeMenu}
              className="inline-block transition-transform duration-200 hover:opacity-90"
            >
              <img
                src={useDarkTheme ? logoBlack : logoWhite}
                alt="Dallol Consult"
                className="h-10 sm:h-11 md:h-11 lg:h-11 xl:h-12 w-auto object-contain transition-all duration-300"
              />
            </NavLink>
          </div>

          {/* Center Column: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center justify-center gap-7 xl:gap-10">
            {navLinks.map((item) => {
              const isProjectActive = item.path === "/projects" && isLightHero;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => {
                    const active = isActive || isProjectActive;
                    return `text-xs xl:text-[13px] uppercase tracking-[0.16em] font-medium transition-colors duration-200 ${
                      useDarkTheme
                        ? active
                          ? "text-[#FF4C1D] font-bold"
                          : "text-black hover:text-[#FF4C1D]"
                        : active
                        ? "text-[#FFA53F] font-bold"
                        : "text-white hover:text-[#FFA53F]"
                    }`;
                  }}
                >
                  {item.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Column: Social Media Icons (Desktop) & Mobile Two-Line Hamburger / X Button */}
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
                    useDarkTheme ? "hover:bg-[#FF4C1D]/10" : "hover:bg-white/10"
                  }`}
                >
                  <img
                    src={useDarkTheme ? social.blackIcon : social.whiteIcon}
                    alt={social.name}
                    className="w-5 h-5 object-contain transition-opacity duration-200"
                  />
                </a>
              ))}
            </div>

            {/* Mobile Animated Two-Line Hamburger to X Toggle Button */}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={isOpen}
              className="lg:hidden relative w-10 h-10 flex items-center justify-center focus:outline-none"
            >
              <div className="relative w-[30px] h-6 flex items-center justify-center pointer-events-none">
                {/* Line 1: Top bar in hamburger, rotates 45deg to form diagonal of X */}
                <span
                  className={`absolute w-[30px] h-[2.5px] transition-transform duration-300 ease-in-out origin-center ${
                    useDarkTheme ? "bg-black" : "bg-white"
                  } ${
                    isOpen
                      ? "translate-y-0 rotate-45"
                      : "-translate-y-[5px] rotate-0"
                  }`}
                />
                {/* Line 2: Bottom bar in hamburger, rotates -45deg to form diagonal of X */}
                <span
                  className={`absolute w-[30px] h-[2.5px] transition-transform duration-300 ease-in-out origin-center ${
                    useDarkTheme ? "bg-black" : "bg-white"
                  } ${
                    isOpen
                      ? "translate-y-0 -rotate-45"
                      : "translate-y-[5px] rotate-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Page Elongating Mobile Menu (Mobile Version Only: lg:hidden) */}
      <div
        id="mobile-fullscreen-menu"
        aria-hidden={!isOpen}
        className={`lg:hidden fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto overscroll-contain ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 76, 29, 0.14) 0%, rgba(255, 76, 29, 0.08) 100%), rgba(255, 255, 255, 0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          clipPath: isOpen ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
          transition:
            "clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease-in-out",
        }}
      >
        {/* Spacer for header height so menu content flows cleanly underneath fixed header */}
        <div className="w-full h-16 sm:h-20 flex-shrink-0" aria-hidden="true" />

        {/* Center Navigation Links (Big Font & Centered) */}
        <div
          className={`flex-1 flex flex-col items-center justify-center px-6 py-6 transition-all duration-500 delay-100 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <nav className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 text-center">
            {navLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `text-2xl sm:text-3xl md:text-4xl font-semibold uppercase tracking-[0.12em] transition-all duration-300 relative py-1 ${
                    isActive
                      ? "text-[#FF4C1D] scale-105"
                      : "text-black hover:text-[#FF4C1D] active:scale-95"
                  }`
                }
              >
                {({ isActive }) => (
                  <span className="inline-flex items-center gap-2">
                    {item.name}
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#FF4C1D] inline-block" />
                    )}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Bottom Center Social Media Icons */}
        <div
          className={`pb-8 sm:pb-10 pt-4 flex flex-col items-center justify-center flex-shrink-0 transition-all duration-500 delay-150 ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-[11px] uppercase tracking-[0.24em] text-neutral-500 mb-4 font-medium text-center">
            Follow Us
          </p>
          <div className="flex items-center justify-center gap-5 sm:gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className="p-3 rounded-full bg-black/5 hover:bg-[#FF4C1D]/15 active:scale-90 transition-all duration-200 flex items-center justify-center"
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
