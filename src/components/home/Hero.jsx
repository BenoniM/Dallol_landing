import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import Bactier from "../../assets/img/heroimg2.png";
import slide1 from "../../assets/img/heroimg.png";
import slide2 from "../../assets/img/heroimg3.png";
import logo from "../../assets/icon/logowhite.svg";

import linkedin from "../../assets/icon/whitelinkedin.svg";
import facebook from "../../assets/icon/whitefacebook.svg";
import tiktok from "../../assets/icon/whitetiktok.svg";
import instagram from "../../assets/icon/whtieinstagram.svg";
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
    window.scrollTo(0, 0);
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  return (
    <div
      id="Hero-section"
      className="relative w-full font-montserrat overflow-hidden"
    >
      {/* Carousel */}
      <div className="overflow-hidden relative " ref={emblaRef}>
        <div className="flex">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="embla__slide w-full flex-shrink-0 overflow-hidden relative"
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-screen object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Text on the Left */}
      <div className="absolute lg:bottom-20 bottom-14 lg:left-20 left-14 w-[70%] space-y-1 text-white z-10">
        <h1 className="text-xl font-light md:text-7xl lg:text-5xl lg:font-semibold leading-tight">
          DALLOL
        </h1>
        <p className="lg:text-[5rem] lg:w-full w-[80%] text-2xl font-semibold leading-none">
          Where Innovation Meets Precision
        </p>
      </div>
      <div className="absolute bottom-0 flex flex-col items-center space-y-5 lg:p-8 p-4 ">
        <div className="border-r border-white h-[100vh] pt-"></div>
        <a
          className="text-white text-2xl hover:text-gray-400 transition duration-300"
          href="https://web.facebook.com/dallol.consult"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="">
            <img src={facebook} alt="" className="w-6 h-6" />
          </i>
        </a>
        <a
          className="text-white text-2xl hover:text-gray-400 transition duration-300"
          href="https://www.instagram.com/dallolconsult?igsh=Z2kwcXlheXpid2Np"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="">
            <img src={instagram} alt="" className="w-5 h-5" />
          </i>
        </a>
        <a
          className="text-white text-2xl hover:text-gray-400 transition duration-300"
          href="https://www.linkedin.com/company/dallol-consult/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="">
            <img src={linkedin} alt="" className="w-6 h-6" />
          </i>
        </a>
        <a
          className="text-white text-2xl hover:text-gray-400 transition duration-300"
          href="https://www.tiktok.com/@dallol.consult?_t=ZM-8tsMnv9lVHp&_r=1"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="">
            <img src={tiktok} alt="" className="w-6 h-6" />
          </i>
        </a>
      </div>

      <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 z-10 overflow-hidden">
        <CircularText text="build your dream With Us" />
      </div>
    </div>
  );
};

export default Hero;
