import React from "react";
import avatar from "../../assets/img/avatergirl.svg";
import avatar2 from "../../assets/img/avaterman.svg";
import avatar3 from "../../assets/img/avaterchina.svg";

const OurHappyClients = () => {
  return (
    <article className="py-14 px-[5%] font-montserrat">
      {/* Header Section */}
      <section className="flex flex-col items-center justify-center w-full px-6  gap-5">
        <p className="p-2 text-5xl  font-bold w-1/3 text-center px-6">
          Our Happy Clients
        </p>
        <p className="text-center max-w-5xl leading-snug text-gray-400">
          Elevate your project with testimonials from those who have experienced
          the transformative impact of Dallol Consult. Our clients appreciate
          the thoughtful architectural designs that we bring to life, reflecting
          their individual tastes while standing the test of time.
        </p>
      </section>

      {/* Content Section */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 p-5">
        {/* Service Card 1 */}
        <div className="flex flex-col items-start p-6 rounded-3xl transition-transform transform hover:scale-105 duration-500 border shadow-md">
          <div className="flex flex-row items-start gap-5">
            <img src={avatar} alt="Core Icon" className="w-16 h-16" />
            <div className="flex flex-col gap-3 text-[#082D38]">
              <p className="text-sm sm:text-base text-[#082D38] text-justify">
                <h2 className="text-lg font-bold mb-4 text-[#082D38]">
                  Emily Johnson
                </h2>
                “I never imagined my dream home could become a reality until I
                partnered with Dallol Consult. Their attention to detail in
                architectural design created a space that truly feels like
                mine.”
              </p>
            </div>
          </div>
        </div>

        {/* Service Card 2 */}
        <div className="flex flex-col items-start  p-6 rounded-3xl transition-transform transform hover:scale-105 duration-500 border shadow-md">
          <div className="flex flex-row items-start gap-5">
            <img src={avatar2} alt="Vision Icon" className="w-16 h-16" />
            <p className="text-sm sm:text-base text-[#082D38] text-justify">
              <h2 className="text-lg font-bold mb-4 text-[#082D38]">
                David Miller
              </h2>
              “Dallol Consult made navigating the complexities of permit
              preparation a breeze. Their expertise ensured that my renovation
              project moved forward without a hitch, allowing me to focus on my
              vision.”
            </p>
          </div>
        </div>

        {/* Service Card 3 */}
        <div className="flex flex-col items-start p-6 rounded-3xl transition-transform transform hover:scale-105 duration-500 border shadow-md">
          <div className="flex flex-row items-start gap-5">
            <img src={avatar3} alt="Mission Icon" className="w-16 h-16" />
            <p className="text-sm sm:text-base text-[#082D38] text-justify">
              <h2 className="text-lg font-bold mb-4 text-[#082D38]">
                Laura Lee
              </h2>
              “The precision in the 3D modeling service is remarkable. Seeing my
              ideas visualized in such detail before construction gave me the
              confidence to make informed decisions.”
            </p>
          </div>
        </div>
      </section>
    </article>
  );
};

export default OurHappyClients;
