import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/images/logo.png";

import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {

  const { t } = useTranslation();

  return (
    <footer className="bg-[#06101d] text-white pt-24 pb-10 px-6 border-t border-white/10">

      <div className="max-w-7xl mx-auto">

        {/* TOP */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-14 mb-20">

          {/* COMPANY */}
          <div>

            <img
              src={logo}
              alt="Zanzibreeze Tours & Safari"
              className="h-16 mb-6"
            />

            <p className="text-gray-400 leading-9 text-lg mb-8 max-w-[320px]">

  Zanzibreeze Tours & Safari creates unforgettable luxury travel experiences across Zanzibar and Tanzania with premium safaris, ocean adventures, VIP transfers, and world-class hospitality.

</p>

            <div className="flex items-center gap-4">

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <FaFacebookF />
              </a>

              <a
                href="#"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orange-500 transition"
              >
                <FaInstagram />
              </a>

              <a
                href="https://wa.me/255625996460"
                target="_blank"
                rel="noreferrer"
                className="w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-green-500 transition"
              >
                <FaWhatsapp />
              </a>

            </div>

          </div>

          {/* QUICK LINKS */}
          <div>

            <h3 className="text-2xl font-bold mb-8">
              {t("quickLinks")}
            </h3>

            <div className="flex flex-col gap-5 text-gray-400">

              <Link to="/" className="hover:text-orange-400 transition">
                {t("home")}
              </Link>

              <Link to="/about" className="hover:text-orange-400 transition">
                {t("about")}
              </Link>

              <Link to="/destinations" className="hover:text-orange-400 transition">
                {t("destinations")}
              </Link>

              <Link to="/gallery" className="hover:text-orange-400 transition">
                {t("gallery")}
              </Link>

              <Link to="/blog" className="hover:text-orange-400 transition">
                {t("blog")}
              </Link>

              <Link to="/contact" className="hover:text-orange-400 transition">
                {t("contact")}
              </Link>

            </div>

          </div>

          {/* TOURS */}
          <div>

            <h3 className="text-2xl font-bold mb-8">
              {t("tours")}
            </h3>

            <div className="flex flex-col gap-5 text-gray-400">

              <Link
                to="/zanzibar-excursions"
                className="hover:text-orange-400 transition"
              >
                {t("zanzibarExcursions")}
              </Link>

              <Link
                to="/tanzania-safaris"
                className="hover:text-orange-400 transition"
              >
                {t("tanzaniaSafaris")}
              </Link>

              <Link
                to="/water-sports"
                className="hover:text-orange-400 transition"
              >
                {t("waterSports")}
              </Link>

              <Link
                to="/vip-transfers"
                className="hover:text-orange-400 transition"
              >
                {t("vipTransfers")}
              </Link>

              <Link
                to="/honeymoon-packages"
                className="hover:text-orange-400 transition"
              >
                {t("honeymoonPackages")}
              </Link>

            </div>

          </div>

          {/* CONTACT */}
          <div>

            <h3 className="text-2xl font-bold mb-8">
              {t("contactInfo")}
            </h3>

            <div className="space-y-6 text-gray-400">

              <div className="flex items-start gap-4">

                <FaPhoneAlt className="text-orange-400 mt-1" />

                <p>
                  +255 625 996 460
                </p>

              </div>

              <div className="flex items-start gap-4">

                <FaEnvelope className="text-orange-400 mt-1" />

                <p>
                  info@zanzibreezetours.com
                </p>

              </div>

              <div className="flex items-start gap-4">

                <FaMapMarkerAlt className="text-orange-400 mt-1" />

                <p>
                  Zanzibar, Tanzania
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* BOTTOM */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-5">

          <p className="text-gray-500 text-center md:text-left">
            © 2026  Zanzibreeze Tours & Safari. {t("allRightsReserved")}
          </p>

          <div className="flex items-center gap-6 text-gray-500">

            <button className="hover:text-orange-400 transition">
              {t("privacyPolicy")}
            </button>

            <button className="hover:text-orange-400 transition">
              {t("termsConditions")}
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
}