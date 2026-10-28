import React from "react";
import img from "../../assets/img/weareabout.png";

const WeAre = () => {
  return (
    <section className="w-full bg-white py-6 sm:py-8 lg:py-10 font-montserrat">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
          {/* Centered Image Section - Sharp corners, no border radius */}
          <div className="w-full lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-[460px] lg:max-w-[480px]">
              <img
                src={img}
                alt="We are Dallol"
                className="w-full aspect-square object-cover rounded-none shadow-none block"
              />
            </div>
          </div>

          {/* Text Section - Roomy whitespace, clean simplicity, small font size without backgrounds */}
          <div className="w-full lg:col-span-6 flex flex-col justify-center">
            <div className="max-w-xl space-y-6 sm:space-y-7 text-neutral-600 text-sm sm:text-[14.5px] leading-relaxed sm:leading-[1.8] font-normal">
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

