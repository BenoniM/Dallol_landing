import blognew from "../../assets/img/hotel.png";
import bedroom2 from "../../assets/img/fullnew.png";
import bloghero from "../../assets/img/herohenok.png";
import lidiyares from "../../assets/img/lidiyares.png";
import livingroom from "../../assets/img/livingroom.png";
import bedromm1 from "../../assets/img/bedromm1.png";
import bedroom from "../../assets/img/bedroom.png";
import checklist from "../../assets/icon/checklist.svg";
import Nabbar2 from "../Nabbar2";
import { useState } from "react";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bedroomSlide, setBedroomSlide] = useState(0);

  const bedroomImages = [bedroom, bedromm1, bedroom2];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 2 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 2 : prev - 1));
  };

  return (
    <article>
      <Nabbar2 />

      {/* Hero Section */}
      <div className="flex items-center justify-center">
        <div
          style={{ backgroundImage: `url(${bloghero})` }}
          className="h-[300px] md:h-[450px] bg-cover bg-center flex flex-col items-center justify-center rounded-3xl w-full max-w-[98%] mx-auto"
        >
          <h1 className="text-4xl md:text-8xl font-bold text-white text-center px-4">
            Henok T. Residence
          </h1>
          <p className="text-white w-3/4 md:w-1/2 my-2 text-center text-sm md:text-base">
            The design shows a large, imposing hotel and business structure...
          </p>
        </div>
      </div>

      {/* Features Section */}
      <section className="flex flex-col md:flex-row items-center p-3">
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
        <div className="flex flex-col md:flex-row items-start justify-between p-5">
          <h1 className="text-4xl md:text-8xl font-bold relative after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:bg-primary after:left-1/2 after:top-full after:translate-y-2">
            Function
          </h1>
          <p className="w-full md:w-[55%] mt-5 md:mt-0">
            This expansive glass windows enhance the connection between indoor
            and outdoor spaces, making the structure feel open and inviting.
            Integrated lighting throughout the façade highlights the building’s
            architectural features, especially in the evening, giving it a warm
            and sophisticated ambiance. The landscape includes minimalistic
            greenery, which complements the building’s modern style without
            detracting from its simplicity.
          </p>
        </div>

        {/* Full-width Image */}
        <div className="w-full  flex-row h-[300px] md:h-[500px] rounded-lg overflow-hidden lg:flex hidden">
          <img src={bedroom} alt="" className="w-1/3 h-full object-cover" />
          <img src={bedromm1} alt="" className="w-1/3 h-full object-cover" />
          <img src={bedroom2} alt="" className="w-1/3 h-full object-cover" />
        </div>

        <div className="md:hidden w-full relative">
          <div className="flex overflow-hidden">
            <div
              className="flex transition-transform duration-300"
              style={{ transform: `translateX(-${bedroomSlide * 100}%)` }}
            >
              {bedroomImages.map((img, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <img
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
          <img
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
          <img
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
                    <img
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
            <img src={bedroom} alt="" className="w-1/2" />
            <img src={bedromm1} alt="" className="w-[65%]" />
          </div>
        </div>
      </section>

      {/* Projects Carousel */}
      <section className="border-t pt-14">
        <div className="flex flex-col items-start pl-5 md:pl-10">
          <h1 className="text-3xl md:text-5xl w-full md:w-1/3 font-semibold">
            Explore some of our current projects
          </h1>
          <div className="flex space-x-4 pt-5">
            <button
              onClick={handlePrev}
              className="border border-primary text-primary px-4 py-2 md:py-3 rounded-full"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="border border-primary text-primary px-4 py-2 md:py-3 rounded-full"
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

export default ResidenceHenok;
