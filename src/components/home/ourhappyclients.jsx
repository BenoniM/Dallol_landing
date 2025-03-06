import React, { useState } from "react";
import avatar from "../../assets/img/avatergirl.svg";
import avatar2 from "../../assets/img/avaterman.svg";
import avatar3 from "../../assets/img/avaterchina.svg";

const testimonials = [
  {
    id: 1,
    img: avatar,
    name: "Emily Johnson",
    feedback:
      "I never imagined my dream home could become a reality until I partnered with Dallol Consult. Their attention to detail in architectural design created a space that truly feels like mine.",
  },
  {
    id: 2,
    img: avatar2,
    name: "David Miller",
    feedback:
      "Dallol Consult made navigating the complexities of permit preparation a breeze. Their expertise ensured that my renovation project moved forward without a hitch, allowing me to focus on my vision.",
  },
  {
    id: 3,
    img: avatar3,
    name: "Laura Lee",
    feedback:
      "The precision in the 3D modeling service is remarkable. Seeing my ideas visualized in such detail before construction gave me the confidence to make informed decisions.",
  },
];

const OurHappyClients = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <article className="lg:px-[5%] px-[1%] font-montserrat">
      {/* Header Section */}
      <section className="flex flex-col items-center justify-center w-full px-6 gap-5">
        <p className="lg:text-5xl text-3xl font-semibold relative after:content-[''] font-montserrat after:absolute after:h-[4px] lg:after:w-[9%] after:w-[49%] pb-5 after:bg-primary lg:after:left-[6%] after:left-[34%] after:top-full after:-translate-y-4">
          Our Happy Clients
        </p>
        <p className="text-center max-w-5xl leading-snug text-gray-400 font-montserrat">
          Elevate your project with testimonials from those who have experienced
          the transformative impact of Dallol Consult. Our clients appreciate
          the thoughtful architectural designs that we bring to life.
        </p>
      </section>

      {/* Mobile Slider */}
      <section className="lg:hidden relative mt-10 overflow-x-auto scrollbar-hide  lg:p-0 p-4">
        <div
          className="flex transition-transform duration-300 ease-in-out gap-5"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${testimonials.length * 34}%`,
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-full  flex-shrink-0"
              style={{ flex: "0 0 100%" }}
            >
              <div className="flex flex-col  h-[163px] items-start p rounded-3xl border  shadow-md bg-white">
                <div className="flex flex-row items-center gap-5 pl-2">
                  <img
                    src={testimonial.img}
                    alt={testimonial.name}
                    className="w-20 h-20"
                  />
                  <div className="flex flex-col text-[#082D38]">
                    <h2 className="text-lg font-bold mb-2">
                      {testimonial.name}
                    </h2>
                    <p className="text-sm text-justify w-[95%]">
                      {testimonial.feedback}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Navigation Buttons */}
      <div className="flex justify-center space-x-4 mt-5 lg:hidden">
        <button
          onClick={handlePrev}
          className="border border-primary text-primary px-4 py-2 rounded-full"
        >
          ←
        </button>
        <button
          onClick={handleNext}
          className="border border-primary text-primary px-4 py-2 rounded-full"
        >
          →
        </button>
      </div>

      {/* Grid Layout (Visible on larger screens) */}
      <section className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 p-5">
        {testimonials.map((client) => (
          <div
            key={client.id}
            className="flex flex-col items-start p-6 rounded-3xl border shadow-md bg-white"
          >
            <div className="flex flex-row items-start gap-5">
              <img src={client.img} alt={client.name} className="w-16 h-16" />
              <div className="flex flex-col text-[#082D38]">
                <h2 className="text-lg font-bold mb-2">{client.name}</h2>
                <p className="text-sm text-justify">{client.feedback}</p>
              </div>
            </div>
          </div>
        ))}
      </section>
    </article>
  );
};

export default OurHappyClients;
