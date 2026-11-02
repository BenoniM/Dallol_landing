import { ErrorMessage, Field, Formik } from "formik";
import { useEffect, useRef } from "react";
import * as Yup from "yup";
import Map from "./map";

// import Map from "../map";

const API_URL = import.meta.env.VITE_BACKEND_URL;

const ContactUs = () => {
  const form = {
    name: "",
    email: "",
    subject: "",
    body: "",
    phone: "",
  };

  const ContactSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    subject: Yup.string().required("Subject is required"),
    body: Yup.string().required("Message is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const onSubmit = async (values, { resetForm }) => {
    console.log("submitted", values);
    try {
      const res = await fetch(`${API_URL}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("Response:", res);

      if (res.redirected) {
        console.error("Redirect occurred:", res.url);
      }

      if (res.ok) {
        const data = await res.json();

        if (data.success) {
          alert("Message sent successfully");
          resetForm();
        } else {
          alert("Message failed to send");
        }
      } else {
        const text = await res.text();
        throw new Error(`Server returned status ${res.status}: ${text}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while sending the message");
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      const bg = bgRef.current;
      if (!section || !bg) return;
      const rect = section.getBoundingClientRect();
      // Progress from -1 (section below viewport) to 1 (section above viewport)
      const progress =
        (window.innerHeight / 2 - (rect.top + rect.height / 2)) /
        (window.innerHeight / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      bg.style.transform = `translate3d(0, ${clamped * rect.height * 0.15}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const labelClass =
    "block text-xs sm:text-sm font-medium tracking-[0.12em] uppercase text-[#0B2545]";
  const inputClass =
    "w-full bg-transparent px-4 py-3 text-base sm:text-lg text-gray-800 placeholder:text-gray-500 border-b border-gray-300 focus:outline-none focus:border-[#0B2545] transition-colors";

  const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
    { name: "email", label: "Email", type: "email", placeholder: "Enter your email address" },
    { name: "phone", label: "Phone", type: "tel", placeholder: "Enter your phone number" },
    { name: "subject", label: "Subject", type: "text", placeholder: "What is this about?" },
  ];

  return (
    <article className="font-montserrat flex flex-col items-center overflow-hidden">
      {/* Form Section */}
      <section
        id="contact-form"
        ref={sectionRef}
        className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-4 py-16"
      >
        {/* Parallax background */}
        <div
          ref={bgRef}
          aria-hidden="true"
          className="absolute inset-x-0 -top-[20%] h-[140%] bg-cover bg-center will-change-transform"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/6614757/pexels-photo-6614757.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          }}
        />
        <div className="relative w-full max-w-2xl bg-white px-6 py-10 sm:px-12 sm:py-14 shadow-2xl">
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight text-black mb-10">
            Send an Inquiry
          </h2>

          <Formik
            initialValues={form}
            validationSchema={ContactSchema}
            onSubmit={onSubmit}
          >
            {({ handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit} className="space-y-8">
                {fields.map((f) => (
                  <div key={f.name}>
                    <label htmlFor={f.name} className={labelClass}>
                      {f.label}
                    </label>
                    <Field
                      id={f.name}
                      type={f.type}
                      name={f.name}
                      placeholder={f.placeholder}
                      className={inputClass}
                    />
                    <ErrorMessage
                      name={f.name}
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                ))}

                <div>
                  <label htmlFor="body" className={labelClass}>
                    Message
                  </label>
                  <Field
                    id="body"
                    as="textarea"
                    name="body"
                    rows="3"
                    placeholder="Tell us about your project"
                    className={`${inputClass} resize-none`}
                  />
                  <ErrorMessage
                    name="body"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-4 rounded-full bg-[#FF4C1D] px-8 py-3 text-lg font-medium text-white transition hover:brightness-110 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </form>
            )}
          </Formik>
        </div>
      </section>

      {/* Map Section */}
      <section className="w-full bg-white text-[#00040D] px-3 sm:px-6 md:px-8 lg:px-10 py-10 md:py-14">
        <h2 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight mb-6 md:mb-8">
          Based in Addis Ababa, <span className="text-[#FF4C1D]">Ethiopia</span>
        </h2>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          <div className="flex-1 border border-[#00040D]/20 overflow-hidden">
            <Map />
          </div>

          <aside className="lg:w-72 space-y-6">
            {[
              { title: "Head Office", lines: ["Addis Ababa", "Ethiopia"] },
              {
                title: "Email",
                lines: ["info@dallolconsult.com"],
                href: "mailto:info@dallolconsult.com",
              },
              {
                title: "Phone",
                lines: ["+251 911 606 260"],
                href: "tel:+251911606260",
              },
            ].map((item) => (
              <div key={item.title}>
                <h3 className={labelClass}>{item.title}</h3>
                <div className="mt-3 text-base sm:text-lg text-gray-700 leading-snug">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-[#FF4C1D] transition-colors break-all"
                    >
                      {item.lines[0]}
                    </a>
                  ) : (
                    item.lines.map((line) => <p key={line}>{line}</p>)
                  )}
                </div>
              </div>
            ))}
          </aside>
        </div>
      </section>
    </article>
  );
};

export default ContactUs;
