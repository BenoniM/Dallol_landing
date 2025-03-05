import blognew from "../../assets/img/bolgnew.png";
import bloghero from "../../assets/img/herohenok.png";
import function1 from "../../assets/img/lefthenok.png";
import function2 from "../../assets/img/righthenok.png";
import lidiyares from "../../assets/img/lidiyares.png";
import Nabbar2 from "../Nabbar2";
import { useState } from "react";

const images = [
  {
    id: 1,
    img: lidiyares,
    title: "Lidiya Residential",
    subtitle: "Project : B+3 Residence Building",
    description:
      "The design exemplifies a neoclassical architectural style with modern influences. The building's symmetrical facade, strong vertical lines, and grand central entrance emphasize classical proportions and balance.",
  },
  {
    id: 2,
    img: lidiyares,
    title: "Getachew K. Residence",
    description:
      "This residence Building features a modern, minimalist design that highlights clean lines and understated elegance. The architecture blends horizontal and vertical elements, giving the building a balanced, structured look.",
  },
  {
    id: 3,
    img: lidiyares,
    title: "Hotel",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    img: lidiyares,
    title: "Hotel",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 5,
    img: lidiyares,
    title: "Hotel",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];
const image = [function1, function2];

const BlogDetails = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const handleNextnew = () => {
    setCurrentSlide((prev) => (prev === image.length - 1 ? 0 : prev + 1));
  };

  const handlePrevnew = () => {
    setCurrentSlide((prev) => (prev === 0 ? image.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <article>
      <Nabbar2 />
      {/* Hero Section */}
      <div className="flex items-center justify-center">
        <div
          style={{ backgroundImage: `url(${bloghero})` }}
          className="h-[300px] md:h-[450px] bg-cover bg-center flex flex-col items-center justify-center rounded-3xl max-w-[98%] mx-auto"
        >
          <h1 className="text-4xl md:text-8xl font-bold text-white text-center">
            Tranzit Hotel
          </h1>
          <p className="text-white w-3/4 md:w-1/2 my-2 text-center text-sm md:text-base">
            The design shows a large, imposing hotel and business structure. The
            front has a large central entrance, arched windows, and a
            symmetrical layout, all of which are characteristics of classic
            architecture. A sense of elegance and grandeur is created by the
            building's exterior's use of warm, earthy tones.
          </p>
        </div>
      </div>

      {/* Features Section */}
      <section className="flex flex-col md:flex-row items-center p-5">
        <div className="flex flex-col lg:items-center items-start w-full md:w-1/2 h-auto md:h-[500px] gap-10 md:gap-20 pt-10 md:pt-20 lg:border lg:border-primary">
          <h1 className="text-4xl md:text-8xl font-bold relative after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:bg-primary after:left-1/2 after:top-full after:translate-y-2">
            Features
          </h1>
          <p className="w-full md:w-[66%] text-start lg:text-center md:text-left">
            The Hotel design, while modern and sleek, might not fully align with
            the expectations of a typical hotel. The minimalist aesthetic, while
            visually appealing, could potentially lack a warmer and more
            inviting atmosphere required in hospitality spaces.
          </p>
        </div>
        <img src={blognew} alt="" className="w-full md:w-1/2 mt-10 md:mt-0" />
      </section>

      {/* Function Section */}
      <section>
        <div className="flex flex-col md:flex-row items-center justify-between p-5">
          <h1 className="text-4xl md:text-8xl font-bold relative after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:bg-primary after:left-1/2 after:top-full after:translate-y-2">
            Function
          </h1>
          <p className="w-full md:w-[55%] mt-5 md:mt-0">
            The Hotel design, while modern and sleek, might not fully align with
            the expectations of a typical hotel. The minimalist aesthetic, while
            visually appealing, could potentially lack a warmer and more
            inviting atmosphere required in hospitality spaces.
          </p>
        </div>

        {/* Image Slider for Mobile */}
        <div className="md:hidden relative w-full overflow-x-auto scrollbar-hide ">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {image.map((img, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[450px] object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
        {/* Dots Navigation */}
        <div className="flex lg:hidden justify-center mt-4 space-x-2">
          {image.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-primary" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>

        {/* Two Images Side by Side for Larger Screens */}
        <div className="hidden md:flex flex-col md:flex-row items-center justify-center p-5 mx-auto w-full md:w-[85%] gap-10">
          <img
            src={function1}
            alt=""
            className="w-full md:w-1/2 h-[300px] md:h-[500px] object-cover rounded-lg"
          />
          <img
            src={function2}
            alt=""
            className="w-full md:w-1/2 h-[300px] md:h-[500px] object-cover rounded-lg"
          />
        </div>

        {/* Project Teams Section */}
        <div className="flex flex-col md:flex-row items-start justify-around p-5">
          <h1 className="font-semibold text-2xl">Project Teams</h1>
          <ul className="mt-5 md:mt-0">
            <li>Principal Architect</li>
            <li>3D Visualization Specialist</li>
            <li>Interior Design Specialist</li>
            <li>Marketing</li>
          </ul>
          <ul className="mt-5 md:mt-0 lg:block hidden">
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="border-t pt-14">
        <div className="flex flex-col items-start pl-5 md:pl-10">
          <h1 className="text-3xl md:text-5xl w-full md:w-1/3 font-semibold">
            Explore some of our current projects
          </h1>
          <div className="bottom-0 items-center justify-center pt-5 transform flex space-x-4">
            <button
              onClick={handlePrev}
              className="border border-primary text-primary px-4 py-2 md:px-4 md:py-3 rounded-full"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="border border-primary text-primary px-4 py-2 md:px-4 md:py-3 rounded-full"
            >
              →
            </button>
          </div>
        </div>

        <section>
          <div className="relative w-full overflow-x-auto scrollbar-hide mt-5 p-5 md:p-10">
            <div
              className="flex transition-transform duration-300 ease-in-out gap-10"
              style={{
                transform: `translateX(-${currentIndex * (100 / 2.2)}%)`,
              }}
            >
              {images.map((image) => (
                <div
                  key={image.id}
                  className="w-full md:w-1/2  min-w-[100%] md:min-w-[45%] flex flex-col items-start"
                >
                  <img src={image.img} alt={image.title} className="w-full " />
                  <div className="text-start mt-5">
                    <h1 className="font-semibold text-xl">{image.title}</h1>
                    <h2 className="font-semibold pt-4">{image.subtitle}</h2>
                    <p className="text-sm w-full">{image.description}</p>
                  </div>
                  <button className="underline underline-offset-8 pt-2">
                    View →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </article>
  );
};

export default BlogDetails;
