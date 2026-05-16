import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Navbar() {

  const { t } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [tourDropdown, setTourDropdown] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();

  useEffect(() => {

    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  const navLinks = [
    { name: t("home"), path: "/" },
    { name: t("about"), path: "/about" },
    { name: t("destinations"), path: "/destinations" },
    { name: t("gallery"), path: "/gallery" },
    { name: t("Services"), path: "/services" },
    { name: t("contact"), path: "/contact" },
  ];

  return (
    <>
      {/* TOP BAR */}
      <div className="hidden lg:flex items-center justify-between px-10 py-3 bg-[#06101d] border-b border-white/10 text-sm">

        <div className="flex items-center gap-6 text-gray-300">

          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-orange-400" />
            <span>+255 625 996 460</span>
          </div>

          <div className="flex items-center gap-2">
            <FaEnvelope className="text-orange-400" />
            <span>info@summerbreeze.com</span>
          </div>

        </div>

        <div className="flex items-center gap-4 text-gray-300">

          <a href="#" className="hover:text-orange-400 transition">
            <FaInstagram />
          </a>

          <a href="#" className="hover:text-orange-400 transition">
            <FaFacebookF />
          </a>

          <LanguageSwitcher />

        </div>

      </div>

      {/* MAIN NAVBAR */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#081120]/95 backdrop-blur-xl shadow-2xl"
            : "bg-[#081120]/90 backdrop-blur-xl"
        }`}
      >

        <div className="max-w-[1700px] mx-auto px-6 lg:px-10 h-[95px] flex items-center justify-between">

          {/* LOGO */}
          <Link to="/" className="flex items-center">

           <img
  src={logo}
  alt="Zanzibreeze Tours & Safari"
  className="h-35 w-auto object-contain"
/>

          </Link>

          {/* DESKTOP MENU */}
          <nav className="hidden lg:flex items-center gap-8 font-medium ml-20">

            {navLinks.map((link) => (

              <Link
                key={link.name}
                to={link.path}
                className={`transition duration-300 hover:text-orange-400 ${
                  location.pathname === link.path
                    ? "text-orange-400"
                    : "text-white"
                }`}
              >
                {link.name}
              </Link>

            ))}

            {/* TOURS DROPDOWN */}
            <div
              className="relative flex items-center h-[95px]"
              onMouseEnter={() => setTourDropdown(true)}
              onMouseLeave={() => setTourDropdown(false)}
            >

              <button className="flex items-center gap-2 hover:text-orange-400 transition text-white h-full">

                {t("tours")}

                <FaChevronDown className="text-xs" />

              </button>

              <div
                className={`absolute top-full left-0 w-[380px] pt-2 transition-all duration-300 ${
                  tourDropdown
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
              >

                <div className="bg-[#0b1727]/95 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

                  <Link
                    to="/zanzibar-excursions"
                    className="flex items-center gap-4 px-6 py-5 hover:bg-white/5 transition border-b border-white/5"
                  >

                    <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 text-xl">
                      🏝
                    </div>

                    <div>

                      <h3 className="font-semibold">
                        Zanzibar Excursions
                      </h3>

                      <p className="text-sm text-gray-400">
                        Island adventures & beach tours
                      </p>

                    </div>

                  </Link>

                  <Link
                    to="/tanzania-safaris"
                    className="flex items-center gap-4 px-6 py-5 hover:bg-white/5 transition border-b border-white/5"
                  >

                    <div className="w-14 h-14 rounded-2xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-xl">
                      🦁
                    </div>

                    <div>

                      <h3 className="font-semibold">
                        Tanzania Safaris
                      </h3>

                      <p className="text-sm text-gray-400">
                        Wildlife & national parks
                      </p>

                    </div>

                  </Link>

                  <Link
                    to="/water-sports"
                    className="flex items-center gap-4 px-6 py-5 hover:bg-white/5 transition border-b border-white/5"
                  >

                    <div className="w-14 h-14 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-400 text-xl">
                      🌊
                    </div>

                    <div>

                      <h3 className="font-semibold">
                        Water Sports
                      </h3>

                      <p className="text-sm text-gray-400">
                        Jetski, snorkeling & kayaking
                      </p>

                    </div>

                  </Link>

                  <Link
                    to="/vip-transfers"
                    className="flex items-center gap-4 px-6 py-5 hover:bg-white/5 transition border-b border-white/5"
                  >

                    <div className="w-14 h-14 rounded-2xl bg-green-500/20 flex items-center justify-center text-green-400 text-xl">
                      🚐
                    </div>

                    <div>

                      <h3 className="font-semibold">
                        VIP Transfers
                      </h3>

                      <p className="text-sm text-gray-400">
                        Airport & luxury transportation
                      </p>

                    </div>

                  </Link>

                  <Link
                    to="/honeymoon-packages"
                    className="flex items-center gap-4 px-6 py-5 hover:bg-white/5 transition"
                  >

                    <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center text-pink-400 text-xl">
                      💎
                    </div>

                    <div>

                      <h3 className="font-semibold">
                        Honeymoon Packages
                      </h3>

                      <p className="text-sm text-gray-400">
                        Romantic luxury experiences
                      </p>

                    </div>

                  </Link>

                </div>

              </div>

            </div>

          </nav>

          {/* RIGHT SIDE */}
          <div className="hidden lg:flex items-center gap-4">

            <a
              href="https://wa.me/255625996460"
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center hover:scale-110 transition duration-300 shadow-lg"
            >
              <FaWhatsapp />
            </a>

            <Link
              to="/booking"
              className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-semibold transition duration-300 shadow-lg shadow-orange-500/20"
            >
              {t("bookNow")}
            </Link>

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-2xl text-white"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </div>

        {/* MOBILE MENU */}
        {menuOpen && (

          <div className="lg:hidden bg-[#081120] border-t border-white/10 px-6 py-6 space-y-5">

            <Link
              to="/"
              className="block hover:text-orange-400"
              onClick={() => setMenuOpen(false)}
            >
              {t("home")}
            </Link>

            <Link
              to="/zanzibar-excursions"
              className="block hover:text-orange-400"
              onClick={() => setMenuOpen(false)}
            >
              Zanzibar Excursions
            </Link>

            <Link
              to="/tanzania-safaris"
              className="block hover:text-orange-400"
              onClick={() => setMenuOpen(false)}
            >
              Tanzania Safaris
            </Link>

            <Link
              to="/water-sports"
              className="block hover:text-orange-400"
              onClick={() => setMenuOpen(false)}
            >
              Water Sports
            </Link>

            <Link
              to="/vip-transfers"
              className="block hover:text-orange-400"
              onClick={() => setMenuOpen(false)}
            >
              VIP Transfers
            </Link>

            <Link
              to="/honeymoon-packages"
              className="block hover:text-orange-400"
              onClick={() => setMenuOpen(false)}
            >
              Honeymoon Packages
            </Link>

            <Link
              to="/gallery"
              className="block hover:text-orange-400"
              onClick={() => setMenuOpen(false)}
            >
              {t("gallery")}
            </Link>

            <Link
              to="/services"
              className="block hover:text-orange-400"
              onClick={() => setMenuOpen(false)}
            >
              {t("services")}
            </Link>

            <Link
              to="/contact"
              className="block hover:text-orange-400"
              onClick={() => setMenuOpen(false)}
            >
              {t("contact")}
            </Link>

            <Link
              to="/booking"
              className="block bg-orange-500 text-center py-3 rounded-full font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              {t("bookNow")}
            </Link>

          </div>

        )}

      </header>
    </>
  );
}