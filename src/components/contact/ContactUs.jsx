import { ErrorMessage, Field, Formik } from "formik";
import { useEffect } from "react";
import office from "../../assets/icon/office.svg";
import email from "../../assets/icon/email.svg";
import phone from "../../assets/icon/phone.svg";
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

  return (
    <article
      id="Hero-section"
      className="py-0 mt-7 sm:mt-0 font-montserrat flex flex-col items-center overflow-hidden "
      style={{
        // backgroundImage: `url(${BG})`,
        backgroundSize: "100% 69%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <section className="space-y-8 px-2 md:px-[10%] ">
        <section className="flex flex-col md:flex-row items-start gap-10">
          {/* Left Section: Contact Information */}
          <main className="bg-secondary text-white flex flex-col items-center justify-center rounded-3xl w-full md:w-1/2 p-5 space-y-10 bg-primary">
            <div className="flex flex-col w-full items-start">
              <h1 className="text-xl font-light">Get in Touch</h1>
              <p className="text-start text-3xl lg:w-full w-[88%] mb-7 mt-3 font-bold">
                We’re Eager to Assist with Your Architectural Dreams
              </p>
            </div>

            {/* Contact Details Section */}
            <section className="grid grid-cols-2 md:grid-cols-2 gap-10 mt-5 text-sm ">
              <div className="flex flex-col gap-2 ">
                <div className="mb-5 f">
                  <div className="flex flex-row items-center text-xl font-bold mb-5 gap-5">
                    <img src={office} alt="" className="w-16 h-16" />
                    <div className="flex flex-col items-start">
                      <h1>Our Office</h1>
                      <h1 className="font-light">Addis Ababa,Ethiopia</h1>
                    </div>
                  </div>
                  <div className="flex flex-row items-center text-xl font-bold mb-5 gap-5">
                    <img src={email} alt="" className="w-16 h-16" />
                    <div className="flex flex-col items-start">
                      <h1>Contact Email</h1>
                      <h1 className="font-light">info@dallolconsult.com</h1>
                    </div>
                  </div>
                  <div className="flex flex-row items-center text-xl font-bold mb-5 gap-5">
                    <img src={phone} alt="" className="w-16 h-16" />
                    <div className="flex flex-col items-start">
                      <h1>Phone Number</h1>
                      <h1 className="font-light">+251911606260</h1>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>

          {/* Right Section: Form */}
          <div className="w-full md:w-1/2 rounded-2xl p-2">
            <Formik
              initialValues={form}
              validationSchema={ContactSchema}
              onSubmit={onSubmit} // This will now properly handle form submission
            >
              {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-8">
                    <div className="flex flex-row items-center justify-center gap-3">
                      <Field
                        type="text"
                        name="name"
                        placeholder="First Name"
                        className="w-full p-2 border rounded-full  focus:outline-none focus:border-[#259925b4]"
                        required
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-secondary"
                      />
                      <Field
                        type="text"
                        name="name"
                        placeholder="Last Name"
                        className="w-full p-2 border rounded-full  focus:outline-none focus:border-[#259925b4]"
                        required
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-secondary"
                      />
                    </div>

                    <div className="flex flex-row items-center justify-center gap-3">
                      <Field
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full p-2 border rounded-full  focus:outline-none focus:border-[#259925b4]"
                        required
                      />
                      <Field
                        type="phone"
                        name="phone"
                        placeholder="Phone"
                        className="w-full p-2 border rounded-full  focus:outline-none focus:border-[#259925b4]"
                        required
                      />
                    </div>

                    <Field
                      as="textarea"
                      name="body"
                      placeholder="Message"
                      rows="3"
                      className="w-full p-2 border rounded-xl  focus:outline-none focus:border-[#259925b4]"
                      required
                    />
                    <button
                      type="submit"
                      className="w-1/2 py-2 bg-primary text-white rounded-lg mt-4 hover:bg-secondary transition duration-300"
                    >
                      Send Your Inquiry
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </section>
      </section>

      {/* Map Section */}
      <div className="lg:w-full w-[93%] h-auto mt-32 mb-12  overflow-hidden object-cover ">
        <Map />
      </div>
    </article>
  );
};

export default ContactUs;
