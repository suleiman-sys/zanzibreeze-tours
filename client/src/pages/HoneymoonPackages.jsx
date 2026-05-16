import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { Link } from "react-router-dom";

export default function HoneymoonPackages() {

  const [honeymoonPackages, setHoneymoonPackages] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchPackages();

  }, []);

  const fetchPackages = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/tours"
      );

      const filteredPackages =
        response.data.filter(

          (tour) =>

           tour.section === "honeymoon"

        );

      setHoneymoonPackages(
        filteredPackages
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

          <p className="text-orange-400 uppercase tracking-[6px] mb-6 font-semibold">

            Romantic Experiences

          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">

            Luxury

            <span className="text-orange-400">

              {" "}Honeymoon Packages

            </span>

          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">

            Celebrate love with unforgettable honeymoon experiences,
            luxury beach escapes, private resorts, and magical
            Zanzibar adventures crafted for couples.

          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-center text-gray-400 text-xl py-20">

            Loading honeymoon packages...

          </div>

        ) : honeymoonPackages.length === 0 ? (

          <div className="text-center text-gray-400 text-xl py-20">

            No honeymoon packages found.

          </div>

        ) : (

          /* GRID */

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

            {honeymoonPackages.map((tour) => (

              <div
                key={tour.id}
                className="group bg-white/5 border border-white/10 rounded-[35px] overflow-hidden hover:-translate-y-3 transition duration-500"
              >

                {/* IMAGE */}

                <div className="overflow-hidden">

                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-[300px] object-cover group-hover:scale-110 transition duration-700"
                  />

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

                  <h2 className="text-3xl font-black mb-6">

                    {tour.title}

                  </h2>

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-gray-400 text-sm mb-2">

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

                      View Package

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