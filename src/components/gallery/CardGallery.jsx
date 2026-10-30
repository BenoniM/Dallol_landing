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
    <article className="w-full bg-white px-4 sm:px-8 lg:px-[60px] py-16 lg:py-24 font-montserrat">
      {/* Staggered 3-column grid: first card starts at column 2, so rows read
          [empty, card, card] / [card, card, empty] on large screens */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {galleries.map((gallery, idx) => (
          <div
            key={gallery.id}
            className={`group bg-[#01263D] text-white p-5 flex flex-col md:aspect-square cursor-pointer ${
              idx === 0 ? "lg:col-start-2" : ""
            }`}
            onClick={() => handleReadMore(gallery.link)}
          >
            <div className="h-56 md:h-auto md:flex-1 min-h-0 overflow-hidden">
              <img
                src={gallery.image}
                alt={gallery.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>

            <h2 className="mt-6 text-2xl sm:text-3xl xl:text-[2.4rem] font-bold uppercase leading-tight tracking-tight">
              {gallery.title}
            </h2>

            <div className="mt-4 flex items-end justify-between gap-5">
              <p className="max-w-[65%] text-sm sm:text-[0.95rem] leading-snug text-white/80">
                {gallery.description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleReadMore(gallery.link);
                }}
                className="shrink-0 bg-[#FF4C1D] text-white px-5 py-1 font-mono uppercase tracking-wide text-base sm:text-lg hover:bg-white hover:text-[#01263D] transition-colors"
              >
                Explore 360
              </button>
            </div>
          </div>
        ))}
      </section>
    </article>
  );
};

export default CardGallery;
