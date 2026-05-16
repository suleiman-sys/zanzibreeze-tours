import {
  useEffect,
  useState,
} from "react";

import API from "../../services/api";

import { Link } from "react-router-dom";

export default function FeaturedAdventures() {

  const [adventures, setAdventures] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchFeaturedAdventures();

  }, []);

  const fetchFeaturedAdventures =
    async () => {

      try {

        setLoading(true);

        const response =
          await API.get(

            "/api/tours"

          );

        const featured =
          response.data.filter(

            (tour) =>
              tour.section === "vip"

          );

        setAdventures(

          featured.slice(0, 3)

        );

        setLoading(false);

      } catch (error) {

        console.log(error);

        setLoading(false);

      }

    };

  return (

    <section className="bg-[#081120] text-white py-32 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-24">

          <p className="text-orange-400 uppercase tracking-[6px] mb-6 font-semibold">

            Featured Adventures

          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">

            Handpicked Experiences

            <span className="text-orange-400">

              {" "}
              Loved By Our Guests

            </span>

          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">

            Explore unforgettable adventures carefully selected
            to deliver luxury, excitement, and authentic
            Tanzania travel experiences.

          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-center text-gray-400 text-xl py-20">

            Loading adventures...

          </div>

        ) : adventures.length === 0 ? (

          <div className="text-center text-gray-400 text-xl py-20">

            No adventures found.

          </div>

        ) : (

          /* GRID */

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

            {adventures.map((item) => (

              <div
                key={item.id}
                className="group bg-white/5 border border-white/10 rounded-[35px] overflow-hidden hover:-translate-y-3 transition duration-500"
              >

                {/* IMAGE */}

                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-700"
                  />

                </div>

                {/* CONTENT */}

                <div className="p-8">

                  <h3 className="text-3xl font-black mb-5">

                    {item.title}

                  </h3>

                  <p className="text-gray-400 leading-relaxed mb-8 line-clamp-3">

                    {item.description}

                  </p>

                  <Link
                    to={`/tour/${item.slug}`}
                    className="inline-block bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-2xl font-semibold"
                  >

                    Explore Adventure

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