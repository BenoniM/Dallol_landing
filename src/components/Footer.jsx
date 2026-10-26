import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import footerBgLocal from "../assets/img/footer-bg.jpg";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const bgImageUrl = "https://images.pexels.com/photos/9618450/pexels-photo-9618450.jpeg";

  return (
    <footer
      className="relative flex h-screen min-h-screen w-full flex-col justify-between overflow-hidden bg-cover bg-center bg-no-repeat text-white px-6 py-6 sm:px-12 sm:py-8 lg:px-16 lg:py-10"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(15, 15, 15, 0.3), rgba(10, 10, 10, 0.45)), url('${bgImageUrl}'), url('${footerBgLocal}')`,
      }}
    >
      {/* Centered Glassy Box occupying the main viewport height */}
      <div className="my-auto mx-auto flex h-[76vh] w-full max-w-7xl flex-col justify-between p-8 sm:p-12 lg:p-16"
        style={{
          backgroundColor: "rgba(18, 18, 18, 0.48)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderRadius: 0,
          border: "none",
        }}
      >
        {/* Top Left: Section Label */}
        <div className="self-start">
          <span className="block text-xs font-semibold uppercase tracking-[0.25em] text-white/80 sm:text-sm">
            Contact Us
          </span>
        </div>

        {/* Bottom Row: Big "Let's Talk" on Bottom-Left, Navigation & Info on Bottom-Right */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          {/* Bottom Left: Huge Display "Let's Talk" */}
          <div>
            <Link
              to="/contactus"
              className="inline-block text-5xl font-light tracking-tight text-white transition-opacity duration-300 hover:opacity-80 sm:text-7xl lg:text-8xl font-montserrat"
            >
              Let's Talk
            </Link>
          </div>

          {/* Bottom Right: Navigation and Get In Touch */}
          <div className="flex flex-wrap gap-8 text-sm font-light sm:gap-14 lg:gap-16">
            {/* Navigation */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Navigation
              </h3>
              <ul className="space-y-1.5 text-white/85">
                <li>
                  <Link
                    to="/"
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/aboutus"
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/projects"
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery360"
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    360 Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contactus"
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Get In Touch */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                Get In Touch
              </h3>
              <div className="space-y-1.5 text-white/85">
                <p>Addis Ababa, Ethiopia</p>
                <p>
                  <a
                    href="tel:+251911606260"
                    className="transition-colors duration-200 hover:text-primary"
                  >
                    +251 911 606 260
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:contact@dallolconsult.com"
                    className="break-all transition-colors duration-200 hover:text-primary"
                  >
                    contact@dallolconsult.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Rights Reserved at the bottom outside the box */}
      <div className="w-full pb-2 pt-4 text-center">
        <p className="text-xs font-light tracking-widest text-white/75 sm:text-sm">
          © {currentYear} Dallol Design Build, All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
