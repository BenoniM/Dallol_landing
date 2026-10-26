import React, { useEffect, useRef, useCallback } from "react";
import imgLiving from "../../assets/img/livingroom.png";
import imgHenok from "../../assets/img/featurehenok.png";
import imgBelay from "../../assets/img/Belay.png";
import imgTranzit from "../../assets/img/Tranzit.png";
import imgYesh from "../../assets/img/yesh.png";
import imgSchool from "../../assets/img/schoolnew.png";
import imgGetachew from "../../assets/img/Getachew.png";

const projects = [
  {
    id: 1,
    title: "Dereje A. Residence",
    category: "Residential Architecture",
    description:
      "Curated luxury residences crafted with bespoke modernist aesthetics and panoramic city vistas.",
    img: imgLiving,
  },
  {
    id: 2,
    title: "Henok T. Residence",
    category: "Signature Villa",
    description:
      "Multi-level contemporary sanctuary featuring floating terraces, cantilevered volumes, and refined textures.",
    img: imgHenok,
  },
  {
    id: 3,
    title: "Belay G. Hotel & Convention Center",
    category: "Hospitality & Landmark",
    description:
      "Grand architectural monument blending world-class convention spaces with serene luxury hospitality.",
    img: imgBelay,
  },
  {
    id: 4,
    title: "Tranzit Hotel",
    category: "Modern Hospitality",
    description:
      "Sleek geometric facade housing premier international accommodations and rooftop social spheres.",
    img: imgTranzit,
  },
  {
    id: 5,
    title: "Yeshowa Birhan Hotel & Mall",
    category: "Commercial & Mixed-Use",
    description:
      "A monumental civic landmark uniting high-end retail, fine dining, and grand hospitality.",
    img: imgYesh,
  },
  {
    id: 6,
    title: "School of Tomorrow",
    category: "Institutional Architecture",
    description:
      "Dynamic academic environment designed to foster creativity, collaboration, and community growth.",
    img: imgSchool,
  },
  {
    id: 7,
    title: "Getachew K. Residence",
    category: "Bespoke Residence",
    description:
      "Timeless neoclassical harmony harmonized with modern structural engineering and private gardens.",
    img: imgGetachew,
  },
];

const DESCRIPTION =
  "Explore our portfolio of visionary architecture and precision engineering. From bespoke luxury residences to landmark hospitality and civic developments, each project embodies Dallol Consult's commitment to timeless design, structural excellence, and contextual harmony.";
const DESCRIPTION_WORDS = DESCRIPTION.split(" ");

// Each card is sliced into vertical strips laid along a curved path, so the
// image itself bends around the curve (like the reference site).
const STRIPS = 18;
// How far (in cards) the first project starts to the right before scrolling.
const START_OFFSET = 1.6;
// The carousel starts turning while the section is still this far
// (fraction of viewport height) below the top, i.e. before it is pinned.
const LEAD = 0.75;

// Scroll budget (in viewport heights) for each phase of the section.
const CAROUSEL_VH = 3; // curved carousel through all projects
const EXPAND_VH = 1; // last card grows into the top half of the screen
const DETAIL_VH = 0.6; // circle + captions reveal
const FLIP_VH = 0.8; // per project while flipping back through them
const HOLD_VH = 0.5; // rest on the first project before leaving
// Height of the expanded image as a fraction of the viewport.
const FRAME_H = 0.5;
// Circumference of the progress ring (r = 49 in a 100x100 viewBox).
const RING_LEN = 2 * Math.PI * 49;

// After expanding, projects are shown last -> first.
const SEQUENCE = [...projects].reverse();
const SECTION_VH =
  1 +
  CAROUSEL_VH +
  EXPAND_VH +
  DETAIL_VH +
  FLIP_VH * (SEQUENCE.length - 1) +
  HOLD_VH;

const clamp01 = (v) => Math.max(0, Math.min(1, v));
const lerp = (a, b, t) => a + (b - a) * t;
const easeInOut = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOut = (t) => 1 - Math.pow(1 - t, 3);

// Vertical text ticker: item i sits (i - pos + enter) lines below the mask.
const setTicker = (items, pos, enter = 0) => {
  items.forEach((el, i) => {
    if (!el) return;
    const d = i - pos + enter;
    el.style.transform = `translate3d(0, ${(d * 100).toFixed(2)}%, 0)`;
    el.style.opacity = Math.max(0, 1 - Math.abs(d)).toFixed(3);
  });
};

const ProjectsSection = () => {
  const containerRef = useRef(null);
  const columnRef = useRef(null);
  const titleWrapRef = useRef(null);
  const descRef = useRef(null);
  const wordsRef = useRef([]);
  const cardsRef = useRef([]);
  const stickyRef = useRef(null);
  const backdropRef = useRef(null);
  const frameRef = useRef(null);
  const layersRef = useRef([]);
  const detailRef = useRef(null);
  const circleRef = useRef(null);
  const arcRef = useRef(null);
  const numbersRef = useRef([]);
  const categoriesRef = useRef([]);
  const titlesRef = useRef([]);
  const geometryRef = useRef({
    ready: false,
    spacing: 1000,
    stripW: 50,
    c: 0.0003,
    sMax: 2500,
    startTy: 0,
    endTy: 0,
    lines: [],
  });

  // Measure card size, curve and intro shift; lay out strip contents.
  const layout = useCallback(() => {
    const windowWidth = window.innerWidth;
    const firstCard = cardsRef.current[0];
    if (!firstCard) return;

    const cardW = firstCard.offsetWidth;
    // Styles not applied yet (e.g. CSS still loading) - wait for the observer.
    if (!cardW) return;
    const isMobile = windowWidth < 640;
    const gap = cardW * (isMobile ? 0.1 : 0.2);
    const stripW = cardW / STRIPS;

    // Curved path: z = -c * s^2 (s = distance along the row). With the
    // perspective below, cards stay front-facing until s = sqrt(p / c), which
    // projects well past the screen edge, so they curve off-screen.
    const p = windowWidth;
    const sMax = windowWidth * 1.3;
    const c = p / (sMax * sMax);
    if (columnRef.current) {
      columnRef.current.querySelector("[data-stage]").style.perspective = `${p}px`;
    }

    const cardH = firstCard.offsetHeight || 360;
    const OVERBLEED = 1.06;
    const imgW = cardW * OVERBLEED;
    const imgH = cardH * OVERBLEED;
    const bleedX = (imgW - cardW) / 2;
    const bleedY = (imgH - cardH) / 2;

    cardsRef.current.forEach((card) => {
      if (!card) return;
      card.querySelectorAll("[data-strip]").forEach((strip, j) => {
        // 3px overlap + overbleed ensures zero edge gaps and fills box seamlessly
        strip.style.width = `${Math.ceil(stripW) + 3}px`;
        strip.style.marginLeft = `${-(Math.ceil(stripW) + 3) / 2}px`;
        const img = strip.firstElementChild;
        img.style.width = `${imgW}px`;
        img.style.height = `${imgH}px`;
        img.style.top = `${-bleedY}px`;
        img.style.left = `${-j * stripW - bleedX}px`;
      });
    });

    // Description sits above the title; the whole column starts pushed down
    // so the description is visible, then scrolls up until it has fully left.
    let startTy = 0;
    let endTy = 0;
    let descTop = 0;
    if (titleWrapRef.current && descRef.current) {
      descTop = titleWrapRef.current.offsetTop + descRef.current.offsetTop;
      const descBottom = descTop + descRef.current.offsetHeight;
      const targetTop = isMobile ? 72 : windowWidth < 1024 ? 88 : 104;
      startTy = Math.max(0, targetTop - descTop);
      endTy = -Math.max(0, descBottom + 16);
    }

    // Group description words into their rendered lines (credit-roll rows)
    const lines = [];
    let lastTop = null;
    wordsRef.current.forEach((word) => {
      if (!word) return;
      word.style.transform = "";
      const top = word.offsetTop;
      if (lastTop === null || Math.abs(top - lastTop) > 2) {
        lines.push({ top, words: [] });
        lastTop = top;
      }
      lines[lines.length - 1].words.push(word);
    });

    geometryRef.current = {
      ready: true,
      spacing: cardW + gap,
      stripW,
      c,
      sMax,
      startTy,
      endTy,
      lines,
    };
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current || !geometryRef.current.ready) return;

    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const totalScrollable = rect.height - vh;
    if (totalScrollable <= 0) return;
    const carouselDist = CAROUSEL_VH * vh;

    const { spacing, stripW, c, sMax, startTy, endTy, lines } =
      geometryRef.current;
    const scrolled = -rect.top;

    // Intro: description + title + carousel rise together 1:1 with scroll
    const introDist = startTy - endTy;
    const introScrolled = Math.max(0, Math.min(introDist, scrolled));
    const introTy = startTy - introScrolled;
    if (columnRef.current) {
      columnRef.current.style.transform = `translate3d(0, ${introTy.toFixed(1)}px, 0)`;
    }

    // Description lifts dynamically together without gaps opening between lines
    const lift = introScrolled * 0.65;
    lines.forEach((line) => {
      line.words.forEach((word) => {
        word.style.transform = `translate3d(0, ${(-lift).toFixed(1)}px, 0)`;
      });
    });

    // Rotation starts before the section pins (cards still lower on screen)
    // and runs to the end, so the first card curves in while the text rises.
    const lead = vh * LEAD;
    const progress = Math.max(
      0,
      Math.min(1, (scrolled + lead) / (carouselDist + lead))
    );
    const totalCards = projects.length;

    // Post-carousel phases
    const expandStart = carouselDist;
    const expandT = clamp01((scrolled - expandStart) / (EXPAND_VH * vh));
    const detailT = clamp01(
      (scrolled - expandStart - EXPAND_VH * vh) / (DETAIL_VH * vh)
    );
    const flipStart = expandStart + (EXPAND_VH + DETAIL_VH) * vh;
    const flipPos = Math.max(
      0,
      Math.min(SEQUENCE.length - 1, (scrolled - flipStart) / (FLIP_VH * vh))
    );
    const expanded = expandT > 0;
    const currentPosition =
      progress * (totalCards - 1 + START_OFFSET) - START_OFFSET;

    cardsRef.current.forEach((card, idx) => {
      if (!card) return;

      const delta = idx - currentPosition;
      const cardS = delta * spacing;
      const absDelta = Math.abs(delta);
      const cardVisible = Math.abs(cardS) < sMax + spacing;
      card.style.visibility = cardVisible ? "visible" : "hidden";
      card.style.pointerEvents =
        absDelta < 0.5 && !expanded ? "auto" : "none";
      // The last card is replaced by the flat expanding frame
      card.style.opacity = idx === totalCards - 1 && expanded ? "0" : "1";
      if (!cardVisible) return;

      // Every strip sits on the shared curve and faces along it; the outer
      // edges recede, and scaleX keeps strips joined where the curve is steep.
      card.querySelectorAll("[data-strip]").forEach((strip, j) => {
        const s = cardS + (j + 0.5 - STRIPS / 2) * stripW;
        if (Math.abs(s) > sMax * 0.97) {
          strip.style.visibility = "hidden";
          return;
        }
        const slope = 2 * c * s;
        const z = -c * s * s;
        strip.style.visibility = "visible";
        strip.style.transform = `translate3d(${s.toFixed(1)}px, 0, ${z.toFixed(
          1
        )}px) rotateY(${Math.atan(slope).toFixed(4)}rad) scaleX(${Math.sqrt(
          1 + slope * slope
        ).toFixed(4)})`;
      });
    });

    // Expand: black backdrop fades in while the last card grows from its
    // carousel slot into the top half of the screen.
    if (backdropRef.current) {
      backdropRef.current.style.opacity = clamp01(expandT * 2).toFixed(3);
    }
    const frame = frameRef.current;
    const lastCard = cardsRef.current[totalCards - 1];
    if (frame && lastCard && stickyRef.current) {
      // display (not visibility) so the layers' own visibility can't leak out
      frame.style.display = expanded ? "block" : "none";
      if (expanded) {
        const stage = stickyRef.current.getBoundingClientRect();
        const from = lastCard.getBoundingClientRect();
        const e = easeInOut(expandT);
        frame.style.left = `${lerp(from.left - stage.left, 0, e).toFixed(1)}px`;
        frame.style.top = `${lerp(from.top - stage.top, 0, e).toFixed(1)}px`;
        frame.style.width = `${lerp(from.width, stage.width, e).toFixed(1)}px`;
        frame.style.height = `${lerp(
          from.height,
          stage.height * FRAME_H,
          e
        ).toFixed(1)}px`;
      }
    }

    // Flip back through projects: images stay still; the next one is wiped
    // in from the bottom edge over the current one
    const step = Math.floor(flipPos);
    const stepPos = step + easeInOut(flipPos - step);
    layersRef.current.forEach((layer, k) => {
      if (!layer) return;
      const d = k - stepPos;
      layer.style.visibility = d > -1 && d < 1 ? "visible" : "hidden";
      layer.style.clipPath = `inset(${(Math.max(0, d) * 100).toFixed(
        2
      )}% 0 0 0)`;
    });

    // Circle + captions reveal, then tick along with the images
    const reveal = easeOut(detailT);
    if (detailRef.current) {
      detailRef.current.style.visibility = detailT > 0 ? "visible" : "hidden";
    }
    if (circleRef.current) {
      circleRef.current.style.opacity = reveal.toFixed(3);
      circleRef.current.style.transform = `scale(${(0.6 + 0.4 * reveal).toFixed(
        4
      )})`;
    }
    // Ring fills from the top: 1/n on the first project, full on the last
    if (arcRef.current) {
      const fill = (reveal + stepPos) / SEQUENCE.length;
      arcRef.current.style.strokeDashoffset = (RING_LEN * (1 - fill)).toFixed(
        2
      );
    }
    setTicker(numbersRef.current, stepPos, 1 - reveal);
    setTicker(categoriesRef.current, stepPos, 1 - reveal);
    setTicker(titlesRef.current, stepPos, 1 - reveal);
  }, []);

  useEffect(() => {
    let animationFrameId;
    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };
    const onResize = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        layout();
        handleScroll();
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    window.addEventListener("load", onResize);
    document.fonts?.ready.then(onResize);

    // Re-measure whenever card/description sizes change (CSS or fonts
    // arriving after mount, breakpoint changes, etc.)
    const resizeObserver = new ResizeObserver(onResize);
    [cardsRef.current[0], descRef.current, columnRef.current].forEach(
      (el) => el && resizeObserver.observe(el)
    );
    onResize();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener("load", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [handleScroll, layout]);

  return (
    <section
      id="projects-section"
      ref={containerRef}
      className="relative w-full bg-white text-neutral-900"
      style={{ height: `${SECTION_VH * 100}vh` }}
    >
      {/* Sticky Viewport Stage */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen w-full overflow-hidden text-neutral-900"
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://images.pexels.com/photos/2034378/pexels-photo-2034378.jpeg"
            alt="Architecture background"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/[0.08]" />
        </div>

        {/* Scroll-driven column: starts pushed down, rises during the intro */}
        <div
          ref={columnRef}
          className="absolute inset-0 flex flex-col justify-start pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-24 lg:pb-28 will-change-transform z-10"
        >
          {/* Projects Title (description is anchored above it) */}
          <div
            ref={titleWrapRef}
            className="relative z-30 w-full flex flex-col items-center justify-center text-center -mb-5 sm:-mb-7 md:-mb-9 lg:-mb-11 pointer-events-auto"
          >
            {/* Top Description Text: rolls up like credits during the intro */}
            <div
              ref={descRef}
              className="absolute bottom-full left-0 w-full flex flex-col items-center px-6 mb-12 sm:mb-16 md:mb-20 lg:mb-24"
            >
              <p className="relative font-montserrat text-xs sm:text-sm md:text-base text-neutral-600 max-w-2xl mx-auto text-center leading-relaxed font-normal select-text">
                {DESCRIPTION_WORDS.map((word, i) => (
                  <React.Fragment key={i}>
                    <span
                      ref={(el) => {
                        wordsRef.current[i] = el;
                      }}
                      className="inline-block will-change-transform"
                    >
                      {word}
                    </span>
                    {i < DESCRIPTION_WORDS.length - 1 ? " " : null}
                  </React.Fragment>
                ))}
              </p>
            </div>

            <h2 className="font-montserrat font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-widest text-neutral-900 uppercase select-text drop-shadow-sm -translate-y-6 sm:-translate-y-4 md:-translate-y-2 lg:translate-y-0 xl:translate-y-[4px]">
              Projects
            </h2>
          </div>

          {/* 3D Curved Stage */}
          <div className="relative z-10 w-full flex-1 flex items-center justify-center">
            <div
              data-stage
              className="relative w-full h-full flex items-center justify-center"
              style={{
                perspective: "1920px",
                transformStyle: "preserve-3d",
              }}
            >
              {projects.map((project) => (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardsRef.current[project.id - 1] = el;
                  }}
                  className="absolute top-[75%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[84vw] sm:w-[500px] md:w-[570px] lg:w-[630px] xl:w-[680px] h-[50vw] sm:h-[260px] md:h-[300px] lg:h-[330px] xl:h-[360px] group cursor-pointer"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {Array.from({ length: STRIPS }).map((_, j) => (
                    <div
                      key={j}
                      data-strip
                      className="absolute top-0 left-1/2 h-full overflow-hidden will-change-transform"
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      <img
                        src={project.img}
                        alt={j === 0 ? project.title : ""}
                        className="absolute max-w-none object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="eager"
                        draggable="false"
                      />

                      {/* Subtle soft gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5 pointer-events-none group-hover:opacity-40 transition-opacity duration-300" />
                    </div>
                  ))}

                  {/*
                    NOTE: Information below each project is hidden for future use as requested:
                    "hide the informations below each project for now amma use them in the fututere but completely ermove the left right buttons though"
                  */}
                  <div className="hidden">
                    <span className="text-primary text-xs uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-white text-xl font-medium">
                      {project.title}
                    </h3>
                    <p className="text-neutral-400 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* White backdrop for the expanded / detail view */}
        <div
          ref={backdropRef}
          className="absolute inset-0 z-40 bg-white pointer-events-none"
          style={{ opacity: 0 }}
        />

        {/* Expanding frame: starts on the last card, grows to the top half */}
        <div
          ref={frameRef}
          className="absolute z-50 overflow-hidden pointer-events-none"
          style={{ display: "none" }}
        >
          {SEQUENCE.map((project, k) => (
            <div
              key={project.id}
              ref={(el) => {
                layersRef.current[k] = el;
              }}
              className="absolute inset-0 overflow-hidden"
              style={{
                clipPath: k === 0 ? "none" : "inset(100% 0 0 0)",
                visibility: k === 0 ? "visible" : "hidden",
              }}
            >
              <img
                src={project.img}
                alt={project.title}
                className="w-full h-full object-cover select-none"
                draggable="false"
              />
            </div>
          ))}
        </div>

        {/* Filling circle with number, category below it, title at bottom */}
        <div
          ref={detailRef}
          className="absolute inset-0 z-50 pointer-events-none text-neutral-900"
          style={{ visibility: "hidden" }}
        >
          <div
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
            style={{ top: `${FRAME_H * 100}%` }}
          >
            <div
              ref={circleRef}
              className="relative w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 -mt-12 sm:-mt-16 lg:-mt-[72px] rounded-full"
            >
              {/* Rotated so the fill starts at 12 o'clock */}
              <svg
                viewBox="0 0 100 100"
                className="absolute inset-0 w-full h-full -rotate-90"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="49"
                  fill="none"
                  stroke="rgba(23,23,23,0.15)"
                  strokeWidth="0.8"
                />
                <circle
                  ref={arcRef}
                  cx="50"
                  cy="50"
                  r="49"
                  fill="none"
                  stroke="#171717"
                  strokeWidth="1.2"
                  strokeDasharray={RING_LEN}
                  strokeDashoffset={RING_LEN}
                />
              </svg>
              <div className="absolute left-1/2 top-[63%] -translate-x-1/2 -translate-y-1/2 h-5 w-10 overflow-hidden">
                {SEQUENCE.map((project, k) => (
                  <span
                    key={project.id}
                    ref={(el) => {
                      numbersRef.current[k] = el;
                    }}
                    className="absolute inset-0 flex items-center justify-center font-montserrat text-xs sm:text-sm tracking-widest"
                  >
                    {String(k + 1).padStart(2, "0")}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mt-1 h-6 sm:h-7 w-[90vw] overflow-hidden">
              {SEQUENCE.map((project, k) => (
                <span
                  key={project.id}
                  ref={(el) => {
                    categoriesRef.current[k] = el;
                  }}
                  className="absolute inset-0 flex items-center justify-center font-montserrat uppercase text-sm sm:text-base tracking-widest whitespace-nowrap"
                >
                  {project.category}
                </span>
              ))}
            </div>
          </div>

          <div
            className="absolute left-0 right-0 bottom-[6vh] overflow-hidden"
            style={{ height: "calc(clamp(1.4rem, 3vw, 3rem) * 2.8)" }}
          >
            {SEQUENCE.map((project, k) => (
              <h3
                key={project.id}
                ref={(el) => {
                  titlesRef.current[k] = el;
                }}
                className="absolute inset-0 flex items-center justify-center font-montserrat font-medium uppercase tracking-wide leading-tight text-center px-4"
                style={{ fontSize: "clamp(1.4rem, 3vw, 3rem)" }}
              >
                {project.title}
              </h3>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
