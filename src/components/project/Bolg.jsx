import React, { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import blognew from "../../assets/img/bolgnew.png";
import school from "../../assets/img/schoolnew.png";
import henok from "../../assets/img/featurehenok.png";
import yesh from "../../assets/img/yesh.png";

const blogPosts = [
  {
    title: "Tranzit Hotel",
    content:
      "Villa Alpha, the studio and residence of the renowned Ethiopian artist Afewerk Tekle, built in the 1960s, is a celebrated establishment holding a sizable portion of the artist's priceless works. Dallol Consult reimagined this landmark into a world-class hospitality experience blending cultural heritage with contemporary architectural rigor.",
    link: "/blogdetails",
    img: blognew,
  },
  {
    title: "Yeshowa Birhan Hotel & Mall",
    content:
      "A monumental civic landmark uniting high-end retail, fine dining, and grand hospitality. The facade features a prominent central entrance, arched windows, and a balanced symmetrical layout, all anchored in classic architectural elegance with warm, earthy tones.",
    link: "/hotelmall",
    img: yesh,
  },
  {
    title: "School of Tomorrow",
    content:
      "A forward-thinking educational campus designed with a bold, contemporary aesthetic. The dynamic facade combines clean white geometries with vibrant accents of blue, yellow, and red—fostering dynamic learning environments and collaborative spaces.",
    link: "/schooldetails",
    img: school,
  },
  {
    title: "Henok T. Residence",
    content:
      "A sophisticated B+G+2+T residential sanctuary defined by clean modern lines. The contrasting interplay between textured dark brick and smooth white surfaces creates an expressive facade, complemented by rhythmic vertical apertures and floating balconies.",
    link: "/henok-t-residence",
    img: henok,
  },
];

const BlogPost = () => {
  const navigate = useNavigate();
  const sectionRefs = useRef([]);
  const imageRefs = useRef([]);

  const handleReadMore = (link) => {
    window.scrollTo(0, 0);
    navigate(link);
  };

  // Parallax scroll calculation for project images
  const handleScroll = useCallback(() => {
    const windowHeight = window.innerHeight;

    sectionRefs.current.forEach((section, index) => {
      const img = imageRefs.current[index];
      if (!section || !img) return;

      const rect = section.getBoundingClientRect();
      if (rect.bottom > -100 && rect.top < windowHeight + 100) {
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = windowHeight / 2;
        const progress = (sectionCenter - viewportCenter) / windowHeight;
        // Balanced parallax travel for lengthened image frames
        const translateY = progress * 55;
        img.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0) scale(1.16)`;
      }
    });
  }, []);

  useEffect(() => {
    let animationFrameId;

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(handleScroll);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    onScroll();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [handleScroll]);

  return (
    <article className="w-full font-montserrat">
      {/* Projects List with Alternating #01263D and White backgrounds */}
      <div className="w-full">
        {blogPosts.map((project, index) => {
          const isDark = index % 2 === 0;

          return (
            <section
              key={project.title}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
              className={`w-full py-12 sm:py-16 lg:py-20 xl:py-24 transition-colors duration-500 rounded-none ${
                isDark
                  ? "bg-[#01263D] text-white"
                  : "bg-white text-neutral-900"
              }`}
            >
              {/* Full stretch aligned with navbar padding px-3 sm:px-6 md:px-8 lg:px-10 */}
              <div className="w-full px-3 sm:px-6 md:px-8 lg:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-start">
                  {/* Left Column: Top-left text placement */}
                  <div className="lg:col-span-5 flex flex-col items-start justify-start pt-1 font-montserrat order-2 lg:order-1">
                    {/* Project Title */}
                    <h2
                      className={`font-montserrat font-bold text-2xl sm:text-3xl lg:text-[2.2rem] uppercase tracking-tight leading-[1.12] mb-4 sm:mb-5 ${
                        isDark ? "text-white" : "text-[#01263D]"
                      }`}
                    >
                      {project.title}
                    </h2>

                    {/* Project Description (Existing Montserrat font, clean & readable) */}
                    <p
                      className={`font-montserrat text-xs sm:text-sm lg:text-[14.5px] leading-relaxed sm:leading-[1.8] font-normal max-w-lg mb-6 sm:mb-8 ${
                        isDark ? "text-neutral-300" : "text-neutral-600"
                      }`}
                    >
                      {project.content}
                    </p>

                    {/* Rectangular Action Button: #FF4C1D bg, white text, no border radius */}
                    <button
                      onClick={() => handleReadMore(project.link)}
                      className="bg-[#FF4C1D] text-white font-montserrat font-semibold text-xs tracking-[0.2em] uppercase px-7 py-3 sm:px-8 sm:py-3.5 transition-all duration-300 hover:bg-[#e03d10] active:scale-95 inline-flex items-center justify-center cursor-pointer rounded-none border-0"
                    >
                      Discover
                    </button>
                  </div>

                  {/* Right Column: Lengthened Project Image with Parallax */}
                  <div
                    onClick={() => handleReadMore(project.link)}
                    className="lg:col-span-7 w-full overflow-hidden rounded-none cursor-pointer group order-1 lg:order-2"
                  >
                    <div className="relative w-full h-[280px] sm:h-[360px] md:h-[420px] lg:h-[460px] xl:h-[490px] overflow-hidden bg-neutral-900 rounded-none shadow-sm">
                      <img
                        ref={(el) => {
                          imageRefs.current[index] = el;
                        }}
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover object-center select-none will-change-transform rounded-none transition-transform duration-75 ease-out"
                        style={{
                          transform: "translate3d(0, 0, 0) scale(1.16)",
                        }}
                        loading="lazy"
                      />
                      {/* Subtle hover overlay */}
                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-none" />
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </article>
  );
};

export default BlogPost;
