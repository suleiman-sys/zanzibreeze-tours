import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

export default function Tours() {

  const { t } = useTranslation();

  const location = useLocation();

  const searchData = location.state;

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [tours, setTours] = useState([]);

  useEffect(() => {

    fetchTours();

  }, []);

  const fetchTours = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/tours"
      );

      setTours(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const categories = [

    "All",
    "Zanzibar",
    "Mainland",
    "Water Sports",

  ];

  const filteredTours =

    selectedCategory === "All"

      ? tours

      : tours.filter(

          (tour) =>
            tour.category === selectedCategory

        );

  return (
    <section className="bg-[#081120] text-white min-h-screen pt-40 pb-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* SEARCH DETAILS */}
        {searchData && (

          <div className="bg-white/5 border border-white/10 rounded-[30px] p-8 mb-16">

            <h2 className="text-3xl font-black mb-8">
              {t("searchDetails")}
            </h2>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

              <div className="bg-white/5 rounded-2xl p-5">

                <p className="text-gray-400 mb-2">
                  {t("destination")}
                </p>

                <h3 className="text-xl font-bold">
                  {searchData.destination}
                </h3>

              </div>

              <div className="bg-white/5 rounded-2xl p-5">

                <p className="text-gray-400 mb-2">
                  {t("tourType")}
                </p>

                <h3 className="text-xl font-bold">
                  {searchData.tourType}
                </h3>

              </div>

              <div className="bg-white/5 rounded-2xl p-5">

                <p className="text-gray-400 mb-2">
                  {t("guests")}
                </p>

                <h3 className="text-xl font-bold">
                  {searchData.guests || t("notSelected")}
                </h3>

              </div>

              <div className="bg-white/5 rounded-2xl p-5">

                <p className="text-gray-400 mb-2">
                  {t("travelDate")}
                </p>

                <h3 className="text-xl font-bold">
                  {searchData.date || t("flexible")}
                </h3>

              </div>

            </div>

          </div>

        )}

        {/* HEADING */}
        <div className="text-center mb-20">

          <p className="text-orange-400 uppercase tracking-[5px] mb-5">
            {t("exploreTanzania")}
          </p>

          <h1 className="text-6xl md:text-7xl font-black mb-6">
            {t("premiumTours")}
          </h1>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
            {t("premiumToursDesc")}
          </p>

        </div>

        {/* FILTERS */}
        <div className="flex flex-wrap gap-5 justify-center mb-20">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`px-7 py-4 rounded-2xl font-semibold transition ${
                selectedCategory === category
                  ? "bg-orange-500 text-white"
                  : "bg-white/5 border border-white/10 hover:bg-white/10"
              }`}
            >

              {category === "All" && t("all")}
              {category === "Zanzibar" && t("zanzibar")}
              {category === "Mainland" && t("mainland")}
              {category === "Water Sports" &&
                t("waterSports")}

            </button>

          ))}

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

          {filteredTours.map((tour) => (

            <div
              key={tour.id}
              className="group bg-white/5 border border-white/10 rounded-[30px] overflow-hidden hover:-translate-y-3 transition duration-500"
            >

              {/* IMAGE */}
              <div className="relative overflow-hidden">

                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-[320px] object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              </div>

              {/* CONTENT */}
              <div className="p-8">

                <div className="flex items-center justify-between mb-5">

                  <span className="text-orange-400 font-semibold">
                    {tour.duration}
                  </span>

                  <span className="text-yellow-400">
                    ⭐ {tour.rating}
                  </span>

                </div>

                <h2 className="text-3xl font-bold mb-4 leading-snug">
                  {tour.title}
                </h2>

                <p className="text-gray-400 mb-8 line-clamp-3 leading-relaxed">
                  {tour.description}
                </p>

                {/* FOOTER */}
                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-gray-500 text-sm mb-1">
                      {t("startingFrom")}
                    </p>

                    <h3 className="text-4xl font-black text-orange-400">
                      ${tour.price}
                    </h3>

                  </div>

                  <Link
                    to={`/tour/${tour.slug}`}
                    className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-orange-500/20"
                  >
                    {t("viewTour")}
                  </Link>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}