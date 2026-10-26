import React, { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const INTRO =
  "We believe that architecture should be a reflection of the communities it serves. Our architectural and engineering design expertise is rooted in a deep understanding of both aesthetics and functionality.";

const ITEMS = [
  {
    id: 1,
    title: "Architectural and Engineering Design",
    description:
      "We believe that architecture should be a reflection of the communities it serves. Our architectural and engineering design expertise is rooted in a deep understanding of both aesthetics and functionality.",
  },
  {
    id: 2,
    title: "Design and Build",
    description:
      "Our design and build approach allows us to streamline the construction process, providing a seamless transition from concept to completion. We take ownership of every project phase, ensuring that our design vision is faithfully executed.",
  },
  {
    id: 3,
    title: "Project Management",
    description:
      "Successful project management is vital to navigating the complexities of architectural and construction projects. Our dedicated project management team employs structured methodologies to oversee all aspects of the project, from inception to completion.",
  },
  {
    id: 4,
    title: "Asset Valuation and Property Management",
    description:
      "Understanding the value of assets across various sectors is crucial in today’s ever-evolving market. Our asset valuation services provide comprehensive insights into performance metrics, market trends, and potential opportunities.",
  },
  {
    id: 5,
    title: "Training and Consultancy",
    description:
      "Recognizing the importance of continuous learning, we offer training and consultancy services designed to equip individuals and organizations with the knowledge and skills necessary to navigate the complexities of the built environment.",
  },
];

// Total scroll length of the pinned section, in viewport heights.
const SECTION_VH = 8;

// Scroll progress over which the intro darkens and blurs, and over which it
// clears again once the last card has gone.
const DIM_END = 0.08;
const UNDIM_START = 0.92;
// Each card's journey from below the screen to above it spans CARD_SPAN
// steps, so the next card starts rising while the previous one is leaving.
const CARD_START = 0.04;
const CARD_SPAN = 2;
const CARD_STEP = (UNDIM_START - CARD_START) / (ITEMS.length - 1 + CARD_SPAN);

const MAX_DIM = 0.6;
const MAX_BLUR = 10;
// How quickly the animation catches up with the scroll position each frame
// (lower is smoother but laggier).
const SMOOTHING = 0.1;

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
// Progress of t through [a, b], clamped and eased.
const range = (t, a, b) => easeInOut(clamp01((t - a) / (b - a)));

const Expertise = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const introRef = useRef(null);
  const introBlurRef = useRef(null);
  const dimRef = useRef(null);
  const cardRefs = useRef([]);
  const textRefs = useRef([]);
  const scrollHintRef = useRef(null);

  // Scroll progress (0..1) of the pinned section, or null if it can't scroll.
  const getProgress = useCallback(() => {
    if (!containerRef.current) return null;
    const rect = containerRef.current.getBoundingClientRect();
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable <= 0) return null;
    return clamp01(-rect.top / totalScrollable);
  }, []);

  const render = useCallback((t) => {
    const vh = window.innerHeight;

    // Intro darkens and goes out of focus while the cards pass, then clears.
    const dim = range(t, 0, DIM_END) * (1 - range(t, UNDIM_START, 1));
    if (dimRef.current) {
      dimRef.current.style.opacity = (dim * MAX_DIM).toFixed(3);
    }
    // Crossfade to a pre-blurred copy; animating the blur itself is slow.
    if (introRef.current) {
      introRef.current.style.opacity = (1 - dim).toFixed(3);
    }
    if (introBlurRef.current) {
      introBlurRef.current.style.opacity = dim.toFixed(3);
    }
    // Scroll hint shifts from grey to white as the background darkens.
    if (scrollHintRef.current) {
      const c = Math.round(lerp(115, 255, dim));
      scrollHintRef.current.style.color = `rgb(${c}, ${c}, ${c})`;
    }

    // Cards travel at a steady pace from below the screen to above it.
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const p = clamp01((t - CARD_START - i * CARD_STEP) / (CARD_STEP * CARD_SPAN));
      const h = card.offsetHeight;
      const y = lerp(vh, -h - 40, p);
      card.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0)`;
      card.style.visibility = p <= 0 || p >= 1 ? "hidden" : "visible";

      // Description fades up as the card rises into view.
      const text = textRefs.current[i];
      if (text) {
        const reveal = range(p, 0.15, 0.4);
        text.style.opacity = reveal.toFixed(3);
        text.style.transform = `translate3d(0, ${((1 - reveal) * 24).toFixed(1)}px, 0)`;
      }
    });
  }, []);

  // The rendered progress eases toward the scroll position frame by frame,
  // so jumps from the wheel or trackpad glide instead of snapping.
  useEffect(() => {
    let frame = 0;
    let current = getProgress() ?? 0;

    const tick = () => {
      frame = 0;
      const target = getProgress();
      if (target === null) return;
      current += (target - current) * SMOOTHING;
      if (Math.abs(target - current) < 0.0002) current = target;
      render(current);
      if (current !== target) frame = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    render(current);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [getProgress, render]);

  // Scroll hint follows the cursor horizontally.
  useEffect(() => {
    const onMove = (e) => {
      const el = scrollHintRef.current;
      if (!el) return;
      const half = el.offsetWidth / 2 + 16;
      const x = Math.min(window.innerWidth - half, Math.max(half, e.clientX));
      el.style.left = `${x}px`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <article
      id="expertise"
      ref={containerRef}
      className="relative w-full bg-white font-montserrat text-neutral-900"
      style={{ height: `${SECTION_VH * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Intro: label sits in the indent of the first line; the blurred copy
            fades in over the sharp one */}
        {[introRef, introBlurRef].map((ref, i) => (
          <div
            key={i}
            ref={ref}
            aria-hidden={i === 1}
            className="absolute inset-0 flex items-center justify-center px-3 pt-20 will-change-[opacity] sm:px-6 md:px-8 lg:px-10"
            style={
              i === 1
                ? { opacity: 0, filter: `blur(${MAX_BLUR}px)` }
                : undefined
            }
          >
            <div className="relative mx-auto w-full max-w-7xl">
              <span className="mb-6 block text-sm uppercase tracking-[0.15em] text-[#FF4C1D] font-medium lg:absolute lg:left-0 lg:top-[0.9em] lg:mb-0 lg:text-base">
                Our Expertise
              </span>
              <p className="text-3xl font-normal leading-[1.2] sm:text-4xl lg:indent-[30%] lg:text-5xl xl:text-6xl">
                {INTRO}
              </p>
            </div>
          </div>
        ))}

        {/* Darkening layer */}
        <div
          ref={dimRef}
          className="pointer-events-none absolute inset-0 bg-black opacity-0"
        />

        {/* Expertise cards, alternating left and right */}
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => (cardRefs.current[i] = el)}
            className={`invisible absolute left-3 right-3 top-0 flex h-[calc(100vh-112px)] max-h-[720px] flex-col border border-white/20 p-6 text-white shadow-2xl backdrop-blur-md backdrop-saturate-150 will-change-transform sm:left-6 sm:right-6 sm:p-8 md:left-8 md:right-8 lg:w-[36vw] ${
              i % 2 === 0
                ? "lg:left-10 lg:right-auto"
                : "lg:left-auto lg:right-10"
            }`}
            style={{
              background:
                "linear-gradient(135deg, rgba(1, 38, 61, 0.5) 0%, rgba(1, 38, 61, 0.3) 100%)",
              transform: "translate3d(0, 100vh, 0)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-2xl font-medium leading-tight sm:text-3xl xl:text-4xl">
                {item.title}
              </h3>
              <span className="pt-1 text-sm tracking-wider sm:text-base">
                ({String(item.id).padStart(2, "0")})
              </span>
            </div>

            <p
              ref={(el) => (textRefs.current[i] = el)}
              className="mt-auto text-sm leading-relaxed will-change-transform sm:text-base lg:indent-[30%] xl:text-lg"
            >
              {item.description}
            </p>

            <button
              onClick={() => navigate("/aboutus")}
              className="mt-10 flex w-full max-w-[320px] items-center justify-between bg-[#FF4C1D] px-4 py-3 text-sm uppercase tracking-[0.1em] text-white transition-colors duration-300 hover:bg-[#e03d12]"
            >
              View all
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        ))}

        <span
          ref={scrollHintRef}
          className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-[0.2em] transition-[left] duration-700 ease-out"
          style={{ color: "rgb(115, 115, 115)" }}
        >
          Scroll
        </span>
      </div>
    </article>
  );
};

export default Expertise;
