import { useEffect, useState } from "react";

import axios from "axios";

import AdminNavbar from "../components/AdminNavbar";

export default function AdminBookings() {

  const [bookings, setBookings] =
    useState([]);

  const [selectedBooking, setSelectedBooking] =
    useState(null);

  const [formData, setFormData] =
    useState({

      fullName: "",
      email: "",
      phone: "",
      travelDate: "",
      guests: "",
      message: "",

    });

  useEffect(() => {

    fetchBookings();

  }, []);

  const fetchBookings = async () => {

    try {

      const response =
        await axios.get(

          "http://localhost:5000/api/bookings",

          {

            headers: {

              Authorization:
                `Bearer ${localStorage.getItem("adminToken")}`,

            },

          }

        );

      setBookings(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const deleteBooking = async (id) => {

    const confirmDelete =
      window.confirm(

        "Are you sure you want to delete this booking?"

      );

    if (!confirmDelete) return;

    try {

      await axios.delete(

        `http://localhost:5000/api/bookings/${id}`,

        {

          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("adminToken")}`,

          },

        }

      );

      fetchBookings();

    } catch (error) {

      console.log(error);

    }

  };

  const updateStatus = async (

    id,
    status

  ) => {

    try {

      await axios.put(

        `http://localhost:5000/api/bookings/${id}/status`,

        { status },

        {

          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("adminToken")}`,

          },

        }

      );

      fetchBookings();

    } catch (error) {

      console.log(error);

    }

  };

  const handleEdit = (booking) => {

    setSelectedBooking(booking);

    setFormData({

      fullName:
        booking.fullName || "",

      email:
        booking.email || "",

      phone:
        booking.phone || "",

      travelDate:
        booking.travelDate || "",

      guests:
        booking.guests || "",

      message:
        booking.message || "",

    });

  };

  const saveChanges = async () => {

    try {

      await axios.put(

        `http://localhost:5000/api/bookings/${selectedBooking.id}`,

        formData,

        {

          headers: {

            Authorization:
              `Bearer ${localStorage.getItem("adminToken")}`,

          },

        }

      );

      fetchBookings();

      setSelectedBooking(null);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <section className="bg-[#081120] text-white min-h-screen pt-20 pb-24 px-6 ml-[320px]">

      <div className="max-w-7xl mx-auto">

        <AdminNavbar />

        {/* HEADER */}

        <div className="mb-16">

          <p className="text-orange-400 uppercase tracking-[5px] mb-5">

            Admin Dashboard

          </p>

          <h1 className="text-5xl md:text-7xl font-black mb-8">

            All Bookings

          </h1>

          <p className="text-gray-400 text-lg">

            Manage customer bookings and tour reservations.

          </p>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto rounded-[35px] border border-white/10 bg-white/5">

          <table className="w-full min-w-[1400px]">

            <thead className="bg-orange-500 text-white">

              <tr>

                <th className="text-left px-6 py-5">

                  Name

                </th>

                <th className="text-left px-6 py-5">

                  Email

                </th>

                <th className="text-left px-6 py-5">

                  Phone

                </th>

                <th className="text-left px-6 py-5">

                  Tour

                </th>

                <th className="text-left px-6 py-5">

                  Date

                </th>

                <th className="text-left px-6 py-5">

                  Guests

                </th>

                <th className="text-left px-6 py-5">

                  Message

                </th>

                <th className="text-left px-6 py-5">

                  Status

                </th>

                <th className="text-left px-6 py-5">

                  Actions

                </th>

              </tr>

            </thead>

            <tbody>

              {bookings.map((booking) => (

                <tr
                  key={booking.id}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >

                  <td className="px-6 py-5">

                    {booking.fullName}

                  </td>

                  <td className="px-6 py-5">

                    {booking.email}

                  </td>

                  <td className="px-6 py-5">

                    {booking.phone}

                  </td>

                  <td className="px-6 py-5 text-orange-400 font-semibold">

                    {booking.tour}

                  </td>

                  <td className="px-6 py-5">

                    {booking.travelDate}

                  </td>

                  <td className="px-6 py-5">

                    {booking.guests}

                  </td>

                  <td className="px-6 py-5 max-w-[300px]">

                    {booking.message}

                  </td>

                  {/* STATUS */}

                  <td className="px-6 py-5">

                    <select
                      value={booking.status}
                      onChange={(e) =>

                        updateStatus(

                          booking.id,
                          e.target.value

                        )

                      }
                      className="bg-[#081120] border border-white/10 rounded-xl px-4 py-2 outline-none"
                    >

                      <option value="Pending">

                        Pending

                      </option>

                      <option value="Confirmed">

                        Confirmed

                      </option>

                      <option value="Cancelled">

                        Cancelled

                      </option>

                    </select>

                  </td>

                  {/* ACTIONS */}

                  <td className="px-6 py-5 flex gap-3">

                    <button
                      onClick={() =>
                        handleEdit(booking)
                      }
                      className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-xl font-semibold"
                    >

                      Edit

                    </button>

                    <button
                      onClick={() =>

                        deleteBooking(
                          booking.id
                        )

                      }
                      className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl font-semibold"
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* EDIT MODAL */}

      {selectedBooking && (

        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">

          <div className="bg-[#081120] w-full max-w-2xl rounded-[35px] border border-white/10 p-8">

            <h2 className="text-4xl font-black mb-8">

              Edit Booking

            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    fullName:
                      e.target.value,
                  })
                }
                placeholder="Full Name"
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target.value,
                  })
                }
                placeholder="Email"
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone:
                      e.target.value,
                  })
                }
                placeholder="Phone"
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="date"
                value={formData.travelDate}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    travelDate:
                      e.target.value,
                  })
                }
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

              <input
                type="number"
                value={formData.guests}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    guests:
                      e.target.value,
                  })
                }
                placeholder="Guests"
                className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
              />

            </div>

            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message:
                    e.target.value,
                })
              }
              placeholder="Message"
              className="w-full h-32 mt-5 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <div className="flex gap-4 mt-8">

              <button
                onClick={saveChanges}
                className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-2xl font-semibold"
              >

                Save Changes

              </button>

              <button
                onClick={() =>
                  setSelectedBooking(null)
                }
                className="bg-white/10 hover:bg-white/20 transition px-6 py-3 rounded-2xl font-semibold"
              >

                Cancel

              </button>

            </div>

          </div>

        </div>

      )}

    </section>

  );

}