import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";

export default function About() {

  const { t, i18n } = useTranslation();

  const isArabic =
    i18n.language === "ar";

  const [aboutContent, setAboutContent] =
    useState(null);

  useEffect(() => {

    fetchAboutContent();

  }, []);

  const fetchAboutContent = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/content"
      );

      const about = response.data.find(

        (item) =>

          item.section_name ===
          "about_page"

      );

      setAboutContent(about);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <section className="bg-[#081120] text-white min-h-screen pt-40 pb-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">

          {/* LEFT */}
          <div className={

            isArabic
              ? "text-right"
              : "text-left"

          }>

            <p className="text-orange-400 uppercase tracking-[5px] mb-5">

              {t("aboutUs")}

            </p>

            <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">

              {aboutContent?.title}

            </h1>

            <h2 className="text-orange-400 text-2xl font-bold mb-8">

              {aboutContent?.subtitle}

            </h2>

            <p className="text-gray-400 text-lg leading-relaxed mb-8">

              {aboutContent?.description}

            </p>

          </div>

          {/* RIGHT */}
          <div className="relative">

            <img
              src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"
              alt="About"
              className="rounded-[40px] h-[700px] w-full object-cover"
            />

            <div className={`absolute bottom-10 ${

              isArabic
                ? "right-10"
                : "left-10"

            } bg-[#081120]/90 backdrop-blur-xl border border-white/10 rounded-3xl px-8 py-6`}>

              <h2 className="text-5xl font-black text-orange-400 mb-2">

                10K+

              </h2>

              <p className="text-gray-300">

                {t("happyTravelers")}

              </p>

            </div>

          </div>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-32">

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-10 text-center">

            <h2 className="text-5xl font-black text-orange-400 mb-4">

              10K+

            </h2>

            <p className="text-gray-300">

              {t("successfulTours")}

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-10 text-center">

            <h2 className="text-5xl font-black text-orange-400 mb-4">

              15+

            </h2>

            <p className="text-gray-300">

              {t("yearsExperience")}

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-10 text-center">

            <h2 className="text-5xl font-black text-orange-400 mb-4">

              50+

            </h2>

            <p className="text-gray-300">

              {t("premiumDestinations")}

            </p>

          </div>

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-10 text-center">

            <h2 className="text-5xl font-black text-orange-400 mb-4">

              24/7

            </h2>

            <p className="text-gray-300">

              {t("customerSupport")}

            </p>

          </div>

        </div>

        {/* WHY CHOOSE US */}
        <div>

          <div className="text-center mb-20">

            <p className="text-orange-400 uppercase tracking-[5px] mb-5">

              {t("whyChooseUs")}

            </p>

            <h2 className="text-5xl md:text-6xl font-black">

              {t("premiumTravelServices")}

            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* CARD 1 */}
            <div className="bg-white/5 border border-white/10 rounded-[30px] p-10">

              <div className="text-5xl mb-6">
                🌍
              </div>

              <h3 className="text-3xl font-bold mb-5">

                {t("expertLocalGuides")}

              </h3>

              <p className="text-gray-400 leading-relaxed">

                {t("expertLocalGuidesDesc")}

              </p>

            </div>

            {/* CARD 2 */}
            <div className="bg-white/5 border border-white/10 rounded-[30px] p-10">

              <div className="text-5xl mb-6">
                ✨
              </div>

              <h3 className="text-3xl font-bold mb-5">

                {t("luxuryExperiences")}

              </h3>

              <p className="text-gray-400 leading-relaxed">

                {t("luxuryExperiencesDesc")}

              </p>

            </div>

            {/* CARD 3 */}
            <div className="bg-white/5 border border-white/10 rounded-[30px] p-10">

              <div className="text-5xl mb-6">
                💎
              </div>

              <h3 className="text-3xl font-bold mb-5">

                {t("trustedService")}

              </h3>

              <p className="text-gray-400 leading-relaxed">

                {t("trustedServiceDesc")}

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}