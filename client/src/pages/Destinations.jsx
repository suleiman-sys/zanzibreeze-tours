import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

import { useTranslation } from "react-i18next";

export default function Destinations() {

  const { t, i18n } =
    useTranslation();

  const isArabic =
    i18n.language === "ar";

  const [destinations, setDestinations] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchDestinations();

  }, []);

  const fetchDestinations = async () => {

    try {

      setLoading(true);

      const response =
        await API.get(

          "/api/destinations"

        );

      setDestinations(response.data);

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

        <div className={`mb-24 ${isArabic ? "text-right" : "text-center"}`}>

          <p className="text-orange-400 uppercase tracking-[5px] mb-5">

            {t("exploreTanzania")}

          </p>

          <h1 className="text-5xl md:text-7xl font-black mb-8">

            {t("topDestinations")}

          </h1>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">

            {t("destinationsDesc")}

          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-center text-gray-400 text-xl py-20">

            Loading destinations...

          </div>

        ) : destinations.length === 0 ? (

          <div className="text-center text-gray-400 text-xl py-20">

            No destinations found.

          </div>

        ) : (

          /* GRID */

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {destinations.map((destination) => (

              <div
                key={destination.id}
                className="group relative rounded-[30px] overflow-hidden h-[500px]"
              >

                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                <div className="absolute bottom-0 p-8">

                  <h2 className="text-4xl font-black mb-4">

                    {destination.title}

                  </h2>

                  <p className="text-gray-300 leading-relaxed mb-6 line-clamp-3">

                    {destination.description}

                  </p>

                  <button className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-2xl font-semibold">

                    {t("exploreDestination")}

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>

  );

}