import React from "react";
import bgImg from "../../assets/img/bgExpertise.png";

const images = [
  {
    id: 1,
    title: "Architectural and Engineering Design",
    description:
      "We believe that architecture should be a reflection of the communities it serves. Our architectural and engineering design expertise is rooted in a deep understanding of both aesthetics and functionality.",
  },
  {
    id: 2,
    title: "Design and Build",
    description:
      "Our design and build approach allows us to streamline the construction process, providing a seamless transition from concept to completion. We take ownership of every project phase, ensuring that our design vision is faithfully executed.",
  },
  {
    id: 3,
    title: "Project Management",
    description:
      "Successful project management is vital to navigating the complexities of architectural and construction projects. Our dedicated project management team employs structured methodologies to oversee all aspects of the project, from inception to completion.",
  },
  {
    id: 4,
    title: "Asset Valuation and Property Management",
    description:
      "Understanding the value of assets across various sectors is crucial in today’s ever-evolving market. Our asset valuation services provide comprehensive insights into performance metrics, market trends, and potential opportunities.",
  },
  {
    id: 5,
    title: "Training and Consultancy",
    description:
      "Recognizing the importance of continuous learning, we offer training and consultancy services designed to equip individuals and organizations with the knowledge and skills necessary to navigate the complexities of the built environment.",
  },
];

const ExpertiseAbout = () => {
  return (
    <article
      className="min-h-screen flex flex-col items-center justify-center py-10 relative z-40 bg-white shadow-[0_-12px_35px_rgba(0,0,0,0.25)]"
      style={{
        backgroundImage: `url(${bgImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="text-start w-full max-w-8xl mb-10  px-10">
        <h1 className="text-5xl font-bold relative after:content-[''] after:absolute after:h-[4px] lg:after:w-[9%] after:w-[49%] pb-5 after:bg-primary lg:after:left-[6%] after:left-[34%] after:top-full after:-translate-y-4">
          Expertise
        </h1>
      </div>
      <section className="w-full max-w-8xl lg:p-5 p-3">
        <div className="grid lg:grid-cols-3 grid-flow-row gap-6">
          {images.slice(0, 3).map((image) => (
            <div
              key={image.id}
              className="col-span-1 bg-white rounded-lg border border-black p-6 flex flex-col justify-evenly"
            >
              <h1 className="font-semibold text-2xl mb-4">{image.title}</h1>
              <p className="text-gray-600 ">{image.description}</p>
            </div>
          ))}
        </div>

        {/* Last row - Centered */}
        <div className="flex lg:flex-row flex-col justify-center gap-6 mt-6">
          {images.slice(3).map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg border border-black p-6 flex flex-col  justify-evenly lg:w-[40%]"
            >
              <h1 className="font-semibold text-2xl mb-4">{image.title}</h1>
              <p className="text-gray-600 ">{image.description}</p>
            </div>
          ))}
        </div>
      </section>
    </article>
  );
};

export default ExpertiseAbout;
