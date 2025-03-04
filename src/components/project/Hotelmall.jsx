import blognew from "../../assets/img/school.png";
import blogfull from "../../assets/img/hotelfull.png";
import bloghero from "../../assets/img/herohenok.png";
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

const HotelMall = () => {
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
    <article>
      <Nabbar2 />
      <div className="flex items-center justify-center">
        <div
          style={{ backgroundImage: `url(${bloghero})` }}
          className="h-[450px] bg-cover bg-center flex flex-col items-center justify-center rounded-3xl max-w-[98%] mx-auto"
        >
          <h1 className="text-8xl font-bold text-white text-center">
            Yeshowa Birhan Hotel and Mall
          </h1>
          <p className="text-white w-1/2 my-2 text-center">
            The design shows a large, imposing hotel and business structure. The
            front has a large central entrance, arched windows, and a
            symmetrical layout, all of which are characteristics of classic
            architecture. A sense of elegance and grandeur is created by the
            building's exterior's use of warm, earthy tones.
          </p>
        </div>
      </div>

      <section className="flex flex-row items-center  p-5">
        <div className="flex flex-col  items-center w-1/2 h-[500px] gap-20 pt-20 p- border border-primary ">
          <h1 className="text-8xl font-bold">Features</h1>
          <p className="w-[66%]">
            The design shows a large, imposing hotel and business structure. The
            front has a large central entrance, arched windows, and a
            symmetrical layout, all of which are characteristics of classic
            architecture. A sense of elegance and grandeur is created by the
            building's exterior's use of warm, earthy tones.
          </p>
        </div>
        <img src={blognew} alt="" className="w-1/2" />
      </section>

      <section>
        <div className="flex flex-row items-center justify-between p-5">
          <h1 className="text-8xl font-bold">Function</h1>
          <p className="w-[55%]">
            The Hotel design, while modern and sleek, might not fully align with
            the expectations of a typical hotel. The minimalist aesthetic, while
            visually appealing, could potentially lack a warmer and more
            inviting atmosphere required in hospitality spaces.
          </p>
        </div>

        <div className="flex flex-row items-center justify-center p-5 mx-auto w-full gap-10">
          {/* Ensure both images take equal width and maintain aspect ratio */}
          <img
            src={blogfull}
            alt=""
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-row items-start justify-around p-5">
          <h1 className="font-semibold text-2xl">Project Teams</h1>
          <ul>
            <li>Principal Architect</li>
            <li>3D Visualization Specialist</li>
            <li>Interior Design Specialist</li>
            <li>Marketing</li>
          </ul>
          <ul>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
        </div>
      </section>

      <section className="border-t pt-14">
        <div className="flex flex-col items-start pl-10">
          <h1 className="text-5xl w-1/3 font-semibold">
            Explore some of our current projects
          </h1>
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
        </div>

        <section>
          <div className="relative w-full overflow-hidden mt-5 p-10">
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
                  <img src={image.img} alt={image.title} className="w-[90%]" />
                  <div className="text-start mt-5">
                    <h1 className="font-semibold  text-xl ">{image.title}</h1>
                    <h2 className="font-semibold pt-4">{image.subtitle}</h2>
                    <p className="text-sm w-[94%]">{image.description}</p>
                  </div>
                  <button className="underline underline-offset-8 pt2">
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

export default HotelMall;
