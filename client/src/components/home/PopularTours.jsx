import {
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

import { Link } from "react-router-dom";

export default function PopularTours() {

  const [featuredTours, setFeaturedTours] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchTours();

  }, []);

  const fetchTours = async () => {

    try {

      setLoading(true);

      const response =
        await API.get(

          "/api/tours"

        );

      const homepageTours =
        response.data.filter(

          (tour) =>
            tour.section === "homepage"

        );

      setFeaturedTours(

        homepageTours.slice(0, 6)

      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  return (

    <section className="py-32 px-6 bg-[#081120]">

      <div className="max-w-7xl mx-auto">

        {/* HEADING */}

        <div className="text-center mb-20">

          <p className="text-orange-400 uppercase tracking-[5px] mb-5">

            Premium Experiences

          </p>

          <h2 className="text-5xl md:text-6xl font-black mb-6">

            Explore Our Best Tours

          </h2>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">

            Discover unforgettable adventures, luxury escapes,
            and breathtaking Zanzibar experiences carefully
            designed for travelers seeking something extraordinary.

          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-center text-gray-400 text-xl py-20">

            Loading tours...

          </div>

        ) : featuredTours.length === 0 ? (

          <div className="text-center text-gray-400 text-xl py-20">

            No tours found.

          </div>

        ) : (

          /* TOUR GRID */

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {featuredTours.map((tour) => (

              <div
                key={tour.id}
                className="group bg-white/5 border border-white/10 rounded-[30px] overflow-hidden hover:-translate-y-3 transition duration-500 shadow-2xl"
              >

                {/* IMAGE */}

                <div className="relative overflow-hidden">

                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                </div>

                {/* CONTENT */}

                <div className="p-8">

                  {/* TOP */}

                  <div className="flex items-center justify-between mb-5">

                    <span className="text-orange-400 font-semibold">

                      {tour.duration}

                    </span>

                    <div className="flex items-center gap-2 text-sm text-yellow-400">

                      ⭐ {tour.rating}

                    </div>

                  </div>

                  {/* TITLE */}

                  <h3 className="text-3xl font-bold mb-4 leading-snug">

                    {tour.title}

                  </h3>

                  {/* DESCRIPTION */}

                  <p className="text-gray-400 leading-relaxed mb-8 line-clamp-3">

                    {tour.description}

                  </p>

                  {/* BOTTOM */}

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-gray-500 text-sm mb-1">

                        Starting From

                      </p>

                      <h2 className="text-4xl font-black text-orange-400">

                        ${tour.price}

                      </h2>

                    </div>

                    <Link
                      to={`/tour/${tour.slug}`}
                      className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-2xl font-semibold shadow-lg shadow-orange-500/20"
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