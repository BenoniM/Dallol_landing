import React from "react";

const About = () => {
  return (
    <article className="w-full pt-10 font-montserrat  flex flex-col">
      <section className="text-center justify-center font-montserrat ">
        <h1 className="font-semibold">About Dallol</h1>
        <p className="text-xl text-center mt-2 w-1/2 mx-auto">
          We believe <span className="text-primary">Great Design</span> begins
          with <span className="text-primary">Understanding</span>
          Our mission is to create spaces that align with our clients'{" "}
          <span className="text-primary">Visions</span>
          and meet the needs of the{" "}
          <span className="text-primary">Local Community.</span>
        </p>
      </section>

      <section>
        <div className="flex flex-row  justify-between">
          <h1>Projects</h1>
          <button className=" bg-primary px-5 py-1 text-white rounded-full">
            View All
          </button>
        </div>
      </section>
    </article>
  );
};

export default About;
