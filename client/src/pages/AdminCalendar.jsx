import { useEffect, useState } from "react";
import axios from "axios";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import AdminNavbar from "../components/AdminNavbar";

export default function AdminCalendar() {

  const [events, setEvents] =
    useState([]);

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const token =
        localStorage.getItem("adminToken");

      const response = await axios.get(

        "http://localhost:5000/api/bookings",

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      const formattedEvents =
        response.data.map((booking) => ({

          title:
            `${booking.fullName} - ${booking.tour}`,

          date:
            booking.travelDate,

        }));

      setEvents(formattedEvents);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <section className="bg-[#081120] text-white min-h-screen pt-20 pb-24 px-6 ml-[320px]">

      <div className="max-w-7xl mx-auto">

        <AdminNavbar />

        {/* HEADER */}

        <div className="mb-14">

          <p className="text-orange-400 uppercase tracking-[5px] mb-5">

            Booking Schedule

          </p>

          <h1 className="text-6xl font-black mb-6">

            Tour Calendar

          </h1>

          <p className="text-gray-400 text-lg">

            Manage tours, bookings, and upcoming schedules.

          </p>

        </div>

        {/* CALENDAR */}

        <div className="bg-white rounded-[35px] p-8 text-black shadow-2xl">

          <FullCalendar

            plugins={[dayGridPlugin]}

            initialView="dayGridMonth"

            events={events}

            height="auto"

          />

        </div>

      </div>

    </section>

  );

}