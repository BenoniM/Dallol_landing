import eyes from "../../assets/icon/eyes.svg";
import target from "../../assets/icon/ourmission.svg";

const Mission = () => {
  return (
    <article className="px-[2%] py-5 relative flex gap-16">
      <section className="flex flex-col w-[34%] mt-0">
        <div className="flex flex-row items-center gap-5">
          <img src={eyes} alt="Vision Icon" className="w-10 h-10" />
          <h1 className="text-primary font-bold">Our Vision</h1>
        </div>
        <p className="mt-3">
          To be regarded as a respected international Design and Build firm that
          delivers concerted, responsive, and accessible expertise.
        </p>
      </section>

      <section className="flex flex-col w-[30%] mt-10">
        <div className="flex flex-row items-center gap-">
          <img src={target} alt="Mission Icon" className="w-10 h-10" />
          <h1 className="text-primary font-bold">Our Mission</h1>
        </div>
        <p className="mt-3">
          To deliver quality-driven design and engineering services that foster
          dynamic and innovative architecture, ensuring every project meets the
          highest standards of excellence and creativity.
        </p>
      </section>

      <section className="flex flex-col w-[30%] mt-20">
        <div className="flex flex-row items-center gap-5">
          <img src={eyes} alt="Values Icon" className="w-10 h-10" />
          <h1 className="text-primary font-bold">Our Values</h1>
        </div>
        <p className="mt-3">
          At Dallol Design Build, we are committed to excellence, innovation,
          and integrity in everything we do. We believe in delivering solutions
          that not only meet our clients' needs but also inspire through
          sustainable practices, precise execution, and a collaborative approach
          that ensures quality at every project stage.
        </p>
      </section>
    </article>
  );
};

export default Mission;
