import React, { useEffect, useRef, useCallback } from "react";

const BG = "#01263D";

// Scroll length per project, in viewport heights.
const VH_PER_PROJECT = 1;

const clamp01 = (v) => Math.max(0, Math.min(1, v));

// Pinned section: scrolling down slides the projects horizontally. The active
// card sits centred at full brightness; neighbours drift out to the sides,
// shrink slightly and dim.
const ExploreProjects = ({ projects }) => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const infoRefs = useRef([]);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const totalScrollable = rect.height - window.innerHeight;
    if (totalScrollable <= 0) return;
    const t = clamp01(-rect.top / totalScrollable);
    const pos = t * (projects.length - 1);
    const spacing = vw * (vw < 768 ? 1 : 0.75);

    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const d = i - pos;
      const near = Math.min(Math.abs(d), 1);
      card.style.transform = `translate3d(${(d * spacing).toFixed(1)}px, 0, 0) scale(${(1 - near * 0.08).toFixed(3)})`;
      card.style.filter = `brightness(${(1 - near * 0.6).toFixed(3)})`;
      card.style.zIndex = String(100 - Math.round(Math.abs(d) * 10));

      const info = infoRefs.current[i];
      if (info) info.style.opacity = (1 - near).toFixed(3);
    });
  }, [projects.length]);

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
    <section
      ref={containerRef}
      data-nav-dark
      className="relative w-full text-white"
      style={{
        backgroundColor: BG,
        height: `${(projects.length * VH_PER_PROJECT + 1) * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Header */}
        <div className="absolute left-0 right-0 top-0 z-[200] flex items-end justify-between px-3 sm:px-6 md:px-8 lg:px-10 pt-6 lg:pt-8">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
            Explore some of our current projects
          </h2>
          <span className="hidden sm:block text-xs tracking-[0.2em] uppercase text-white/60">
            Scroll
          </span>
        </div>

        {/* Cards */}
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => (cardRefs.current[i] = el)}
            className="absolute left-1/2 top-[54%] w-[88vw] md:w-[55vw] -ml-[44vw] md:-ml-[27.5vw] -mt-[34vh] md:-mt-[40vh] will-change-transform"
          >
            <div className="h-[50vh] md:h-[62vh] overflow-hidden">
              <img
                src={project.img}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div
              ref={(el) => (infoRefs.current[i] = el)}
              className="mt-4 lg:mt-6 flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-10"
            >
              <h3 className="text-xl sm:text-2xl lg:text-4xl font-semibold leading-tight">
                {project.title}
              </h3>
              <p className="md:max-w-[50%] text-xs lg:text-sm leading-relaxed text-white/70">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreProjects;
