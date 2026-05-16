import {
  useEffect,
  useState,
} from "react";

import { useTranslation } from "react-i18next";

import API from "../../services/api";

export default function Hero() {

  const { t, i18n } =
    useTranslation();

  const isArabic =
    i18n.language === "ar";

  const [heroContent, setHeroContent] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchHeroContent();

  }, []);

  const fetchHeroContent = async () => {

    try {

      setLoading(true);

      const response =
        await API.get(
          "http://localhost:5000/api/hero"
        );

      setHeroContent(
        response.data
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  if (loading) {

    return (

      <section className="min-h-screen bg-[#081120] flex items-center justify-center text-white">

        <div className="text-center">

          <h2 className="text-3xl font-bold text-orange-400 mb-4">

            Loading Hero...

          </h2>

          <p className="text-gray-400">

            Please wait...

          </p>

        </div>

      </section>

    );

  }

  return (

    <section
      className="relative min-h-screen bg-cover bg-center flex items-center pt-44 overflow-hidden transition-all duration-1000"
      style={{

        backgroundImage:

          `url(${

            heroContent?.background_image ||

            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"

          })`,

      }}
    >

      {/* OVERLAY */}

      <div className="absolute inset-0 bg-black/60"></div>

      {/* GLOW */}

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[#081120]/90 via-[#081120]/40 to-transparent"></div>

      {/* CONTENT */}

      <div className="relative z-10 max-w-[1800px] mx-auto px-8 w-full">

        <div className="grid lg:grid-cols-2 gap-24 items-center">

          {/* LEFT */}

          <div className={

            isArabic
              ? "text-right"
              : "text-left"

          }>

            {/* BADGE */}

            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full px-5 py-3 mb-8">

              <div className="flex text-orange-400">

                ★★★★★

              </div>

              <p className="text-sm text-gray-200">

                {t("trustedTravelers")}

              </p>

            </div>

            {/* TITLE */}

            <h1 className="text-6xl md:text-7xl md:text-7xl lg:text-8xl font-black leading-[1.05] mb-8 max-w-4xl">

              <span className="text-white">

                {heroContent?.title}

              </span>

            </h1>

            {/* SUBTITLE */}

            <h2 className="text-orange-400 text-2xl md:text-3xl font-bold mb-8">

              {heroContent?.subtitle}

            </h2>

            {/* DESCRIPTION */}

            <p className="text-base md:text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl">

              {heroContent?.description}

            </p>

            {/* BUTTONS */}

            <div className={`flex flex-wrap gap-5 mb-16 ${

              isArabic
                ? "justify-end"
                : ""

            }`}>

              <button className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-full font-semibold text-lg shadow-2xl shadow-orange-500/30">

                Explore Tours

              </button>

              <button className="border border-white/20 hover:bg-white/10 transition px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-xl">

                {t("watchVideo")}

              </button>

            </div>

            {/* STATS */}

            <div className="grid grid-cols-2 md:flex gap-8 md:gap-10">

              <div>

                <h2 className="text-3xl md:text-4xl font-bold text-orange-400">

                  10K+

                </h2>

                <p className="text-gray-300">

                  {t("happyTravelers")}

                </p>

              </div>

              <div>

                <h2 className="text-3xl md:text-4xl font-bold text-orange-400">

                  50+

                </h2>

                <p className="text-gray-300">

                  {t("luxuryTours")}

                </p>

              </div>

              <div>

                <h2 className="text-3xl md:text-4xl font-bold text-orange-400">

                  24/7

                </h2>

                <p className="text-gray-300">

                  {t("vipSupport")}

                </p>

              </div>

            </div>

          </div>

          {/* RIGHT CARD */}

          <div className="relative hidden lg:flex justify-end">

            <div className="w-[450px] bg-white/10 backdrop-blur-2xl border border-white/10 rounded-[30px] overflow-hidden shadow-2xl">

              {/* IMAGE */}

              <img
                src={

                  heroContent?.featured_image ||

                  "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=2070&auto=format&fit=crop"

                }
                alt="tour"
                className="w-full h-[320px] object-cover"
              />

              {/* CONTENT */}

              <div className="p-8">

                <div className="flex items-center justify-between mb-5">

                  <span className="bg-orange-500 text-white text-xs px-4 py-2 rounded-full">

                    {t("bestSeller")}

                  </span>

                  <span className="text-gray-300 text-sm">

                    {heroContent?.featured_duration}

                  </span>

                </div>

                <h3 className="text-3xl font-bold mb-4">

                  {heroContent?.featured_title}

                </h3>

                <p className="text-gray-300 mb-8 leading-relaxed">

                  Luxury beach escapes and unforgettable island adventures.

                </p>

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-gray-400 text-sm">

                      {t("startingFrom")}

                    </p>

                    <h2 className="text-4xl font-bold text-orange-400">

                      {heroContent?.featured_price}

                    </h2>

                  </div>

                  <button className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-full font-semibold">

                    {t("bookNow")}

                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>

  );

}