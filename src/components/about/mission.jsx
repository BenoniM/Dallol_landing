import React, { useEffect, useRef, useCallback } from "react";

const slides = [
  {
    id: "mission",
    title: "Our Mission",
    description:
      "To deliver quality-driven design and engineering services that foster dynamic and innovative architecture, ensuring every project meets the highest standards of excellence and creativity.",
    bg: "https://images.pexels.com/photos/1619660/pexels-photo-1619660.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    id: "vision",
    title: "Our Vision",
    description:
      "To be regarded as a respected international Design and Build firm that delivers concerted, responsive, and accessible expertise.",
    bg: "https://images.pexels.com/photos/39559653/pexels-photo-39559653.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
  {
    id: "values",
    title: "Our Values",
    description:
      "At Dallol Design Build, we are committed to excellence, innovation, and integrity in everything we do. We believe in delivering solutions that not only meet our clients' needs but also inspire through sustainable practices, precise execution, and a collaborative approach that ensures quality at every project stage.",
    bg: "https://images.pexels.com/photos/36150844/pexels-photo-36150844.jpeg?auto=compress&cs=tinysrgb&w=1920",
  },
];

const HOLD_START_VH = 0.3;
const SWIPE_VH = 1.0;
const HOLD_END_VH = 0.5;
const TOTAL_VH = 1 + HOLD_START_VH + (slides.length - 1) * SWIPE_VH + HOLD_END_VH;

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const Mission = () => {
  const containerRef = useRef(null);
  const layersRef = useRef([]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const totalScrollable = rect.height - vh;
    if (totalScrollable <= 0) return;

    const scrolled = -rect.top;
    const swipeStart = HOLD_START_VH * vh;
    const swipeTotal = (slides.length - 1) * SWIPE_VH * vh;

    const rawProgress = (scrolled - swipeStart) / swipeTotal;
    const clampedProgress = clamp01(rawProgress);
    const flipPos = clampedProgress * (slides.length - 1);

    const step = Math.floor(flipPos);
    const stepPos = step + easeInOut(flipPos - step);

    // Each layer (background + its centered text) wipes in from the bottom edge,
    // acting as a physical cover that reveals the new slide and covers the previous one.
    layersRef.current.forEach((layer, k) => {
      if (!layer) return;
      const d = k - stepPos;
      const isVisible = d > -1 && d < 1;
      layer.style.visibility = isVisible ? "visible" : "hidden";
      const insetVal = `inset(${(Math.max(0, d) * 100).toFixed(2)}% 0 0 0)`;
      layer.style.clipPath = insetVal;
      layer.style.webkitClipPath = insetVal;
    });
  }, []);

  useEffect(() => {
    let animationFrameId;
    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };
    const onResize = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    handleScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [handleScroll]);

  return (
    <section
      id="mission-section"
      ref={containerRef}
      className="relative w-full bg-neutral-950 font-montserrat"
      style={{ height: `${TOTAL_VH * 100}vh` }}
    >
      {/* Sticky Viewport Stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Full Layers: Each layer has its background, dark overlays, and centered text */}
        {slides.map((slide, k) => (
          <div
            key={slide.id}
            ref={(el) => {
              layersRef.current[k] = el;
            }}
            className="absolute inset-0 overflow-hidden"
            style={{
              zIndex: k + 1,
              clipPath: k === 0 ? "none" : "inset(100% 0 0 0)",
              WebkitClipPath: k === 0 ? "none" : "inset(100% 0 0 0)",
              visibility: k === 0 ? "visible" : "hidden",
            }}
          >
            {/* Background Image */}
            <img
              src={slide.bg}
              alt={slide.title}
              className="w-full h-full object-cover select-none pointer-events-none"
              draggable="false"
              loading={k === 0 ? "eager" : "lazy"}
            />

            {/* Cinematic Contrast Overlays */}
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/65" />

            {/* Centered Static Text (wipes and covers naturally WITH the layer) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 sm:px-10 md:px-14 text-center">
              <div className="max-w-5xl mx-auto flex flex-col items-center justify-center">
                <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-tight mb-4 sm:mb-6">
                  {slide.title}
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-light text-white/95 leading-relaxed sm:leading-[1.7] max-w-3xl lg:max-w-4xl tracking-normal">
                  {slide.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mission;



