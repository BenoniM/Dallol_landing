import blognew from "../../assets/img/hotel.png";
import bedroom2 from "../../assets/img/fullnew.png";
import bloghero from "../../assets/img/herohenok.png";
import lidiyares from "../../assets/img/lidiyares.png";
import livingroom from "../../assets/img/livingroom.png";
import bedromm1 from "../../assets/img/bedromm1.png";
import bedroom from "../../assets/img/bedroom.png";
import checklist from "../../assets/icon/checklist.svg";
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
      "The design exemplifies a neoclassical architectural style with modern influences. The building's symmetrical facade, strong vertical lines, and grand central entranceemphasize classical proportions and balance.",
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

const ResidenceHenok = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bedroomSlide, setBedroomSlide] = useState(0);

  const bedroomImages = [bedroom, bedromm1, bedroom2];

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
                The design is focused in presenting a modern and stylish design.
                The contrasting use of dark brick and white plaster creates a
                visually interesting facade.
              </p>
              <p className="text-xs sm:text-sm lg:text-[14.5px] xl:text-[15px] text-neutral-700 leading-relaxed font-normal">
                The vertical lines formed by the windows and balconies add a
                sense of height and elegance.
              </p>
            </div>

            {/* Bottom Left: Title (Decreased font size) */}
            <div className="pt-4 sm:pt-6 lg:pt-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[54px] font-bold text-black tracking-tight leading-[1.1]">
                Henok T. Residence
              </h1>
            </div>
          </div>

          {/* Right Column: Image on the right (No border radius) */}
          <div className="w-full h-[280px] sm:h-[360px] lg:h-full min-h-0 order-1 lg:order-2 overflow-hidden rounded-none">
            <ParallaxImage
              src={bloghero}
              alt="Henok T. Residence"
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
              src={bedroom}
              alt=""
              className="flex-1 min-w-0 h-full object-cover"
            />
            <ParallaxImage
              src={bedromm1}
              alt=""
              className="flex-1 min-w-0 h-full object-cover"
            />
            <ParallaxImage
              src={bedroom2}
              alt=""
              className="flex-1 min-w-0 h-full object-cover"
            />
          </div>
          <p className="col-start-3 row-start-1 self-start max-w-[220px] text-xs lg:text-sm leading-relaxed text-neutral-800">
            This expansive glass windows enhance the connection between indoor
            and outdoor spaces, making the structure feel open and inviting.
            Integrated lighting throughout the façade highlights the building’s
            architectural features, especially in the evening, giving it a warm
            and sophisticated ambiance. The landscape includes minimalistic
            greenery, which complements the building’s modern style without
            detracting from its simplicity.
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
            This expansive glass windows enhance the connection between indoor
            and outdoor spaces, making the structure feel open and inviting.
            Integrated lighting throughout the façade highlights the building’s
            architectural features, especially in the evening, giving it a warm
            and sophisticated ambiance. The landscape includes minimalistic
            greenery, which complements the building’s modern style without
            detracting from its simplicity.
          </p>
        </div>

        <div className="md:hidden w-full relative">
          <div className="flex overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${bedroomSlide * 100}%)` }}
            >
              {bedroomImages.map((img, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <ParallaxImage
                    src={img}
                    alt=""
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-4 space-x-2">
            {bedroomImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setBedroomSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  bedroomSlide === index ? "bg-primary" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Living Room Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-5">
          <ParallaxImage
            src={livingroom}
            alt=""
            className="w-full md:w-1/2 lg:block hidden"
          />
          <div className="w-full md:w-1/3">
            <h1 className="text-3xl md:text-5xl font-light">
              80<sub className="text-sm">m2</sub>
            </h1>
            <h1 className="text-2xl md:text-4xl font-semibold my-5">
              Living Room.
            </h1>
            <p>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
              commodo ligula eget dolor. Aenean massa. Cum sociis natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Donec q
            </p>
            <ul className=" pl-1">
              <div className="flex items-center gap-2">
                <img src={checklist} alt="" className="w-3 h-3" />
                <li>Etiam efficitur elit ac ipsum egestas porta.</li>
              </div>
              <div className="flex items-center gap-2">
                <img src={checklist} alt="" className="w-3 h-3" />
                <li>Maecenas varius magna quis velit suscipit dictum.</li>
              </div>
              <div className="flex items-center gap-2">
                <img src={checklist} alt="" className="w-3 h-3" />
                <li>Quisque pulvinar lacus ut ex pulvinar scelerisque.</li>
              </div>
            </ul>
          </div>
          <ParallaxImage
            src={livingroom}
            alt=""
            className="w-full md:w-1/2 lg:hidden block"
          />
        </div>

        {/* Bedroom Section with Slider */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 p-5">
          <div className="w-full md:w-1/3">
            <h1 className="text-3xl md:text-5xl font-light">
              55<sub className="text-sm">m2</sub>
            </h1>
            <h1 className="text-2xl md:text-4xl font-semibold my-5">
              Bedroom.
            </h1>
            <p className="font-light">
              Sed urna eros, venenatis et suscipit nec, laoreet vel felis.
              Curabitur sit amet elementum erat, sed tempus ante. Praesent
              ullamcorper orci quis arcu scelerisque auctor. Duis congue commodo
              ornare.
            </p>
            <ul className=" pl-1 mt-2">
              <div className="flex items-center gap-2">
                <img src={checklist} alt="" className="w-3 h-3" />
                <li>Etiam efficitur elit ac ipsum egestas porta.</li>
              </div>
              <div className="flex items-center gap-2">
                <img src={checklist} alt="" className="w-3 h-3" />
                <li>Maecenas varius magna quis velit suscipit dictum.</li>
              </div>
              <div className="flex items-center gap-2">
                <img src={checklist} alt="" className="w-3 h-3" />
                <li>Quisque pulvinar lacus ut ex pulvinar scelerisque.</li>
              </div>
            </ul>
          </div>

          {/* Mobile Slider */}
          <div className="md:hidden w-full relative">
            <div className="flex overflow-hidden">
              <div
                className="flex transition-transform duration-300"
                style={{ transform: `translateX(-${bedroomSlide * 100}%)` }}
              >
                {bedroomImages.map((img, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <ParallaxImage
                      src={img}
                      alt=""
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Dots */}
            <div className="flex justify-center mt-4 space-x-2">
              {bedroomImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setBedroomSlide(index)}
                  className={`w-3 h-3 rounded-full ${
                    bedroomSlide === index ? "bg-primary" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden md:flex w-1/2 gap-5 h-[630px]">
            <ParallaxImage src={bedroom} alt="" className="w-1/2" />
            <ParallaxImage src={bedromm1} alt="" className="w-[65%]" />
          </div>
        </div>
      </section>

      {/* Explore projects: scroll-driven horizontal showcase */}
      <ExploreProjects projects={images} />
    </article>
  );
};

export default ResidenceHenok;
