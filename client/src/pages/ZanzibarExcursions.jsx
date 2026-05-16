import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { Link } from "react-router-dom";

export default function ZanzibarExcursions() {

  const [zanzibarTours, setZanzibarTours] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchTours();

  }, []);

  const fetchTours = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/tours"
      );

      const filteredTours =
        response.data.filter(

          (tour) =>

            tour.section === "excursions"

        );

      setZanzibarTours(
        filteredTours
      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  return (

    <section className="bg-[#081120] text-white min-h-screen pt-40 pb-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="text-center mb-24">

          <p className="text-orange-400 uppercase tracking-[5px] mb-5">

            Zanzibar Experiences

          </p>

          <h1 className="text-6xl md:text-7xl font-black mb-8">

            Zanzibar Excursions

          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">

            Discover breathtaking beaches, spice farms,
            crystal-clear waters, cultural adventures,
            and unforgettable island experiences across Zanzibar.

          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-center text-gray-400 text-xl py-20">

            Loading tours...

          </div>

        ) : zanzibarTours.length === 0 ? (

          <div className="text-center text-gray-400 text-xl py-20">

            No Zanzibar tours found.

          </div>

        ) : (

          /* TOURS GRID */

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {zanzibarTours.map((tour) => (

              <div
                key={tour.id}
                className="group bg-white/5 border border-white/10 rounded-[30px] overflow-hidden hover:-translate-y-3 transition duration-500"
              >

                {/* IMAGE */}

                <div className="relative overflow-hidden">

                  {tour.badge && (

                    <div className="absolute top-5 left-5 z-20 bg-orange-500 text-white text-xs px-4 py-2 rounded-full font-semibold">

                      {tour.badge}

                    </div>

                  )}

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

                    {tour.shortDesc ||
                      tour.description}

                  </p>

                  {/* FOOTER */}

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-gray-500 text-sm mb-1">

                        Starting From

                      </p>

                      <h3 className="text-4xl font-black text-orange-400">

                        ${tour.price}

                      </h3>

                    </div>

                    <Link
                      to={`/tour/${tour.slug}`}
                      className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-2xl font-semibold"
                    >

                      View Tour

                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}