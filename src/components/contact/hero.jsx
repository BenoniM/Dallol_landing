import React, { useEffect, useState, useRef, useCallback } from "react";

const DESCRIPTION_TEXT =
  "Great architecture begins with an open conversation. Whether you are envisioning a transformative commercial development, a bespoke private residence, or seeking expert engineering consultancy, our team is ready to collaborate. Let us unite your vision with our multidisciplinary expertise to build something extraordinary together.";

const words = DESCRIPTION_TEXT.split(" ");

const Hero = () => {
  const heroImageRef = useRef(null);
  const narrativeRef = useRef(null);

  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Scroll to top on initial mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Handle scroll events for parallax image and word-filling narrative
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    setScrollY(currentScrollY);

    if (narrativeRef.current) {
      const rect = narrativeRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start filling words when narrative block enters ~88% of viewport
      // Complete filling when narrative top reaches ~35% of viewport
      const start = windowHeight * 0.88;
      const end = windowHeight * 0.35;
      const raw = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, raw));
      setScrollProgress(clamped);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  // Compute opacity for each word as the user scrolls
  const getWordOpacity = (index) => {
    const total = words.length;
    const wordStart = index / total;
    const wordEnd = (index + 1) / total;

    if (scrollProgress >= wordEnd) return 1.0;
    if (scrollProgress <= wordStart) return 0.22;

    const factor = (scrollProgress - wordStart) / (wordEnd - wordStart);
    return 0.22 + factor * 0.78;
  };

  return (
    <article className="w-full font-montserrat">
      {/* 
        h-screen Hero Section:
        - Top area: Background image with parallax scroll effect
        - Bottom area: Clean white space strip containing "CONTACT US" title
      */}
      <section className="relative w-full h-screen flex flex-col justify-between overflow-hidden bg-white">
        {/* Top Image Section */}
        <div
          id="Hero-section"
          ref={heroImageRef}
          className="relative w-full flex-1 min-h-0 overflow-hidden bg-neutral-950"
        >
          {/* Parallax Background Image */}
          <div
            className="absolute inset-0 w-full h-full pointer-events-none will-change-transform"
            style={{
              transform: `translate3d(0, ${scrollY * 0.35}px, 0) scale(1.08)`,
              transformOrigin: "center top",
            }}
          >
            <img
              src="https://images.pexels.com/photos/257727/pexels-photo-257727.jpeg"
              alt="Contact Dallol Design Build"
              className="w-full h-full object-cover object-center"
              loading="eager"
            />
          </div>

          {/* Ambient Top Vignette for White Navbar Contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>

        {/* White Space at bottom of h-screen containing "Contact Us" */}
        <div className="relative z-10 w-full bg-white flex items-center justify-center px-4 sm:px-6 md:px-8 pt-4 sm:pt-5 lg:pt-6 pb-2 sm:pb-3 lg:pb-3 flex-shrink-0">
          <h1 className="font-montserrat font-bold uppercase tracking-tight text-neutral-900 leading-none text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] select-none text-center">
            Contact Us
          </h1>
        </div>
      </section>

      {/* 
        White Space Container below the h-screen Hero:
        - Centered scroll-driven narrative paragraph filling out word-by-word
      */}
      <section className="relative z-10 w-full bg-white text-black">
        <div
          ref={narrativeRef}
          className="w-full max-w-2xl sm:max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 md:px-8 pt-2 sm:pt-3 md:pt-4 pb-16 sm:pb-20 md:pb-24 text-center"
        >
          <p className="font-montserrat text-base sm:text-lg md:text-xl lg:text-[1.32rem] xl:text-[1.4rem] font-light sm:font-normal leading-relaxed md:leading-[1.75] tracking-normal text-neutral-800">
            {words.map((word, idx) => {
              const opacity = getWordOpacity(idx);
              return (
                <span
                  key={idx}
                  className="inline-block mr-[0.26em] transition-opacity duration-150"
                  style={{
                    opacity,
                    color: "#262626",
                  }}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>
      </section>
    </article>
  );
};

export default Hero;
