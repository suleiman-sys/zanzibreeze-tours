import { useTranslation } from "react-i18next";

export default function Testimonials() {

  const { t } = useTranslation();

  const testimonials = [
    {
      name: "Sophia Williams",
      country: "United Kingdom",
      image:
        "https://randomuser.me/api/portraits/women/44.jpg",
      review: t("testimonial1"),
    },

    {
      name: "James Anderson",
      country: "United States",
      image:
        "https://randomuser.me/api/portraits/men/32.jpg",
      review: t("testimonial2"),
    },

    {
      name: "Emma Johnson",
      country: "Canada",
      image:
        "https://randomuser.me/api/portraits/women/68.jpg",
      review: t("testimonial3"),
    },
  ];

  return (
    <section className="bg-[#06101d] text-white py-32 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-24">

          <p className="text-orange-400 uppercase tracking-[6px] mb-6 font-semibold">
            {t("happyTravelers")}
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">

            {t("realStories")}

            <span className="text-orange-400">
              {" "}
              {t("realAdventures")}
            </span>

          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">

            {t("testimonialsDesc")}

          </p>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

          {testimonials.map((item, index) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-[35px] p-10 hover:-translate-y-3 transition duration-500"
            >

              {/* TOP */}
              <div className="flex items-center gap-5 mb-8">

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-orange-500"
                />

                <div>

                  <h3 className="text-2xl font-black">
                    {item.name}
                  </h3>

                  <p className="text-orange-400">
                    {item.country}
                  </p>

                </div>

              </div>

              {/* STARS */}
              <div className="text-yellow-400 text-xl mb-6">
                ★★★★★
              </div>

              {/* REVIEW */}
              <p className="text-gray-400 leading-relaxed text-lg">
                {item.review}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}