import React from "react";
import { useNavigate } from "react-router-dom";
import gallery1 from "../../assets/img/Frame814.png";
import gallery2 from "../../assets/img/Frame15.png";
import gallery3 from "../../assets/img/Frame16.png";
import gallery4 from "../../assets/img/Frame7.png";

const galleries = [
  {
    id: 1,
    image: gallery1,
    title: "Birhan",
    description:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s...",
  },
  {
    id: 2,
    image: gallery2,
    title: "Dr. Abdi Aermolo Interior",
    description:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s...",
  },
  {
    id: 3,
    image: gallery3,
    title: "ATO GIZACHEW TERGA",
    description:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s...",
  },
  {
    id: 4,
    image: gallery4,
    title: "Ato Henok Interior",
    description:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s...",
  },
];

const CardGallery = () => {
  const navigate = useNavigate();

  const handleReadMore = (id) => {
    navigate(`/gallery360/${id}`);
  };

  return (
    <article className="p-10">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {galleries.map((gallery) => (
          <div
            key={gallery.id}
            className=" overflow-hidden p-5 flex flex-col items-start text-start"
          >
            <img
              src={gallery.image}
              alt={gallery.title}
              className="w-full h-auto object-cover rounded-lg"
            />
            <h1 className="text-xl font-bold mt-4">{gallery.title}</h1>
            <p className="text-gray-600 mt-2">{gallery.description}</p>
            <button
              onClick={() => handleReadMore(gallery.id)}
              className="mt-4 bg-primary text-white px-5 py-2 rounded-full"
            >
              Read More
            </button>
          </div>
        ))}
      </section>
    </article>
  );
};

export default CardGallery;
