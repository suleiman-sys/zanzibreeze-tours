import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { Link } from "react-router-dom";

const transferPrices = [

  {
    from: "Airport",
    to: "Stone Town",
    standard: 15,
    vip: 30,
    van: 45,
  },

  {
    from: "Airport",
    to: "Nungwi",
    standard: 45,
    vip: 70,
    van: 100,
  },

  {
    from: "Airport",
    to: "Kendwa",
    standard: 45,
    vip: 70,
    van: 100,
  },

  {
    from: "Airport",
    to: "Paje",
    standard: 50,
    vip: 80,
    van: 120,
  },

  {
    from: "Airport",
    to: "Jambiani",
    standard: 55,
    vip: 85,
    van: 130,
  },

  {
    from: "Airport",
    to: "Kiwengwa",
    standard: 40,
    vip: 65,
    van: 90,
  },

  {
    from: "Stone Town",
    to: "Nungwi",
    standard: 40,
    vip: 65,
    van: 90,
  },

  {
    from: "Stone Town",
    to: "Paje",
    standard: 45,
    vip: 70,
    van: 100,
  },

  {
    from: "Stone Town",
    to: "Jambiani",
    standard: 50,
    vip: 80,
    van: 120,
  },

  {
    from: "Nungwi",
    to: "Paje",
    standard: 60,
    vip: 95,
    van: 140,
  },

];

export default function VipTransfers() {

  const [transfers, setTransfers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchTransfers();

  }, []);

  const fetchTransfers = async () => {

    try {

      setLoading(true);

      const response = await axios.get(
        "http://localhost:5000/api/tours"
      );

      const filteredTransfers =
        response.data.filter(

          (tour) =>

           tour.section === "vip"

        );

      setTransfers(
        filteredTransfers
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

            Luxury Transportation

          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">

            VIP

            <span className="text-orange-400">

              {" "}Transfers

            </span>

          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">

            Travel across Zanzibar in comfort and style with
            our premium airport pickups, private transfers,
            and luxury chauffeur services.

          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-center text-gray-400 text-xl py-20">

            Loading transfers...

          </div>

        ) : transfers.length === 0 ? (

          <div className="text-center text-gray-400 text-xl py-20">

            No transfer services found.

          </div>

        ) : (

          /* TRANSFER CARDS */

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 mb-32">

            {transfers.map((tour) => (

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

                      Book Transfer

                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

        {/* TRANSFER PRICE SECTION */}

        <section>

          {/* HEADER */}

          <div className="text-center mb-20">

            <p className="text-orange-400 uppercase tracking-[5px] mb-5 font-semibold">

              Zanzibar Transfer Rates

            </p>

            <h2 className="text-5xl md:text-6xl font-black mb-8">

              Airport & Hotel

              <span className="text-orange-400">

                {" "}Transfer Prices

              </span>

            </h2>

            <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">

              Enjoy safe, comfortable, and luxury transportation
              across Zanzibar with professional drivers and
              premium vehicles available 24/7.

            </p>

          </div>

          {/* TABLE */}

          <div className="overflow-x-auto rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-2xl">

            <table className="w-full min-w-[900px]">

              <thead className="bg-orange-500 text-white">

                <tr>

                  <th className="text-left px-8 py-6 text-lg">
                    From
                  </th>

                  <th className="text-left px-8 py-6 text-lg">
                    To
                  </th>

                  <th className="text-left px-8 py-6 text-lg">
                    Standard
                  </th>

                  <th className="text-left px-8 py-6 text-lg">
                    VIP SUV
                  </th>

                  <th className="text-left px-8 py-6 text-lg">
                    Luxury Van
                  </th>

                  <th className="text-left px-8 py-6 text-lg">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {transferPrices.map((item, index) => (

                  <tr
                    key={index}
                    className="border-b border-white/10 hover:bg-white/5 transition"
                  >

                    <td className="px-8 py-6 font-semibold">
                      ✈️ {item.from}
                    </td>

                    <td className="px-8 py-6">
                      📍 {item.to}
                    </td>

                    <td className="px-8 py-6 text-orange-400 font-bold">
                      ${item.standard}
                    </td>

                    <td className="px-8 py-6 text-orange-400 font-bold">
                      ${item.vip}
                    </td>

                    <td className="px-8 py-6 text-orange-400 font-bold">
                      ${item.van}
                    </td>

                    <td className="px-8 py-6">

                      <a
                        href={`https://wa.me/255625996460?text=Hello%20Summer%20Breeze%20Tours,%20I%20would%20like%20to%20book%20a%20transfer%20from%20${item.from}%20to%20${item.to}`}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-orange-500 hover:bg-orange-600 transition px-5 py-3 rounded-2xl font-semibold inline-block"
                      >

                        Book Now

                      </a>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </section>

      </div>

    </section>

  );

}