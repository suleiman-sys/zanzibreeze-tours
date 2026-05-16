import {
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

export default function TrendingTours() {

  const { t } =
    useTranslation();

  const [trendingTours, setTrendingTours] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchTrendingTours();

  }, []);

  const fetchTrendingTours = async () => {

    try {

      setLoading(true);

      const response =
        await API.get(

          "/api/tours"

        );

      const trending =
        response.data.filter(

          (tour) =>
            tour.section === "excursions"

        );

      setTrendingTours(

        trending.slice(0, 3)

      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  return (

    <section className="bg-[#081120] text-white py-28 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-24">

          <p className="text-orange-400 uppercase tracking-[6px] mb-6 font-semibold">

            {t("trendingNow")}

          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">

            {t("discoverOur")}

            <span className="text-orange-400">

              {" "}
              {t("mostBookedTours")}

            </span>

          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">

            Explore Zanzibar’s hottest experiences carefully curated for
            travelers seeking unforgettable luxury adventures, tropical escapes,
            and premium safari memories.

          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-center text-gray-400 text-xl py-20">

            Loading tours...

          </div>

        ) : trendingTours.length === 0 ? (

          <div className="text-center text-gray-400 text-xl py-20">

            No tours found.

          </div>

        ) : (

          /* GRID */

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

            {trendingTours.map((tour) => (

              <div
                key={tour.id}
                className="group bg-white/5 border border-white/10 rounded-[35px] overflow-hidden hover:-translate-y-3 transition duration-500"
              >

                {/* IMAGE */}

                <div className="relative overflow-hidden">

                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-[280px] object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                  <div className="absolute top-6 left-6 bg-orange-500 text-white text-sm px-5 py-2 rounded-full font-semibold">

                    Trending

                  </div>

                </div>

                {/* CONTENT */}

                <div className="p-8">

                  <div className="flex items-center justify-between mb-6">

                    <div>

                      <p className="text-gray-400 text-sm mb-2">

                        From

                      </p>

                      <h3 className="text-5xl font-black text-orange-400">

                        ${tour.price}

                      </h3>

                      <span className="text-gray-400">

                        /person

                      </span>

                    </div>

                    <div className="text-right">

                      <div className="text-yellow-400 font-semibold mb-2">

                        ⭐ {tour.rating}

                      </div>

                    </div>

                  </div>

                  <h2 className="text-4xl font-black mb-6 leading-snug">

                    {tour.title}

                  </h2>

                  <p className="text-gray-400 leading-relaxed mb-8 line-clamp-3">

                    {tour.description}

                  </p>

                  {/* FEATURES */}

                  <div className="flex flex-wrap gap-4 mb-10">

                    <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm">

                      {tour.duration}

                    </span>

                    <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm">

                      Premium Tour

                    </span>

                  </div>

                  <Link
                    to={`/tour/${tour.slug}`}
                    className="block text-center w-full bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl font-semibold text-lg"
                  >

                    {t("bookNow")}

                  </Link>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}