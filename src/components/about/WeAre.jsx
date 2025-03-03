import React from "react";
import img from "../../assets/img/weareabout.png";

const WeAre = () => {
  return (
    <article className="flex flex-col md:flex-row justify-between items-start p-10  w-full">
      <section className="w-[40%] ">
        <img src={img} alt="" className="w-full" />
      </section>

      <section className="w-1/2 ">
        <h1 className="text-5xl font-bold">We are Dallol</h1>
        <p className="mt-10">
          At Dallol Design Build, we believe that great design starts with
          understanding. Our mission is to craft spaces that resonate with our
          clients’ visions while being grounded in the needs of the local
          community. With a team of skilled architects, engineers, and project
          managers, we are dedicated to delivering not just buildings, but
          enduring relationships built on trust, quality, and collaboration.
        </p>

        <div className="text-white bg-primary p-5 border rounded-lg mt-10">
          <h1 className="font-semibold text-2xl leading-loose">
            DESIGN | BUILD | INNOVATE
          </h1>
          <p className="leading-loose">
            “From architectural design and construction to asset valuation and
            property management, we offer a full suite of services designed to
            bring every project to life with precision and care. Wepride
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
