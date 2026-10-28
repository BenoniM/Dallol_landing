import React, { useCallback, useEffect, useRef, useState } from "react";

const PX = (id) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1280`;

const expertise = [
  {
    id: 1,
    title: "Architectural and Engineering Design",
    description:
      "We believe that architecture should be a reflection of the communities it serves. Our architectural and engineering design expertise is rooted in a deep understanding of both aesthetics and functionality.",
    img: PX(834892),
  },
  {
    id: 2,
    title: "Design and Build",
    description:
      "Our design and build approach allows us to streamline the construction process, providing a seamless transition from concept to completion. We take ownership of every project phase, ensuring that our design vision is faithfully executed.",
    img: PX(2219024),
  },
  {
    id: 3,
    title: "Project Management",
    description:
      "Successful project management is vital to navigating the complexities of architectural and construction projects. Our dedicated project management team employs structured methodologies to oversee all aspects of the project, from inception to completion.",
    img: PX(1216589),
  },
  {
    id: 4,
    title: "Asset Valuation and Property Management",
    description:
      "Understanding the value of assets across various sectors is crucial in today’s ever-evolving market. Our asset valuation services provide comprehensive insights into performance metrics, market trends, and potential opportunities.",
    img: PX(8470806),
  },
  {
    id: 5,
    title: "Training and Consultancy",
    description:
      "Recognizing the importance of continuous learning, we offer training and consultancy services designed to equip individuals and organizations with the knowledge and skills necessary to navigate the complexities of the built environment.",
    img: PX(1181396),
  },
];

const introLines = ["Rooted in Ethiopia.", "Designed with intent.", "Built to endure."];

// Scroll budget (in viewport heights) around the horizontal travel
const HOLD_START_VH = 0.25;
const ENTER_VH = 1;
// First panel's content starts revealing halfway through its entrance and
// finishes over this much extra scroll after it lands
const REVEAL_VH = 0.3;
const HOLD_END_VH = 0.25;

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

const panelWidthFor = (w) => (w >= 1024 ? w * 0.5 : w >= 640 ? w * 0.75 : w);

// Letters/words fade in sequentially as the panel's --p variable goes 0 -> 1
const revealStyle = (i, n, soft = 6) => ({
  opacity: `clamp(0, calc((var(--p) * ${n + soft} - ${i}) / ${soft}), 1)`,
});

const RevealChars = ({ text }) => {
  const chars = [...text];
  return chars.map((c, i) => (
    <span key={i} style={revealStyle(i, chars.length, 8)}>
      {c}
    </span>
  ));
};

const RevealWords = ({ text }) => {
  const words = text.split(" ");
  return words.map((w, i) => (
    <span key={i} style={revealStyle(i, words.length, 5)}>
      {w}{" "}
    </span>
  ));
};

const ExpertiseAbout = () => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const panelsRef = useRef([]);
  const [dims, setDims] = useState(() => ({
    w: typeof window !== "undefined" ? window.innerWidth : 1440,
    h: typeof window !== "undefined" ? window.innerHeight : 900,
  }));

  const panelW = panelWidthFor(dims.w);
  const horizDist = (expertise.length - 1) * panelW;
  const sectionHeight =
    dims.h * (1 + HOLD_START_VH + ENTER_VH + REVEAL_VH + HOLD_END_VH) + horizDist;

  const update = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const { w: W, h: H } = dims;
    const P = panelWidthFor(W);

    const scrolled = -section.getBoundingClientRect().top;
    const enterStart = HOLD_START_VH * H;
    const enterLen = ENTER_VH * H;
    const revealLen = REVEAL_VH * H;

    const e = easeOut(clamp01((scrolled - enterStart) / enterLen));
    const firstReveal = clamp01(
      (scrolled - enterStart - enterLen * 0.2) / (enterLen * 0.8 + revealLen)
    );
    const shift = Math.max(
      0,
      Math.min(horizDist, scrolled - enterStart - enterLen - revealLen)
    );

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${-shift}px,0,0)`;
    }

    panelsRef.current.forEach((panel, i) => {
      if (!panel) return;
      let p, img;
      if (i === 0) {
        // First panel glides in from the bottom-right corner; its title, copy
        // and image begin revealing halfway in and finish just after it lands
        panel.style.transform = `translate3d(${P * (1 - e)}px, ${H * (1 - e)}px, 0)`;
        p = clamp01(firstReveal / 0.75);
        img = easeOut(clamp01((firstReveal - 0.2) / 0.8));
      } else {
        const screenLeft = W - P + i * P - shift;
        const reveal = clamp01((W - screenLeft) / P);
        p = clamp01((reveal - 0.15) / 0.7);
        img = easeOut(clamp01((reveal - 0.35) / 0.6));
      }
      panel.style.setProperty("--p", p.toFixed(3));
      panel.style.setProperty("--img", img.toFixed(3));
    });
  }, [dims, horizDist]);

  useEffect(() => {
    let raf;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const onResize = () =>
      setDims({ w: window.innerWidth, h: window.innerHeight });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    update();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [update]);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="relative z-40 bg-white font-montserrat"
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Intro stays fixed; panels slide over it */}
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center px-6 text-center bg-white text-black">
          <span className="mb-6 text-xs sm:text-sm tracking-[0.3em] uppercase text-black/70">
            [&nbsp; Our Expertise &nbsp;]
          </span>
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]">
            {introLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
        </div>

        <div ref={trackRef} className="absolute inset-0 z-10 will-change-transform">
          {expertise.map((item, i) => {
            const dark = i % 2 === 0;
            return (
              <article
                key={item.id}
                ref={(el) => {
                  panelsRef.current[i] = el;
                }}
                className={`absolute top-0 h-full flex flex-col justify-between px-8 sm:px-12 lg:px-16 py-12 lg:py-16 will-change-transform ${
                  dark ? "bg-[#01263D] text-white" : "bg-white text-black shadow-[-16px_0_40px_rgba(0,0,0,0.08)]"
                }`}
                style={{
                  left: dims.w - panelW + i * panelW,
                  width: panelW,
                  "--p": 0,
                  "--img": 0,
                  transform: i === 0 ? `translate3d(${panelW}px, ${dims.h}px, 0)` : undefined,
                }}
              >
                <header className="flex items-start gap-6">
                  <span
                    className={`mt-3 shrink-0 text-xs tracking-[0.25em] ${
                      dark ? "text-white/70" : "text-black/60"
                    }`}
                  >
                    [ {String(i + 1).padStart(2, "0")} ]
                  </span>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight leading-[1.15]">
                    <RevealChars text={item.title} />
                  </h3>
                </header>

                <div className="flex-1 flex items-center justify-center py-8 min-h-0">
                  <div
                    className="relative w-full max-w-xl h-full max-h-[44vh] overflow-hidden"
                    style={{
                      clipPath: "inset(calc((1 - var(--img)) * 50%))",
                      WebkitClipPath: "inset(calc((1 - var(--img)) * 50%))",
                    }}
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                      draggable="false"
                      className="w-full h-full object-cover select-none"
                      style={{ transform: "scale(calc(1.2 - var(--img) * 0.2))" }}
                    />
                  </div>
                </div>

                <p
                  className={`max-w-xl text-sm sm:text-base lg:text-lg leading-relaxed ${
                    dark ? "text-white/90" : "text-black/80"
                  }`}
                >
                  <RevealWords text={item.description} />
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExpertiseAbout;
