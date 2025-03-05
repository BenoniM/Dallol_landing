import React from "react";
import img from "../../assets/img/weareabout.png";

const WeAre = () => {
  return (
    <article className="flex flex-col lg:flex-row justify-between items-center  lg:items-start  w-full">
      {/* Image Section */}
      <section className="w-full lg:w-[45%] mb-8 lg:mb-0">
        <img
          src={img}
          alt="We are Dallol"
          className="w-full h-auto object-cover"
        />
      </section>

      {/* Text Section */}
      <section className="w-full lg:w-1/2 lg:pr-20 text-start lg:text-left">
        <h1 className="text-3xl lg:text-5xl font-bold relative after:content-[''] after:absolute after:h-[3px] after:w-[30%] pb-5 after:bg-primary after:left-[4%] after:top-full after:-translate-y-2">
          We are Dallol
        </h1>
        <p className="mt-6 lg:mt-10 text-lg text-justify leading-relaxed">
          At Dallol Design Build, we believe that great design starts with
          understanding. Our mission is to craft spaces that resonate with our
          clients’ visions while being grounded in the needs of the local
          community. With a team of skilled architects, engineers, and project
          managers, we are dedicated to delivering not just buildings, but
          enduring relationships built on trust, quality, and collaboration.
        </p>

        <div className="text-white bg-primary p-2 border rounded-lg mt-8 lg:mt-10 space-y-8">
          <h1 className="font-semibold text-2xl leading-4 lg:hidden pt-5 ">
            <h1 className="flex flex-col space-y-0">
              DESIGN <h1 className="pb-2">__</h1>
            </h1>
            <h1 className="flex flex-col pt-2">
              BUILD <h1 className="pb-2">__</h1>
            </h1>
            <h1 className="flex flex-col pt-2">INNOVATE</h1>
          </h1>
          <h1 className="font-semibold text-xl lg:text-2xl leading-loose lg:flex hidden ">
            DESIGN | BUILD | INNOVATE
          </h1>
          <p className="lg:leading-7 text-sm lg:text-base pb-5">
            “From architectural design and construction to asset valuation and
            property management, we offer a full suite of services designed to
            bring every project to life with precision and care. We pride
            ourselves on being approachable, flexible, and client-focused,
            ensuring that each project is a tailored journey where our clients’
            goals are at the heart of every decision.”
          </p>
        </div>
      </section>
    </article>
  );
};

export default WeAre;
