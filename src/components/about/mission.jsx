import eyes from "../../assets/icon/eyes.svg";
import target from "../../assets/icon/ourmission.svg";

const Mission = () => {
  return (
    <article className="lg:px-[2%] px-[5%] py-5 pt-20 relative flex flex-col lg:flex-row lg:gap-16 ">
      {/* Vision Section */}
      <section className="flex flex-col w-full lg:w-[30%] mt-0">
        <div className="flex  items-center gap-5">
          <img src={eyes} alt="Vision Icon" className="w-16 h-16 pt-4" />
          <h1 className="text-primary text-3xl font-bold">Our Vision</h1>
        </div>
        <p className="mt-3 text-base lg:text-lg text-justify">
          To be regarded as a respected international Design and Build firm that
          delivers concerted, responsive, and accessible expertise.
        </p>
      </section>

      {/* Mission Section */}
      <section className="flex flex-col w-full lg:w-[30%] mt-10 lg:mt-12">
        <div className="flex items-center gap-5">
          <img src={target} alt="Mission Icon" className="w-12 h-12" />
          <h1 className="text-primary text-3xl font-bold">Our Mission</h1>
        </div>
        <p className="mt-3 text-base text-justify lg:text-lg">
          To deliver quality-driven design and engineering services that foster
          dynamic and innovative architecture, ensuring every project meets the
          highest standards of excellence and creativity.
        </p>
      </section>

      {/* Values Section */}
      <section className="flex flex-col w-full lg:w-[30%] mt-20 lg:mt-16">
        <div className="flex items-center gap-5">
          <img src={eyes} alt="Values Icon" className="w-16 h-16 pt-3" />
          <h1 className="text-primary text-3xl font-bold">Our Values</h1>
        </div>
        <p className="mt-3 text-base text-justify lg:text-lg">
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
