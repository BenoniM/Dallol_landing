import React, { useState } from "react";
import img1 from "../../assets/img/project1.png";

const images = [
  {
    id: 1,
    img: img1,
    title: "Residential",
    description: "Dereje A. Residence",
  },
  {
    id: 2,
    img: img1,
    title: "Residential",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    img: img1,
    title: "Hotel",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    img: img1,
    title: "Hotel",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 5,
    img: img1,
    title: "Hotel",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 2 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 2 : prevIndex - 1
    );
  };

  return (
    <article className="w-full pt-10 font-montserrat flex flex-col items-center">
      {/* About Section */}
      <section className="text-center">
        <h1 className="font-semibold">About Dallol</h1>
        <p className="text-xl mt-2 w-1/2 mx-auto">
          We believe <span className="text-primary">Great Design</span> begins
          with <span className="text-primary">Understanding.</span>
          Our mission is to create spaces that align with our clients'{" "}
          <span className="text-primary">Visions</span>
          and meet the needs of the{" "}
          <span className="text-primary">Local Community.</span>
        </p>
      </section>

      {/* Projects Section */}
      <section className="w-full max-w-7xl mt-10 relative">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold underline underline-offset-8 ">
            Projects
          </h1>
          <button className="bg-primary px-5 py-1 text-white rounded-full">
            View All
          </button>
        </div>

        {/* Image Slider */}
        <div className="relative w-full overflow-hidden  mt-5">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / 2.2)}%)`,
            }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="w-1/2 min-w-[45%] flex flex-col items-start"
              >
                <img src={image.img} alt={image.title} className="w-[95%]" />
                <div className="text-start">
                  <h1 className="font-light text-primary">{image.title}</h1>
                  <p>{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className=" bottom-0 items-center justify-center pt-5 transform flex space-x-4">
          <button
            onClick={handlePrev}
            className="border border-primary text-primary px-4 py-3 rounded-full"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="border border-primary  text-primary px-4 py-3  rounded-full"
          >
            →
          </button>
        </div>
      </section>
    </article>
  );
};

export default About;
