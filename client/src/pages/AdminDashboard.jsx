import { useEffect, useState } from "react";
import axios from "axios";

import AdminNavbar from "../components/AdminNavbar";

export default function AdminDashboard() {

  const [analytics, setAnalytics] =
    useState(null);

  useEffect(() => {

    fetchAnalytics();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setAnalytics(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  if (!analytics) {

    return (
      <section className="bg-[#081120] text-white min-h-screen flex items-center justify-center">

        <h1 className="text-4xl font-black">
          Loading Dashboard...
        </h1>

      </section>
    );

  }

  return (
    <section className="bg-[#081120] text-white min-h-screen pt-20 pb-24 px-6 ml-[320px]">

      <div className="max-w-7xl mx-auto">

        <AdminNavbar />

        {/* HEADER */}
        <div className="mb-16">

          <h1 className="text-5xl font-black mb-5">
            Admin Dashboard
          </h1>

          <p className="text-gray-400 text-lg">
            Monitor your tourism business analytics.
          </p>

        </div>

        {/* STATS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">

          {/* BOOKINGS */}
          <div className="bg-white/5 border border-white/10 rounded-[35px] p-10">

            <h2 className="text-6xl font-black text-orange-400 mb-5">

              {analytics.totalBookings}

            </h2>

            <p className="text-gray-300 text-xl">
              Total Bookings
            </p>

          </div>

          {/* CONTACTS */}
          <div className="bg-white/5 border border-white/10 rounded-[35px] p-10">

            <h2 className="text-6xl font-black text-orange-400 mb-5">

              {analytics.totalContacts}

            </h2>

            <p className="text-gray-300 text-xl">
              Contact Messages
            </p>

          </div>

          {/* TOURS */}
          <div className="bg-white/5 border border-white/10 rounded-[35px] p-10">

            <h2 className="text-6xl font-black text-orange-400 mb-5">

              {analytics.totalTours}

            </h2>

            <p className="text-gray-300 text-xl">
              Total Tours
            </p>

          </div>

        </div>

        {/* RECENT BOOKINGS */}
        <div className="bg-white/5 border border-white/10 rounded-[35px] p-10">

          <h2 className="text-4xl font-black mb-10">
            Recent Bookings
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-white/10 text-left">

                  <th className="pb-5">
                    Name
                  </th>

                  <th className="pb-5">
                    Tour
                  </th>

                  <th className="pb-5">
                    Guests
                  </th>

                  <th className="pb-5">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {analytics.recentBookings.map((booking) => (

                  <tr
                    key={booking.id}
                    className="border-b border-white/5"
                  >

                    <td className="py-5">
                      {booking.fullName}
                    </td>

                    <td className="py-5 text-orange-400">
                      {booking.tour}
                    </td>

                    <td className="py-5">
                      {booking.guests}
                    </td>

                    <td className="py-5">
                      {booking.travelDate}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </section>
  );
}