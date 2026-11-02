import React, { useEffect, useRef } from "react";
import img from "../../assets/img/weareabout.png";

// max vertical travel of the image inside its frame, as a % of image height
const PARALLAX_RANGE = 8;

const WeAre = () => {
  const frameRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const frame = frameRef.current;
    const image = imgRef.current;
    if (!frame || !image) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = frame.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 when the frame enters at the bottom, 1 when it leaves at the top
      const progress = (vh - rect.top) / (vh + rect.height) * 2 - 1;
      const p = Math.max(-1, Math.min(1, progress));
      image.style.transform = `translate3d(0, ${p * PARALLAX_RANGE}%, 0) scale(1.2)`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="w-full bg-white py-6 sm:py-8 lg:py-10 font-montserrat">
      <div className="w-full px-3 sm:px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* Image Section - aligned to the navbar's left edge */}
          <div className="w-full lg:col-span-6 flex items-center justify-center lg:justify-start">
            <div
              ref={frameRef}
              className="w-full max-w-[460px] lg:max-w-[480px] aspect-square overflow-hidden"
            >
              <img
                ref={imgRef}
                src={img}
                alt="We are Dallol"
                className="w-full h-full object-cover rounded-none shadow-none block scale-[1.2] will-change-transform"
              />
            </div>
          </div>

          {/* Text Section - Roomy whitespace, clean simplicity, small font size without backgrounds */}
          <div className="w-full lg:col-span-6 flex flex-col justify-center lg:items-end">
            <div className="w-full max-w-xl space-y-6 sm:space-y-7 text-neutral-600 text-sm sm:text-[14.5px] leading-relaxed sm:leading-[1.8] font-normal">
              <h2 className="text-2xl sm:text-3xl font-light text-neutral-900 tracking-tight">
                We are Dallol
              </h2>

              <p>
                At Dallol Design Build, we believe that great design starts with
                understanding. Our mission is to craft spaces that resonate with
                our clients’ visions while being grounded in the needs of the
                local community. With a team of skilled architects, engineers,
                and project managers, we are dedicated to delivering not just
                buildings, but enduring relationships built on trust, quality,
                and collaboration.
              </p>

              <div className="space-y-3 pt-1">
                <h3 className="text-xs sm:text-[13px] font-semibold tracking-[0.2em] text-neutral-900 uppercase">
                  DESIGN &nbsp;|&nbsp; BUILD &nbsp;|&nbsp; INNOVATE
                </h3>
                <p>
                  “From architectural design and construction to asset valuation
                  and property management, we offer a full suite of services
                  designed to bring every project to life with precision and
                  care. We pride ourselves on being approachable, flexible, and
                  client-focused, ensuring that each project is a tailored
                  journey where our clients’ goals are at the heart of every
                  decision.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeAre;

