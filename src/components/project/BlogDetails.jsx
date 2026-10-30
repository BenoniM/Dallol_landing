import blognew from "../../assets/img/bolgnew.png";
import bloghero from "../../assets/img/herohenok.png";
import function1 from "../../assets/img/lefthenok.png";
import function2 from "../../assets/img/righthenok.png";
import lidiyares from "../../assets/img/lidiyares.png";
import Navbar from "../Navbar";
import ExploreProjects from "./ExploreProjects";
import ParallaxImage from "./ParallaxImage";
import { useState, useEffect } from "react";

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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

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
    <article className="w-full bg-white font-montserrat text-black">
      <Navbar forceDark={true} />
      {/* Hero Section */}
      <section
        id="Hero-section"
        className="w-full bg-white text-black min-h-screen lg:h-screen lg:max-h-screen overflow-hidden pt-20 sm:pt-24 lg:pt-24 pb-6 sm:pb-8 lg:pb-10 px-3 sm:px-6 md:px-8 lg:px-10 box-border flex flex-col justify-between"
      >
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-stretch min-h-0 flex-1">
          {/* Left Column: Description on top left, Title on bottom left */}
          <div className="flex flex-col justify-between h-full min-h-0 py-1 lg:py-2 order-2 lg:order-1">
            {/* Top Left: Description (Decreased font size) */}
            <div className="max-w-xl space-y-3 sm:space-y-4">
              <p className="text-xs sm:text-sm lg:text-[14.5px] xl:text-[15px] text-neutral-700 leading-relaxed font-normal">
                The design shows a large, imposing hotel and business structure.
                The front has a large central entrance, arched windows, and a
                symmetrical layout, all of which are characteristics of classic
                architecture.
              </p>
              <p className="text-xs sm:text-sm lg:text-[14.5px] xl:text-[15px] text-neutral-700 leading-relaxed font-normal">
                A sense of elegance and grandeur is created by the building's
                exterior's use of warm, earthy tones.
              </p>
            </div>

            {/* Bottom Left: Title (Decreased font size) */}
            <div className="pt-4 sm:pt-6 lg:pt-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[54px] font-bold text-black tracking-tight leading-[1.1]">
                Tranzit Hotel
              </h1>
            </div>
          </div>

          {/* Right Column: Image on the right (No border radius) */}
          <div className="w-full h-[280px] sm:h-[360px] lg:h-full min-h-0 order-1 lg:order-2 overflow-hidden rounded-none">
            <ParallaxImage
              src={blognew}
              alt="Tranzit Hotel"
              className="w-full h-full object-cover object-center rounded-none"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full h-screen bg-white px-3 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 lg:py-12 flex flex-col items-center justify-center text-center overflow-hidden box-border">
        <h2 className="flex flex-col items-center leading-none">
          <span className="font-light text-neutral-500 text-2xl sm:text-3xl lg:text-4xl">
            Key
          </span>
          <span className="font-normal uppercase tracking-[0.04em] text-neutral-900 text-3xl sm:text-5xl lg:text-6xl">
            Features
          </span>
        </h2>
        <p className="mt-4 sm:mt-6 max-w-xl text-xs sm:text-sm leading-relaxed text-neutral-800">
          The Hotel design, while modern and sleek, might not fully align with
          the expectations of a typical hotel. The minimalist aesthetic, while
          visually appealing, could potentially lack a warmer and more inviting
          atmosphere required in hospitality spaces.
        </p>
        <ParallaxImage
          src={blognew}
          alt=""
          className="mt-4 sm:mt-6 h-[38vh] sm:h-[42vh] lg:h-[45vh] max-w-full aspect-[5/3] object-cover"
        />
      </section>

      {/* Function Section */}
      <section>
        {/* Desktop: images centred, description top right, title bottom left */}
        <div className="hidden md:grid min-h-screen grid-cols-[1fr_auto_1fr] grid-rows-[1fr_auto] gap-x-4 lg:gap-x-6 px-3 sm:px-6 md:px-8 lg:px-10 pt-[12vh] pb-14 lg:pb-20 box-border">
          <div className="col-start-2 row-start-1 flex gap-2 lg:gap-3 w-[46vw] lg:w-[50vw] h-[42vh] lg:h-[50vh]">
            <ParallaxImage
              src={function1}
              alt=""
              className="flex-1 min-w-0 h-full object-cover"
            />
            <ParallaxImage
              src={function2}
              alt=""
              className="flex-1 min-w-0 h-full object-cover"
            />
          </div>
          <p className="col-start-3 row-start-1 self-start max-w-[220px] text-xs lg:text-sm leading-relaxed text-neutral-800">
            The Hotel design, while modern and sleek, might not fully align with
            the expectations of a typical hotel. The minimalist aesthetic, while
            visually appealing, could potentially lack a warmer and more
            inviting atmosphere required in hospitality spaces.
          </p>
          <h2 className="col-start-1 col-span-2 row-start-2 self-end pt-6 leading-none font-normal uppercase tracking-[0.04em] text-neutral-900 text-4xl lg:text-6xl">
            Function
          </h2>
          <div className="col-start-3 row-start-2 self-end w-full pt-6">
            <h3 className="text-sm lg:text-base font-semibold text-neutral-900 mb-3">
              Project Teams
            </h3>
            <ul className="grid grid-cols-[auto_1fr] gap-x-4 lg:gap-x-8 gap-y-2 text-xs xl:text-sm">
              <li className="contents">
                <span className="whitespace-nowrap text-neutral-500">
                  Principal Architect
                </span>
                <span className="whitespace-nowrap text-neutral-900">
                  Lorem Ipsum
                </span>
              </li>
              <li className="contents">
                <span className="whitespace-nowrap text-neutral-500">
                  3D Visualization Specialist
                </span>
                <span className="whitespace-nowrap text-neutral-900">
                  Lorem Ipsum
                </span>
              </li>
              <li className="contents">
                <span className="whitespace-nowrap text-neutral-500">
                  Interior Design Specialist
                </span>
                <span className="whitespace-nowrap text-neutral-900">
                  Lorem Ipsum
                </span>
              </li>
              <li className="contents">
                <span className="whitespace-nowrap text-neutral-500">
                  Marketing
                </span>
                <span className="whitespace-nowrap text-neutral-900">
                  Lorem Ipsum
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile: title and description */}
        <div className="md:hidden flex flex-col items-start gap-4 px-3 sm:px-6 py-10">
          <h2 className="leading-none font-normal uppercase tracking-[0.04em] text-neutral-900 text-3xl sm:text-5xl">
            Function
          </h2>
          <p className="text-xs sm:text-sm leading-relaxed text-neutral-800">
            The Hotel design, while modern and sleek, might not fully align with
            the expectations of a typical hotel. The minimalist aesthetic, while
            visually appealing, could potentially lack a warmer and more
            inviting atmosphere required in hospitality spaces.
          </p>
        </div>

        {/* Image Slider for Mobile */}
        <div className="md:hidden relative w-full overflow-x-auto scrollbar-hide  ">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {image.map((img, index) => (
              <div key={index} className="w-full flex-shrink-0 ">
                <ParallaxImage
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-[450px] object-cover rounded-lg p-3"
                  />
              </div>
            ))}
          </div>
        </div>
        {/* Dots Navigation */}
        <div className="flex md:hidden justify-center mt-4 space-x-2">
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

        {/* Project Teams Section (mobile; desktop version sits in the Function grid) */}
        <div className="md:hidden flex flex-col items-start p-5">
          <h1 className="font-medium text-2xl">Project Teams</h1>
          <ul className="mt-5 md:mt-0 leading-10 xs:leading-10 lg:leading-7">
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

      {/* Explore projects: scroll-driven horizontal showcase */}
      <ExploreProjects projects={images} />
    </article>
  );
};

export default BlogDetails;
