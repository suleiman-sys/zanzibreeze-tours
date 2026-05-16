import { useEffect, useState } from "react";
import axios from "axios";

export default function LuxuryTourismDashboard() {

const [analytics, setAnalytics] =
  useState({

    totalBookings: 0,
    totalTours: 0,
    totalContacts: 0,
    pendingBookings: 0,
    confirmedBookings: 0,

  });

useEffect(() => {

  fetchAnalytics();

}, []);

const fetchAnalytics = async () => {

  try {

    const token =
      localStorage.getItem("adminToken");

    const response = await axios.get(
      "http://localhost:5000/api/business-analytics",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAnalytics(response.data);

  } catch (error) {

    console.log(error);

  }

};
const stats = [

  {
    title: "Total Bookings",
    value: analytics.totalBookings,
    icon: "📅",
    growth: "+18%",
  },

  {
    title: "Total Income",
    value: `$${analytics.totalIncome || 0}`,
    icon: "💰",
    growth: "+24%",
  },

  {
    title: "Total Expenses",
    value: `$${analytics.totalExpenses || 0}`,
    icon: "💳",
    growth: "+9%",
  },

  {
    title: "Net Profit",
    value: `$${analytics.netProfit || 0}`,
    icon: "📈",
    growth: "+31%",
  },

];

  const upcomingTours = [
    {
      title: "Stone Town Tour",
      date: "14 June 2026",
      guests: 12,
    },
    {
      title: "Safari Blue Adventure",
      date: "16 June 2026",
      guests: 20,
    },
    {
      title: "Mnemba Island Snorkeling",
      date: "18 June 2026",
      guests: 8,
    },
  ];

  const recentCustomers =
  analytics.recentCustomers || [];


  return (
    <div className="min-h-screen bg-[#07111f] text-white flex overflow-hidden">

      {/* SIDEBAR */}

     

      {/* MAIN CONTENT */}

      <main className="flex-1 p-6 md:p-10 overflow-y-auto ml-[320px]">

        {/* TOPBAR */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12">

        <div className="mb-6">

  <button
    onClick={() =>
      window.location.href =
        "/admin/dashboard"
    }
    className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-3 rounded-2xl font-semibold transition"
  >

    ← Back To Admin Dashboard

  </button>

</div>

          <div>

            <p className="text-yellow-500 uppercase tracking-[5px] mb-3 font-semibold text-sm">
              Luxury Dashboard
            </p>

            <h2 className="text-4xl md:text-5xl font-black">
              Business Overview
            </h2>

          </div>

          <div className="flex items-center gap-4">

            <button className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-4 rounded-2xl font-bold transition shadow-xl">
              + Add Booking
            </button>

            <button className="border border-white/10 hover:bg-white/5 px-6 py-4 rounded-2xl font-semibold transition">
              Generate Report
            </button>

          </div>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-2xl backdrop-blur-xl"
            >

              <div className="flex items-center justify-between mb-8">

                <div className="w-16 h-16 rounded-2xl bg-yellow-500/20 flex items-center justify-center text-3xl">
                  {item.icon}
                </div>

                <span className="text-green-400 font-semibold text-sm">
                  {item.growth}
                </span>

              </div>

              <p className="text-gray-400 mb-3 text-sm uppercase tracking-[3px]">
                {item.title}
              </p>

              <h3 className="text-4xl font-black">
                {item.value}
              </h3>

            </div>

          ))}

        </div>

        {/* ANALYTICS SECTION */}

        <div className="grid xl:grid-cols-3 gap-8 mb-12">

          {/* CHART */}

          <div className="xl:col-span-2 bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-2xl">

            <div className="flex items-center justify-between mb-10">

              <div>

                <p className="text-yellow-500 uppercase tracking-[4px] text-sm mb-3">
                  Reports
                </p>

                <h3 className="text-3xl font-black">
                  Income Analytics
                </h3>

              </div>

              <select className="bg-[#0d1726] border border-white/10 px-5 py-3 rounded-2xl outline-none">
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>

            </div>

            <div className="h-[350px] rounded-[30px] bg-gradient-to-br from-[#0b1524] to-[#13233d] flex items-center justify-center border border-white/5">

              <div className="text-center">

                <div className="text-7xl mb-6">📊</div>

                <h4 className="text-2xl font-black mb-3">
                  Interactive Revenue Chart
                </h4>

                <p className="text-gray-400">
                  Daily / Weekly / Monthly analytics visualization
                </p>

              </div>

            </div>

          </div>

          {/* TOUR PERFORMANCE */}

          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-2xl">

            <div className="mb-10">

              <p className="text-yellow-500 uppercase tracking-[4px] text-sm mb-3">
                Performance
              </p>

              <h3 className="text-3xl font-black">
                Top Tours
              </h3>

            </div>

            <div className="space-y-6">

              {[
                {
                  name: "Safari Blue",
                  bookings: 128,
                  revenue: "$12,800",
                },
                {
                  name: "Stone Town",
                  bookings: 95,
                  revenue: "$8,540",
                },
                {
                  name: "Mnemba Island",
                  bookings: 76,
                  revenue: "$7,100",
                },
              ].map((tour, index) => (

                <div
                  key={index}
                  className="bg-[#0c1828] rounded-3xl p-6 border border-white/5"
                >

                  <div className="flex items-center justify-between mb-4">

                    <h4 className="font-black text-xl">
                      {tour.name}
                    </h4>

                    <span className="text-yellow-500 font-semibold">
                      {tour.revenue}
                    </span>

                  </div>

                  <p className="text-gray-400 text-sm">
                    {tour.bookings} bookings completed
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* TABLES */}

        <div className="grid xl:grid-cols-2 gap-8 mb-12">

          {/* UPCOMING TOURS */}

          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-2xl">

            <div className="flex items-center justify-between mb-10">

              <div>

                <p className="text-yellow-500 uppercase tracking-[4px] text-sm mb-3">
                  Calendar
                </p>

                <h3 className="text-3xl font-black">
                  Upcoming Tours
                </h3>

              </div>

              <button className="border border-white/10 hover:bg-white/5 transition px-5 py-3 rounded-2xl">
                View All
              </button>

            </div>

            <div className="space-y-5">

              {upcomingTours.map((tour, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between bg-[#0c1828] rounded-3xl p-6 border border-white/5"
                >

                  <div>

                    <h4 className="text-xl font-black mb-2">
                      {tour.title}
                    </h4>

                    <p className="text-gray-400 text-sm">
                      {tour.date}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-yellow-500 font-bold text-xl">
                      {tour.guests}
                    </p>

                    <p className="text-gray-400 text-sm">
                      Guests
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* RECENT CUSTOMERS */}

          <div className="bg-white/5 border border-white/10 rounded-[35px] p-8 shadow-2xl">

            <div className="flex items-center justify-between mb-10">

              <div>

                <p className="text-yellow-500 uppercase tracking-[4px] text-sm mb-3">
                  Customers
                </p>

                <h3 className="text-3xl font-black">
                  Recent Customers
                </h3>

              </div>

              <button className="border border-white/10 hover:bg-white/5 transition px-5 py-3 rounded-2xl">
                Manage
              </button>

            </div>

            <div className="space-y-5">

              {recentCustomers.map((customer, index) => (

                <div
                  key={index}
                  className="flex items-center justify-between bg-[#0c1828] rounded-3xl p-6 border border-white/5"
                >

                  <div className="flex items-center gap-5">

                    <div className="w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center text-2xl">
                      👤
                    </div>

                    <div>

                      <h4 className="font-black text-lg">
                        {customer.fullName}
                      </h4>

                      <p className="text-gray-400 text-sm">
                        {customer.email}
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-yellow-500 font-bold text-lg">
                      {customer.price}
                    </p>

                    <p className="text-gray-400 text-sm">
                      Booking Value
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* FINANCE SECTION */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

          {[
            {
              title: "Fuel Expenses",
              value: "$4,500",
              icon: "⛽",
            },
            {
              title: "Driver Payments",
              value: "$2,300",
              icon: "🚐",
            },
            {
              title: "Hotels",
              value: "$8,900",
              icon: "🏨",
            },
            {
              title: "Marketing",
              value: "$1,850",
              icon: "📣",
            },
          ].map((item, index) => (

            <div
              key={index}
              className="bg-gradient-to-br from-[#0c1828] to-[#13233d] border border-white/10 rounded-[35px] p-8 shadow-2xl"
            >

              <div className="text-5xl mb-6">
                {item.icon}
              </div>

              <p className="text-gray-400 mb-3 uppercase tracking-[3px] text-sm">
                {item.title}
              </p>

              <h3 className="text-4xl font-black text-yellow-500">
                {item.value}
              </h3>

            </div>

          ))}

        </div>

      </main>

    </div>
  );
}
