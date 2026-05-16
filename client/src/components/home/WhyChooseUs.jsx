import { useTranslation } from "react-i18next";

export default function WhyChooseUs() {

  const { t } = useTranslation();

  const features = [
    {
      icon: "🌍",
      title: t("expertLocalGuides"),
      description: t("expertLocalGuidesDesc"),
    },

    {
      icon: "💎",
      title: t("luxuryExperiences"),
      description: t("luxuryExperiencesDesc"),
    },

    {
      icon: "⭐",
      title: t("trustedThousands"),
      description: t("trustedThousandsDesc"),
    },
  ];

  return (
    <section className="bg-[#06101d] text-white py-32 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-24">

          <p className="text-orange-400 uppercase tracking-[6px] mb-6 font-semibold">
            {t("whyChooseUs")}
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">

            {t("luxuryExperience")}

            <span className="text-orange-400">
              {" "}
              {t("trustedByThousands")}
            </span>

          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">

            {t("whyChooseDesc")}

          </p>

        </div>

        {/* FEATURES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {features.map((item, index) => (

            <div
              key={index}
              className="group bg-white/5 border border-white/10 rounded-[35px] p-10 hover:-translate-y-3 transition duration-500"
            >

              <div className="text-6xl mb-8">
                {item.icon}
              </div>

              <h3 className="text-3xl font-black mb-6">
                {item.title}
              </h3>

              <p className="text-gray-400 leading-relaxed text-lg">
                {item.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}