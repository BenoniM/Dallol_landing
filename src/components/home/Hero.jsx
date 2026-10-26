import { useEffect, useState, useRef, useCallback } from "react";

const NARRATIVE_TEXT =
  "Build your dream with us. We believe great design begins with understanding, uniting visionary architecture and precision engineering to create spaces that honor our clients' aspirations and elevate the communities we serve.";

const words = NARRATIVE_TEXT.split(" ");

const Hero = () => {
  const heroRef = useRef(null);
  const videoRef = useRef(null);
  const narrativeRef = useRef(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPastHero, setIsPastHero] = useState(false);

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (heroRef.current) {
      const rect = heroRef.current.getBoundingClientRect();
      // If hero has completely scrolled past the top of the viewport
      if (rect.bottom <= 0) {
        setIsPastHero(true);
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      } else {
        setIsPastHero(false);
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }
    }

    if (narrativeRef.current) {
      const rect = narrativeRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start filling text when narrative top enters ~88% of viewport
      // Complete filling when narrative top reaches ~38% of viewport
      const start = windowHeight * 0.88;
      const end = windowHeight * 0.38;
      const raw = (start - rect.top) / (start - end);
      const clamped = Math.max(0, Math.min(1, raw));
      setScrollProgress(clamped);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  // Compute opacity for each word
  const getWordOpacity = (index) => {
    const total = words.length;
    const wordStart = index / total;
    const wordEnd = (index + 1) / total;

    if (scrollProgress >= wordEnd) return 1.0;
    if (scrollProgress <= wordStart) return 0.25;

    const factor = (scrollProgress - wordStart) / (wordEnd - wordStart);
    return 0.25 + factor * 0.75;
  };

  return (
    <section
      id="Hero-section"
      ref={heroRef}
      className="relative w-full font-montserrat"
    >
      {/* Fixed Video Background (stays in place as page scrolls) */}
      <div
        className={`fixed inset-0 w-full h-full z-0 overflow-hidden transition-opacity duration-300 pointer-events-none ${
          isPastHero ? "opacity-0" : "opacity-100"
        }`}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover scale-[1.02]"
        >
          <source
            src="https://videos.pexels.com/video-files/32348751/13800841_3840_2160_30fps.mp4"
            type="video/mp4"
          />
          <source
            src="https://www.pexels.com/download/video/32348751/"
            type="video/mp4"
          />
        </video>

        {/* Ambient Overlay for text legibility without over-dimming the video */}
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/75 via-black/20 to-black/35 pointer-events-none" />
      </div>

      {/* Hero Content Layer that scrolls naturally over the fixed video */}
      <div className="relative z-10 w-full flex flex-col justify-between">
        {/* First Viewport: Title on bottom left */}
        <div className="h-screen w-full flex flex-col justify-end px-3 sm:px-6 md:px-8 lg:px-10 pb-8 sm:pb-12 lg:pb-14">
          <div className="w-full text-left">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] font-bold tracking-tight text-white leading-[1.02] drop-shadow-md">
              Where Innovation
              <br />
              Meets Precision
            </h1>
          </div>
        </div>

        {/* Narrative Section: Placed below the title, on the right, with reduced gap below */}
        <div
          id="narrative-block"
          ref={narrativeRef}
          className="min-h-[45vh] flex flex-col justify-center px-3 sm:px-6 md:px-8 lg:px-10 pt-8 pb-12 sm:pb-16 md:pb-20"
        >
          <div className="w-full max-w-2xl lg:max-w-3xl ml-auto text-left">
            <p className="text-lg sm:text-xl md:text-2xl lg:text-[1.85rem] font-normal sm:font-medium leading-relaxed md:leading-relaxed tracking-tight text-white drop-shadow-sm">
              {words.map((word, idx) => {
                const opacity = getWordOpacity(idx);
                return (
                  <span
                    key={idx}
                    className="inline-block mr-[0.26em] transition-opacity duration-150"
                    style={{
                      opacity,
                      color: "#ffffff",
                    }}
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
