import React, { useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ClientAvatar from "./ClientAvatar";

const testimonials = [
  {
    id: 1,
    avatar: { bg: "#F3EDE6", accent: "#FF4C1D", skin: "#F2C9A8", skinShade: "#D9A07C", hair: "#3B2A20", shirt: "#00040D", hairStyle: "long" },
    name: "Emily Johnson",
    role: "HOMEOWNER & INVESTOR",
    feedback:
      "I never imagined my dream home could become a reality until I partnered with Dallol Consult. Their attention to detail in architectural design created a space that truly feels like mine.",
  },
  {
    id: 2,
    avatar: { bg: "#E7ECEF", accent: "#FF4C1D", skin: "#C98E64", skinShade: "#A86E46", hair: "#1E1E1E", shirt: "#082D38", hairStyle: "short" },
    name: "David Miller",
    role: "COMMERCIAL DEVELOPER",
    feedback:
      "Dallol Consult made navigating the complexities of permit preparation a breeze. Their expertise ensured that my renovation project moved forward without a hitch, allowing me to focus on my vision.",
  },
  {
    id: 3,
    avatar: { bg: "#EDEDED", accent: "#082D38", skin: "#F5D3B5", skinShade: "#D9A887", hair: "#151515", shirt: "#FF4C1D", hairStyle: "bob" },
    name: "Laura Lee",
    role: "DIRECTOR, PROPERTY VENTURES",
    feedback:
      "The precision in the 3D modeling service is remarkable. Seeing my ideas visualized in such detail before construction gave me the confidence to make informed decisions.",
  },
  {
    id: 4,
    avatar: { bg: "#E9E4DC", accent: "#FF4C1D", skin: "#EBC0A0", skinShade: "#C99573", hair: "#6B4A32", shirt: "#1F2933", hairStyle: "short", beard: true },
    name: "Kirill Stan",
    role: "CEO & FOUNDER",
    feedback:
      "Good design feels inevitable. Nothing extra, nothing missing. Dallol executes spatial concepts with uncompromising structural precision.",
  },
  {
    id: 5,
    avatar: { bg: "#F1E8E1", accent: "#FF4C1D", skin: "#8D5B3E", skinShade: "#6A3F27", hair: "#1A1210", shirt: "#082D38", hairStyle: "bun" },
    name: "Sarah Jenkins",
    role: "HOSPITALITY PARTNER",
    feedback:
      "From feasibility study to master plan, the dedication Dallol brought to our resort project set a new benchmark for architecture in the region.",
  },
  {
    id: 6,
    avatar: { bg: "#E4E9EC", accent: "#FF4C1D", skin: "#E8C097", skinShade: "#C79870", hair: "#0F0F0F", shirt: "#00040D", hairStyle: "curly", glasses: true },
    name: "Michael Chang",
    role: "URBAN DEVELOPMENT CONSULTANT",
    feedback:
      "Collaborating with Dallol Consult transformed our complex urban site into a vibrant, functional community landmark with enduring civic value.",
  },
  {
    id: 7,
    avatar: { bg: "#F0ECE6", accent: "#082D38", skin: "#F7D9C4", skinShade: "#D8AE92", hair: "#B5793F", shirt: "#5A6B73", hairStyle: "long" },
    name: "Elena Rostova",
    role: "INTERIOR DESIGN DIRECTOR",
    feedback:
      "Dallol's ability to balance light, texture, and structural honesty made working alongside their team an inspiring architectural partnership.",
  },
];

// Replicate ProjectsSection wipe sequence: append first element as clone for continuous loop
const SEQUENCE = [...testimonials, testimonials[0]];

const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

const OurHappyClients = () => {
  const currentPosRef = useRef(0);
  const isBusyRef = useRef(false);
  const animIdRef = useRef(null);

  const avatarBoxRef = useRef(null);
  const imageLayersRef = useRef([]);
  const quotesRef = useRef([]);
  const namesRef = useRef([]);

  // Direct implementation of ProjectsSection's layer wipe & text ticker logic
  const updateDisplay = useCallback((stepPos) => {
    // 1. Image wipe layers (matching ProjectsSection.jsx lines 345-352)
    imageLayersRef.current.forEach((layer, k) => {
      if (!layer) return;
      const d = k - stepPos;
      layer.style.visibility = d > -1 && d < 1 ? "visible" : "hidden";
      layer.style.clipPath = `inset(${(Math.max(0, d) * 100).toFixed(2)}% 0 0 0)`;
    });

    // 2. Quote ticker (matching ProjectsSection.jsx lines 110-117)
    quotesRef.current.forEach((el, i) => {
      if (!el) return;
      const d = i - stepPos;
      el.style.transform = `translate3d(0, ${(d * 100).toFixed(2)}%, 0)`;
      el.style.opacity = Math.max(0, 1 - Math.abs(d) * 1.3).toFixed(3);
      el.style.visibility = Math.abs(d) < 1.1 ? "visible" : "hidden";
    });

    // 3. Name ticker (matching ProjectsSection.jsx lines 110-117)
    namesRef.current.forEach((el, i) => {
      if (!el) return;
      const d = i - stepPos;
      el.style.transform = `translate3d(0, ${(d * 100).toFixed(2)}%, 0)`;
      el.style.opacity = Math.max(0, 1 - Math.abs(d) * 1.3).toFixed(3);
      el.style.visibility = Math.abs(d) < 1.1 ? "visible" : "hidden";
    });
  }, []);

  const animateTo = useCallback(
    (targetPos) => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      const startPos = currentPosRef.current;
      const startTime = performance.now();
      const duration = 650; // ms

      const frame = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeInOut(progress);
        const stepPos = startPos + (targetPos - startPos) * eased;

        updateDisplay(stepPos);

        if (progress < 1) {
          animIdRef.current = requestAnimationFrame(frame);
        } else {
          // Wrap around seamlessly
          let finalPos = targetPos;
          if (finalPos >= testimonials.length) {
            finalPos = 0;
          } else if (finalPos < 0) {
            finalPos = testimonials.length - 1;
          }
          currentPosRef.current = finalPos;
          updateDisplay(finalPos);
          isBusyRef.current = false;
        }
      };

      animIdRef.current = requestAnimationFrame(frame);
    },
    [updateDisplay]
  );

  const handleNext = () => {
    if (isBusyRef.current) return;
    isBusyRef.current = true;
    animateTo(currentPosRef.current + 1);
  };

  const handlePrev = () => {
    if (isBusyRef.current) return;
    isBusyRef.current = true;

    // If at index 0, seamlessly jump to the clone at the end and animate backwards
    if (currentPosRef.current === 0) {
      currentPosRef.current = testimonials.length;
      updateDisplay(testimonials.length);
    }
    animateTo(currentPosRef.current - 1);
  };

  useEffect(() => {
    updateDisplay(0);
    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
    };
  }, [updateDisplay]);

  // Cursor tracking for the avatars: eases --lx / --ly (look direction, -1..1)
  // and --lh (hover, 0..1) on the avatar box; the SVG layers read them via CSS.
  useEffect(() => {
    const box = avatarBoxRef.current;
    if (!box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clamp = (v) => Math.max(-1, Math.min(1, v));
    const target = { x: 0, y: 0, h: 0 };
    const current = { x: 0, y: 0, h: 0 };
    let raf = null;

    const tick = () => {
      let moving = false;
      for (const k of ["x", "y", "h"]) {
        const diff = target[k] - current[k];
        current[k] += diff * 0.1;
        if (Math.abs(diff) > 0.001) moving = true;
      }
      box.style.setProperty("--lx", current.x.toFixed(4));
      box.style.setProperty("--ly", current.y.toFixed(4));
      box.style.setProperty("--lh", current.h.toFixed(4));
      raf = moving ? requestAnimationFrame(tick) : null;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const r = box.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height * 0.46;
      target.x = clamp((e.clientX - cx) / (window.innerWidth * 0.45));
      target.y = clamp((e.clientY - cy) / (window.innerHeight * 0.45));
      target.h =
        e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom
          ? 1
          : 0;
      kick();
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      target.h = 0;
      kick();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <article className="w-full py-12 md:py-20 bg-white font-montserrat">
      <div className="w-full px-3 sm:px-6 md:px-8 lg:px-10">
        {/* Header Section */}
        <section className="flex flex-col items-center justify-center w-full px-4 gap-3 mb-10 sm:mb-12">
          <p className="lg:text-5xl text-3xl font-semibold text-[#082D38]">
            Our Happy Clients
          </p>
          <p className="text-center max-w-2xl text-neutral-400 font-montserrat text-sm sm:text-base leading-relaxed">
            Elevate your project with testimonials from those who have experienced
            the transformative impact of Dallol Consult.
          </p>
        </section>

        {/* 3 Separate Boxes */}
        <div className="w-full flex flex-col md:flex-row items-stretch gap-4 sm:gap-5 lg:gap-6">
          {/* Left Box: Interactive client avatar (Square) using ProjectsSection clipPath wipe */}
          <div
            ref={avatarBoxRef}
            className="w-full md:w-[280px] lg:w-[340px] xl:w-[380px] aspect-square shrink-0 bg-neutral-100 overflow-hidden rounded-none border border-neutral-200/80 relative"
          >
            {SEQUENCE.map((item, k) => (
              <div
                key={`client-img-${k}-${item.id}`}
                ref={(el) => {
                  imageLayersRef.current[k] = el;
                }}
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: k === 0 ? "none" : "inset(100% 0 0 0)",
                  visibility: k === 0 ? "visible" : "hidden",
                }}
              >
                <ClientAvatar
                  avatar={item.avatar}
                  name={item.name}
                  blinkDelay={(k % testimonials.length) * 0.9}
                />
              </div>
            ))}
          </div>

          {/* Center Box: Quote on top-left, Name + nav buttons on bottom */}
          <div className="flex-1 min-w-0 bg-white border border-neutral-200/80 rounded-none p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between min-h-[260px] md:min-h-0 overflow-hidden relative">
            {/* Top Left: What they said */}
            <div className="relative w-full h-[140px] sm:h-[160px] md:h-[180px] lg:h-[200px] overflow-hidden">
              {SEQUENCE.map((item, k) => (
                <div
                  key={`client-quote-${k}-${item.id}`}
                  ref={(el) => {
                    quotesRef.current[k] = el;
                  }}
                  className="absolute inset-0 flex items-start"
                  style={{
                    transform: `translate3d(0, ${k * 100}%, 0)`,
                    opacity: k === 0 ? 1 : 0,
                    visibility: k === 0 ? "visible" : "hidden",
                  }}
                >
                  <p className="font-montserrat text-neutral-800 text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed">
                    "{item.feedback}"
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom: name on the right, nav buttons on the left (mobile only) */}
            <div className="flex items-end justify-between mt-6 gap-4">
              {/* Mobile-only nav buttons — bottom-left, bluish bg, white arrows */}
              <div className="flex items-center gap-2 md:hidden">
                <button
                  onClick={handlePrev}
                  aria-label="Previous client"
                  className="w-9 h-9 bg-[#00040D] text-white flex items-center justify-center rounded-sm hover:bg-[#0A1220] transition-colors duration-200 cursor-pointer active:scale-95 shadow"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next client"
                  className="w-9 h-9 bg-[#00040D] text-white flex items-center justify-center rounded-sm hover:bg-[#0A1220] transition-colors duration-200 cursor-pointer active:scale-95 shadow"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              {/* Person's name — right-aligned */}
              <div className="relative flex-1 min-w-0 text-right h-[60px] overflow-hidden">
                {SEQUENCE.map((item, k) => (
                  <div
                    key={`client-name-${k}-${item.id}`}
                    ref={(el) => {
                      namesRef.current[k] = el;
                    }}
                    className="absolute inset-0 flex flex-col justify-center items-end"
                    style={{
                      transform: `translate3d(0, ${k * 100}%, 0)`,
                      opacity: k === 0 ? 1 : 0,
                      visibility: k === 0 ? "visible" : "hidden",
                    }}
                  >
                    <h3 className="font-montserrat text-lg sm:text-xl md:text-2xl font-semibold text-neutral-900 leading-tight">
                      {item.name}
                    </h3>
                    <p className="font-montserrat text-xs uppercase tracking-widest text-neutral-500 mt-1 leading-tight">
                      {item.role}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Box: hidden on mobile, visible on md+ */}
          <div data-nav-dark className="hidden md:flex w-full md:w-[280px] lg:w-[340px] xl:w-[380px] aspect-square shrink-0 bg-[#00040D] items-center justify-center rounded-none border-0 py-8 md:py-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={handlePrev}
                aria-label="Previous client"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#00040D] flex items-center justify-center rounded-none border-0 hover:bg-[#FF4C1D] hover:text-white transition-colors duration-200 cursor-pointer shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next client"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#00040D] flex items-center justify-center rounded-none border-0 hover:bg-[#FF4C1D] hover:text-white transition-colors duration-200 cursor-pointer shadow-sm active:scale-95"
              >
                <ChevronRight className="w-6 h-6 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default OurHappyClients;
