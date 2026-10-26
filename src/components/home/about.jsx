import React, { useEffect, useRef, useCallback } from "react";

const BG_IMAGE =
  "https://images.pexels.com/photos/34230319/pexels-photo-34230319.jpeg?auto=compress&cs=tinysrgb&w=1920";
const VIDEO_SRC = "https://www.pexels.com/download/video/7253208/";

const INTRO =
  "We believe Great Design begins with Understanding. Our mission is to create spaces that align with our clients' Visions and meet the needs of the Local Community.";
const OUTRO =
  "Every Dallol project begins by listening to our clients, to the site and to the people around it. From the first sketch to the final structure, we pair architectural vision with engineering precision, so each building is rooted in its place and built to endure for generations.";

// Total scroll length of the pinned section, in viewport heights.
const SECTION_VH = 6;

// The background keeps scrolling while the white panel rises, until the panel
// fills the screen (STOPS[4]). BG_RATE is how far it moves per unit of page
// scroll (1 = same speed as the page).
const BG_RATE = 0.5;

// Keyframes over scroll progress t (0..1). Sizes are fractions of the
// viewport: the background holds on its own for a moment, then the white
// panel rises, widens, fills the screen, and the video grows into the final
// framed shot.
const STOPS = [0, 0.08, 0.26, 0.5, 0.66, 0.83, 1];
const DESKTOP = {
  boxW: [0.34, 0.34, 0.34, 0.46, 1, 1, 1],
  boxH: [0.92, 0.92, 0.92, 1.3, 2.2, 2.2, 2.2],
  boxY: [1, 1, 0, 0, 0, 0, 0],
  vidW: [0.1, 0.1, 0.1, 0.15, 0.3, 0.5, 0.5],
  vidH: [0.31, 0.31, 0.31, 0.4, 0.56, 0.74, 0.74],
};
const MOBILE = {
  boxW: [0.88, 0.88, 0.88, 0.94, 1, 1, 1],
  boxH: [0.86, 0.86, 0.86, 1.3, 2.2, 2.2, 2.2],
  boxY: [1, 1, 0, 0, 0, 0, 0],
  vidW: [0.42, 0.42, 0.42, 0.55, 0.8, 0.88, 0.88],
  vidH: [0.26, 0.26, 0.26, 0.34, 0.4, 0.44, 0.44],
};

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
// Progress of t through [a, b], clamped and eased.
const range = (t, a, b) => easeInOut(clamp01((t - a) / (b - a)));

// Piecewise-eased value of a keyframe track at progress t.
const track = (values, t) => {
  for (let i = 1; i < STOPS.length; i++) {
    if (t <= STOPS[i]) {
      return lerp(values[i - 1], values[i], range(t, STOPS[i - 1], STOPS[i]));
    }
  }
  return values[values.length - 1];
};

const About = () => {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const boxRef = useRef(null);
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const videoRef = useRef(null);
  const outroTitleRef = useRef(null);
  const outroTextRef = useRef(null);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const totalScrollable = rect.height - vh;
    if (totalScrollable <= 0) return;
    const t = clamp01(-rect.top / totalScrollable);
    const k = vw < 1024 ? MOBILE : DESKTOP;

    // White panel, drawn as a clip of a full-screen layer.
    const boxW = track(k.boxW, t) * vw;
    const boxH = track(k.boxH, t) * vh;
    const boxTop = (vh - boxH) / 2 + track(k.boxY, t) * vh;
    const boxLeft = (vw - boxW) / 2;
    if (boxRef.current) {
      boxRef.current.style.clipPath = `inset(${boxTop.toFixed(1)}px ${boxLeft.toFixed(1)}px ${(vh - boxTop - boxH).toFixed(1)}px ${boxLeft.toFixed(1)}px)`;
    }

    // Background scrolls with the page until the panel covers it.
    if (bgRef.current) {
      const bgY = Math.min(t, STOPS[4]) * totalScrollable * BG_RATE;
      bgRef.current.style.transform = `translate3d(0, ${(-bgY).toFixed(1)}px, 0)`;
    }

    // "ABOUT" and the intro are pinned to the panel's top and bottom edges;
    // the panel grows taller than the screen, carrying them out of view.
    if (titleRef.current) {
      const fontSize = Math.min(boxW, k.boxW[3] * vw) * 0.25;
      const restY = boxTop + boxH * 0.03;
      titleRef.current.style.fontSize = `${fontSize.toFixed(1)}px`;
      titleRef.current.style.transform = `translate3d(-50%, ${restY.toFixed(1)}px, 0)`;
    }

    if (introRef.current) {
      const restW = k.boxW[2] * vw;
      const pad = Math.min(48, restW * 0.08);
      const h = introRef.current.offsetHeight;
      const restY = boxTop + boxH - pad - h;
      introRef.current.style.left = `${((vw - restW) / 2 + pad).toFixed(1)}px`;
      introRef.current.style.width = `${(restW - pad * 2).toFixed(1)}px`;
      introRef.current.style.transform = `translate3d(0, ${restY.toFixed(1)}px, 0)`;
    }

    // Video stays centred in the panel and grows to the final frame.
    if (videoRef.current) {
      const vidW = track(k.vidW, t) * vw;
      const vidH = track(k.vidH, t) * vh;
      videoRef.current.style.width = `${vidW.toFixed(1)}px`;
      videoRef.current.style.height = `${vidH.toFixed(1)}px`;
      videoRef.current.style.transform = `translate3d(${((vw - vidW) / 2).toFixed(1)}px, ${(boxTop + (boxH - vidH) / 2).toFixed(1)}px, 0)`;
    }

    // Closing title and description fade in around the full-size video.
    const outro = range(t, 0.68, 0.86);
    [outroTitleRef, outroTextRef].forEach((ref) => {
      if (!ref.current) return;
      ref.current.style.opacity = outro.toFixed(3);
      ref.current.style.transform = `translate3d(0, ${((1 - outro) * 40).toFixed(1)}px, 0)`;
    });
  }, []);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        handleScroll();
      });
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [handleScroll]);

  return (
    <article
      id="about"
      ref={containerRef}
      className="relative w-full bg-white font-montserrat text-neutral-900"
      style={{ height: `${SECTION_VH * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Background image */}
        <div
          ref={bgRef}
          className="absolute left-0 top-0 w-full bg-cover bg-center will-change-transform"
          style={{
            height: `${(1 + STOPS[4] * (SECTION_VH - 1) * BG_RATE) * 100}vh`,
            backgroundImage: `url(${BG_IMAGE})`,
          }}
        />

        {/* White panel */}
        <div
          ref={boxRef}
          className="absolute inset-0 bg-white will-change-[clip-path]"
          style={{ clipPath: "inset(100% 50% 0 50%)" }}
        />

        {/* Panel title */}
        <h2
          ref={titleRef}
          className="absolute left-1/2 top-0 whitespace-nowrap font-montserrat font-normal uppercase leading-[0.9] tracking-[0.02em] text-neutral-900 will-change-transform"
        >
          About
        </h2>

        {/* Panel intro text */}
        <p
          ref={introRef}
          className="absolute top-0 text-center text-sm leading-relaxed text-neutral-800 sm:text-base"
        >
          {INTRO}
        </p>

        {/* Video */}
        <div
          ref={videoRef}
          className="absolute left-0 top-0 overflow-hidden bg-neutral-200 will-change-transform"
        >
          <video
            className="h-full w-full object-cover"
            src={VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        </div>

        {/* Closing title, top left (clear of the video) */}
        <div
          ref={outroTitleRef}
          className="pointer-events-none absolute left-[3vw] top-[8vh] opacity-0 lg:left-[9vw] lg:top-[10vh] lg:w-[24vw]"
        >
          <span className="block font-montserrat text-4xl font-light leading-tight text-neutral-500 sm:text-5xl lg:text-4xl xl:text-5xl">
            Rooted in
          </span>
          <span className="block font-montserrat text-4xl font-normal uppercase leading-tight tracking-wide text-neutral-900 sm:text-5xl lg:text-4xl xl:text-5xl">
            Place
          </span>
        </div>

        {/* Closing description, bottom right */}
        <p
          ref={outroTextRef}
          className="absolute bottom-[6vh] left-[6vw] right-[6vw] text-sm leading-relaxed text-neutral-800 opacity-0 lg:bottom-[12vh] lg:left-[76vw] lg:right-auto lg:w-[14vw] xl:text-base"
        >
          {OUTRO}
        </p>
      </div>
    </article>
  );
};

export default About;
