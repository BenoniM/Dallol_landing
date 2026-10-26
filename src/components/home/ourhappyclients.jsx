import React, { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import avatar1 from "../../assets/img/avatergirl.svg";
import avatar2 from "../../assets/img/avaterman.svg";
import avatar3 from "../../assets/img/avaterchina.svg";

const testimonials = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    fallback: avatar1,
    name: "Emily Johnson",
    role: "HOMEOWNER & INVESTOR",
    feedback:
      "I never imagined my dream home could become a reality until I partnered with Dallol Consult. Their attention to detail in architectural design created a space that truly feels like mine.",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    fallback: avatar2,
    name: "David Miller",
    role: "COMMERCIAL DEVELOPER",
    feedback:
      "Dallol Consult made navigating the complexities of permit preparation a breeze. Their expertise ensured that my renovation project moved forward without a hitch, allowing me to focus on my vision.",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    fallback: avatar3,
    name: "Laura Lee",
    role: "DIRECTOR, PROPERTY VENTURES",
    feedback:
      "The precision in the 3D modeling service is remarkable. Seeing my ideas visualized in such detail before construction gave me the confidence to make informed decisions.",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    fallback: avatar2,
    name: "Kirill Stan",
    role: "CEO & FOUNDER",
    feedback:
      "Good design feels inevitable. Nothing extra, nothing missing. Dallol executes spatial concepts with uncompromising structural precision.",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80",
    fallback: avatar1,
    name: "Sarah Jenkins",
    role: "HOSPITALITY PARTNER",
    feedback:
      "From feasibility study to master plan, the dedication Dallol brought to our resort project set a new benchmark for architecture in the region.",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=800&q=80",
    fallback: avatar2,
    name: "Michael Chang",
    role: "URBAN DEVELOPMENT CONSULTANT",
    feedback:
      "Collaborating with Dallol Consult transformed our complex urban site into a vibrant, functional community landmark with enduring civic value.",
  },
  {
    id: 7,
    img: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=800&q=80",
    fallback: avatar3,
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
          {/* Left Box: Client Image (Square) using ProjectsSection clipPath wipe */}
          <div className="w-full md:w-[280px] lg:w-[340px] xl:w-[380px] aspect-square shrink-0 bg-neutral-100 overflow-hidden rounded-none border border-neutral-200/80 relative">
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
                <img
                  src={item.img}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.src = item.fallback;
                  }}
                  className="w-full h-full object-cover grayscale contrast-105 select-none"
                  draggable="false"
                />
              </div>
            ))}
          </div>

          {/* Center Box: Quote on top-left, Name on bottom-right using ProjectsSection ticker */}
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

            {/* Bottom Right: Person's name */}
            <div className="relative self-end text-right h-[60px] w-full max-w-xs overflow-hidden mt-6">
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

          {/* Right Box: #01263D Background (Square) with Chevron Navigation Buttons */}
          <div className="w-full md:w-[280px] lg:w-[340px] xl:w-[380px] aspect-square shrink-0 bg-[#01263D] flex items-center justify-center rounded-none border-0 py-8 md:py-0">
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={handlePrev}
                aria-label="Previous client"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#01263D] flex items-center justify-center rounded-none border-0 hover:bg-[#FF4C1D] hover:text-white transition-colors duration-200 cursor-pointer shadow-sm active:scale-95"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next client"
                className="w-12 h-12 sm:w-14 sm:h-14 bg-white text-[#01263D] flex items-center justify-center rounded-none border-0 hover:bg-[#FF4C1D] hover:text-white transition-colors duration-200 cursor-pointer shadow-sm active:scale-95"
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
