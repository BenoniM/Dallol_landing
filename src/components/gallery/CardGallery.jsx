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
    link: "https://www.keypano.com/v/fvfex566478jee-1728020920.html",
  },
  {
    id: 2,
    image: gallery2,
    title: "Dr. Abdi Aermolo Interior",
    description:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s...",
    link: "https://www.keypano.com/v/ul1b60et884l6c-1725884388.html",
  },
  {
    id: 3,
    image: gallery3,
    title: "ATO GIZACHEW TERGA",
    description:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s...",
    link: "https://www.keypano.com/v/8o4fdbt74v_b46-1723125684.html",
  },
  {
    id: 4,
    image: gallery4,
    title: "Ato Henok Interior",
    description:
      "Villa Alpha, the studio and residence of the most renowned Ethiopian artist, Afewerk Tekle, built in the 1960s...",
    link: "https://www.keypano.com/v/98apb_1c43ay06-1721661744.html",
  },
];

const CardGallery = () => {
  const navigate = useNavigate();

  const handleReadMore = (link) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank"); // Opens external links in a new tab
    } else {
      navigate(link); // Navigates to internal routes
    }
  };

  return (
    <article className="lg:p-10">
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
            <h1 className="text-xl font-semibold mt-4">{gallery.title}</h1>
            <p className="text-gray-600 mt-2">{gallery.description}</p>
            <button
              onClick={() => handleReadMore(gallery.link)}
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
