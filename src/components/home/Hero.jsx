import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import Bactier from "../../assets/img/heroimg2.png";
import slide1 from "../../assets/img/heroimg.png";
import slide2 from "../../assets/img/heroimg3.png";
import logo from "../../assets/icon/logowhite.svg";
import facebook from "../../assets/icon/whitelinkedin.svg";
import linkedin from "../../assets/icon/whitelinkedin.svg";
import pinterest from "../../assets/icon/whitepinterest.svg";
import CircularText from "../CircularText";

const Hero = () => {
  const cardsData = [
    { title: "Card 1", image: Bactier },
    { title: "Card 2", image: slide1 },
    { title: "Card 3", image: slide2 },
  ];

  const autoplayOptions = { delay: 9000 };
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay(autoplayOptions)]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div id="Hero-section" className="relative w-full font-montserrat">
      {/* Carousel */}
      <div className="overflow-hidden relative h-auto" ref={emblaRef}>
        <div className="flex">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="embla__slide w-full flex-shrink-0 overflow-hidden relative"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Text on the Left */}
      <div className="absolute bottom-24 left-20 w-[70%] space-y-1 text-white z-10">
        <h1 className="text-xl sm:text-5xl md:text-7xl lg:text-5xl font-semibold leading-tight">
          DALLOL
        </h1>
        <p className="lg:text-[5rem] text-lg font-semibold leading-none">
          Where Innovation Meets Precision
        </p>
      </div>
      <div className="absolute bottom-0 flex flex-col items-center space-y-4 p-8 ">
        <div className="border-r border-white h-[70vh] pt-"></div>
        <a
          className="text-white text-2xl hover:text-gray-400 transition duration-300"
          href="#"
        >
          <i className="">
            <img src={facebook} alt="" />
          </i>
        </a>
        <a
          className="text-white text-2xl hover:text-gray-400 transition duration-300"
          href="#"
        >
          <i className="">
            <img src={linkedin} alt="" />
          </i>
        </a>
        <a
          className="text-white text-2xl hover:text-gray-400 transition duration-300"
          href="#"
        >
          <i className="">
            <img src={pinterest} alt="" />
          </i>
        </a>
      </div>

      {/* Button on the Right */}
      <div className="absolute bottom-32 right-10 z-10 ">
        <CircularText text="build your dream With Us" />
      </div>
    </div>
  );
};

export default Hero;
