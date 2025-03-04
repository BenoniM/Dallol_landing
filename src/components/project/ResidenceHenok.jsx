import blognew from "../../assets/img/hotel.png";
import blogfull from "../../assets/img/fullhenok.png";
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
            Henok T. Residence
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

      <section className="flex flex-row items-center  p-3">
        <div className="flex flex-col  items-center w-1/2 h-[830px] gap-20 pt-20 p- border border-primary mr-4">
          <h1 className="text-8xl  font-bold relative after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:bg-primary after:left-1/2 after:top-full after:translate-y-2">
            Features
          </h1>
          <p className="w-[66%]">
            This luxury residence showcases a modern, minimalist residential
            building that emphasizes clean lines and functional elegance. The
            architecture incorporates horizontal and vertical elements, creating
            a balanced and structured appearance. The use of neutral colors,
            such as white and dark gray, reinforces the contemporary aesthetic,
            while textured wall panels add depth and visual interest.
          </p>
        </div>
        <img src={blognew} alt="" className="w-1/2" />
      </section>

      <section>
        <div className="flex flex-row items-center justify-between p-5 relative">
          <h1 className="text-8xl font-bold relative after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:bg-primary after:left-1/2 after:top-full after:translate-y-2">
            Function
          </h1>
          <p className="w-[55%]">
            The large, recessed balconies and expansive glass windows enhance
            the connection between indoor and outdoor spaces, making the
            structure feel open and inviting. Integrated lighting throughout the
            façade highlights the building’s architectural features, especially
            in the evening, giving it a warm and sophisticated ambiance. The
            landscape includes minimalistic greenery, which complements the
            building’s modern style without detracting from its simplicity.
          </p>
        </div>

        <div className="flex flex-row items-center justify-center p-5 mx-auto w-full gap-10">
          <img
            src={blogfull}
            alt=""
            className="w-full h-[500px] object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-row items-center justify-center gap-12 p-5  ">
          <img src={livingroom} alt="" className="w-1/2" />
          <div className="w-1/3 ">
            <h1 className="text-5xl font-light">
              80<sub className="text-sm">m2</sub>
            </h1>
            <h1 className="text-4xl font-semibold mb-5 mt-5">Living Room.</h1>
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
        </div>

        <div className="flex flex-row items-center justify-center gap-12 p-5  ">
          <div className="w-1/3 ">
            <h1 className="text-5xl font-light ">
              55<sub className="text-sm">m2</sub>
            </h1>
            <h1 className="text-4xl font-semibold mb-5 mt-5">Bedroom.</h1>
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
          <div className="flex w-1/2 gap-5 h-[630px] o">
            <img src={bedroom} alt="" className="w-1/2" />
            <img src={bedromm1} alt="" className="w-[65%]" />
          </div>
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

export default ResidenceHenok;
