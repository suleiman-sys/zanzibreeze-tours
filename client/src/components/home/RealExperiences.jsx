import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import API from "../../services/api";

export default function RealExperiences() {

  const [experiences, setExperiences] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchExperiences();

  }, []);

  const fetchExperiences = async () => {

    try {

      setLoading(true);

      const response =
        await API.get(

          "/api/tours"

        );

      const filteredExperiences =
        response.data.filter(

          (tour) =>

            tour.section ===
            "experiences"

        );

      setExperiences(

        filteredExperiences.slice(0, 6)

      );

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  return (

    <section className="py-32 px-6 bg-[#06101d]">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="text-center mb-24">

          <p className="text-orange-400 uppercase tracking-[6px] mb-6 font-semibold">

            Real Zanzibar Experiences

          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">

            Discover Authentic

            <span className="text-orange-400">

              {" "}
              Island Adventures

            </span>

          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">

            Experience real Zanzibar adventures crafted
            with unforgettable memories, tropical beauty,
            culture, and luxury experiences.

          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-center text-gray-400 text-xl py-20">

            Loading experiences...

          </div>

        ) : experiences.length === 0 ? (

          <div className="text-center text-gray-400 text-xl py-20">

            No experiences found.

          </div>

        ) : (

          /* GRID */

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

            {experiences.map((item) => (

              <div
                key={item.id}
                className="group bg-white/5 border border-white/10 rounded-[35px] overflow-hidden hover:-translate-y-3 transition duration-500"
              >

                {/* IMAGE */}

                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[350px] object-cover group-hover:scale-110 transition duration-700"
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

                    View Experience

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