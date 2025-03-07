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
    <article className="w-full pt-10 font-montserrat flex flex-col items-center overflow-hidden">
      {/* About Section */}
      <section className="text-center py-16 px-4">
        <h1 className="font-semibold text-xl sm:text-2xl">About Dallol</h1>
        <p className="text-lg sm:text-2xl mt-2 w-full sm:w-3/4 lg:w-1/2 mx-auto leading-relaxed">
          We believe{" "}
          <span className="text-primary font-bold">Great Design</span> begins
          with <span className="text-primary font-bold">Understanding.</span>
          Our mission is to create spaces that align with our clients'{" "}
          <span className="text-primary font-bold">Visions</span>
          and meet the needs of the{" "}
          <span className="text-primary font-bold">Local Community.</span>
        </p>
      </section>

      {/* Projects Section */}
      <section className="w-full max-w-7xl mt-10 relative px-4">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl sm:text-5xl font-bold relative after:content-[''] after:absolute after:h-[3px] after:w-[80%] pb-5 after:bg-primary after:left-[20%] after:top-full after:-translate-y-2">
            Projects
          </h1>
          <button className="bg-primary px-5 py-1 text-white rounded-full">
            View All
          </button>
        </div>

        {/* Image Slider */}
        <div className="relative w-full overflow-hidden mt-5">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                className="w-full lg:w-[45%] flex flex-col items-start px-2 shrink-0"
              >
                <img
                  src={image.img}
                  alt={image.title}
                  className="w-full rounded-lg"
                />
                <div className="text-start mt-2">
                  <h1 className="font-light text-primary">{image.title}</h1>
                  <p>{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="bottom-0 flex lg:items-center justify-start lg:justify-center pt-5 space-x-4">
          <button
            onClick={handlePrev}
            className="border border-primary text-primary px-4 py-3 rounded-full 
            transition-colors duration-300 
            hover:bg-primary hover:text-white hover:border-transparent"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="border border-primary text-primary px-4 py-3 rounded-full 
            transition-colors duration-300 
            hover:bg-primary hover:text-white hover:border-transparent"
          >
            →
          </button>
        </div>
      </section>
    </article>
  );
};

export default About;
