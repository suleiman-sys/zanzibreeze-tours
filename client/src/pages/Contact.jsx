import { useState } from "react";
import axios from "axios";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaClock,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";

export default function Contact() {

  const [formData, setFormData] = useState({

    fullName: "",
    email: "",
    subject: "",
    message: "",

  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "http://localhost:5000/api/contacts",

        formData

      );

      setSuccessMessage(response.data.message);

      setFormData({

        fullName: "",
        email: "",
        subject: "",
        message: "",

      });

    } catch (error) {

      console.log(error);

      alert("Message failed");

    }

  };

  return (
    <section className="bg-[#081120] text-white min-h-screen pt-40 pb-24 overflow-hidden">

      {/* HERO */}
      <div className="relative px-6 mb-32">

        <div className="absolute inset-0 opacity-10">

          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500 blur-[180px] rounded-full"></div>

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500 blur-[180px] rounded-full"></div>

        </div>

        <div className="max-w-7xl mx-auto relative z-10 text-center">

          <p className="text-orange-400 uppercase tracking-[6px] mb-6 font-semibold">
            Contact Us
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">

            Let’s Plan Your
            <span className="text-orange-400">
              {" "}Dream Vacation
            </span>

          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">

            Contact Summer Breeze Tours & Travel for luxury tours,
            safari adventures, airport transfers, honeymoon packages,
            and unforgettable Zanzibar experiences.

          </p>

        </div>

      </div>

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

        {/* LEFT SIDE */}
        <div>

          {/* CONTACT CARDS */}
          <div className="space-y-8 mb-12">

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl flex gap-6 items-start">

              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-2xl">
                <FaPhoneAlt />
              </div>

              <div>

                <h3 className="text-2xl font-black mb-3">
                  Call Us
                </h3>

                <p className="text-gray-400 text-lg">
                  +255 625 996 460
                </p>

              </div>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl flex gap-6 items-start">

              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-2xl">
                <FaWhatsapp />
              </div>

              <div>

                <h3 className="text-2xl font-black mb-3">
                  WhatsApp
                </h3>

                <a
                  href="https://wa.me/255625996460"
                  target="_blank"
                  rel="noreferrer"
                  className="text-green-400 text-lg hover:underline"
                >
                  Chat With Us Instantly
                </a>

              </div>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl flex gap-6 items-start">

              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-2xl">
                <FaEnvelope />
              </div>

              <div>

                <h3 className="text-2xl font-black mb-3">
                  Email Address
                </h3>

                <p className="text-gray-400 text-lg">
                  summerbreezetours@gmail.com
                </p>

              </div>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl flex gap-6 items-start">

              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-2xl">
                <FaMapMarkerAlt />
              </div>

              <div>

                <h3 className="text-2xl font-black mb-3">
                  Office Location
                </h3>

                <p className="text-gray-400 text-lg">
                  Stone Town, Zanzibar, Tanzania
                </p>

              </div>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl flex gap-6 items-start">

              <div className="w-16 h-16 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-2xl">
                <FaClock />
              </div>

              <div>

                <h3 className="text-2xl font-black mb-3">
                  Working Hours
                </h3>

                <p className="text-gray-400 text-lg">
                  Monday - Sunday : 24/7 Available
                </p>

              </div>

            </div>

          </div>

          {/* SOCIALS */}
          <div className="flex gap-5">

            <a
              href="#"
              className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 transition text-xl"
            >
              <FaInstagram />
            </a>

            <a
              href="#"
              className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 transition text-xl"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://wa.me/255625996460"
              target="_blank"
              rel="noreferrer"
              className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500 transition text-xl"
            >
              <FaWhatsapp />
            </a>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div>

          {/* SUCCESS */}
          {successMessage && (

            <div className="bg-green-500/20 border border-green-500 text-green-300 p-5 rounded-2xl mb-8 text-center font-semibold">

              {successMessage}

            </div>

          )}

          {/* FORM */}
          <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-2xl shadow-2xl mb-10">

            <h2 className="text-4xl font-black mb-10">
              Send Us A Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              <div>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Your Full Name"
                  className="w-full bg-[#0d1726] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
                  required
                />

              </div>

              <div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email Address"
                  className="w-full bg-[#0d1726] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
                  required
                />

              </div>

              <div>

                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                  className="w-full bg-[#0d1726] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
                  required
                />

              </div>

              <div>

                <textarea
                  rows="6"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message..."
                  className="w-full bg-[#0d1726] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
                  required
                ></textarea>

              </div>

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl font-semibold text-lg shadow-lg shadow-orange-500/30"
              >
                Send Message
              </button>

            </form>

          </div>

          {/* MAP */}
          <div className="rounded-[40px] overflow-hidden border border-white/10 shadow-2xl h-[400px]">

            <iframe
              src="https://www.google.com/maps?q=Stone+Town+Zanzibar&output=embed"
              width="100%"
              height="100%"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Zanzibar Map"
              className="border-0"
            ></iframe>

          </div>

        </div>

      </div>

    </section>
  );
}