import img1 from "../../assets/img/clint/Africanunion.svg";
import img2 from "../../assets/img/clint/bunnabank.svg";
import img3 from "../../assets/img/clint/dashenbank.svg";
import img4 from "../../assets/img/clint/Dede.svg";
import img5 from "../../assets/img/clint/Dembesh.svg";
import img6 from "../../assets/img/clint/Drogapharma.svg";
import img7 from "../../assets/img/clint/ElilitaInv.svg";
import img8 from "../../assets/img/clint/airlines.svg";
import img9 from "../../assets/img/clint/ethiopianheritageauthority.svg";
import img10 from "../../assets/img/clint/fujitacorporation.svg";
import img11 from "../../assets/img/clint/gergesenon.svg";
import img12 from "../../assets/img/clint/giz.svg";
import img13 from "../../assets/img/clint/Housindevelopmentcorporation.svg";
import img14 from "../../assets/img/clint/MKC.svg";
import img15 from "../../assets/img/clint/NIBINSURANCE.svg";
import img16 from "../../assets/img/clint/Redcross.svg";
import img17 from "../../assets/img/clint/SchoolofTmrw.svg";
import img18 from "../../assets/img/clint/ThePharofoundation.svg";
import img19 from "../../assets/img/clint/Timex.svg";
import img20 from "../../assets/img/clint/TranzitHotel.svg";
import img21 from "../../assets/img/clint/TrustPharma.svg";
import img22 from "../../assets/img/clint/Vayo.svg";
import img23 from "../../assets/img/clint/Waliya.svg";
import img24 from "../../assets/img/clint/YekaSubcityAdministration.svg";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
  img17,
  img18,
  img19,
  img20,
  img21,
  img22,
  img23,
  img24,
];

const Carousel = () => {
  return (
    <article className="carousel-container bg-white py-10 md:py-14 lg:py-16 overflow-hidden">
      <section className="carousel">
        <div className="carousel-track items-center gap-x-12 md:gap-x-16 lg:gap-x-20">
          {Array(8)
            .fill(images)
            .flat()
            .map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`partner logo ${index + 1}`}
                className="carousel-logo h-[32px] sm:h-[36px] md:h-[38px] lg:h-[42px] max-w-none object-contain shrink-0 cursor-pointer grayscale opacity-70 hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-300"
              />
            ))}
        </div>
      </section>
    </article>
  );
};

export default Carousel;
