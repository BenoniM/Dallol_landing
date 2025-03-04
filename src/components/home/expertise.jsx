import React, { useState } from "react";
import img1 from "../../assets/img/project1.png";

const images = [
  {
    id: 1,
    // img: img1,
    title: "Architectural and Engineering Design",
    description:
      "We believe that architecture should be a reflection of the communities it serves. Our architectural and engineering design expertise is rooted in a deep understanding of both aesthetics and functionality.",
  },
  {
    id: 2,
    // img: img1,
    title: "Design and Build",
    description:
      "Our design and build approach allows us to streamline the construction process, providing a seamless transition from concept to completion. We take ownership of every project phase, ensuring that our design vision is faithfully executed.",
  },
  {
    id: 3,
    img: img1,
    title: "Project",
    description:
      "Successful project management is vital to navigating the complexities of architectural and construction projects. Our dedicated project management team employs structured methodologies to oversee all aspects of the project, from inception to completion.",
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

const Expertise = () => {
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
      <section className="w-full max-w-7xl mt-10 relative">
        <div className="flex justify-between items-center">
          <div className="w-[70%]">
            <h1 className="text-5xl font-bold relative after:content-[''] after:absolute after:h-[3px] after:w-[20%] pb-5 after:bg-primary after:left-[6%] after:top-full after:-translate-y-2">
              Expertise
            </h1>
            <p className="pl-5 pt-4">
              We believe that architecture should be a reflection of the
              communities it serves. Our architectural and engineering design
              expertise is rooted in a deep understanding of both aesthetics and
              functionality.
            </p>
          </div>

          <button className="bg-primary px-5 py-1 text-white rounded-full">
            View All
          </button>
        </div>

        {/* Image Slider */}
        <div className="relative w-full overflow-auto scrollbar-hide mt-5">
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
                <div className="text-start border rounded-lg p-5 w-[95%] h-48 flex flex-col justify-between">
                  <h1 className="font-semibold text-3xl mb-1">{image.title}</h1>
                  <p className="overflow-hidden overflow-ellipsis line-clamp-3">
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="bottom-0 items-center justify-center pt-5 transform flex space-x-4">
          <button
            onClick={handlePrev}
            className="border border-primary text-primary px-4 py-3 rounded-full"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="border border-primary text-primary px-4 py-3 rounded-full"
          >
            →
          </button>
        </div>
      </section>
    </article>
  );
};

export default Expertise;
