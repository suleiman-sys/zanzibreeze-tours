import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminContacts() {

  const [contacts, setContacts] = useState([]);

  const [selectedMessage, setSelectedMessage] =
    useState(null);

  const [showModal, setShowModal] =
    useState(false);

  useEffect(() => {

    fetchContacts();

  }, []);

  const fetchContacts = async () => {

    try {

      const token =
        localStorage.getItem("adminToken");

      const response = await axios.get(
        "http://localhost:5000/api/contacts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setContacts(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const deleteMessage = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this message?"
    );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem("adminToken");

      await axios.delete(
        `http://localhost:5000/api/contacts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchContacts();

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

            Contact Messages

          </h1>

          <p className="text-gray-400 text-lg">

            Manage customer inquiries and messages.

          </p>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto rounded-[35px] border border-white/10 bg-white/5">

          <table className="w-full min-w-[1300px]">

            <thead className="bg-orange-500 text-white">

              <tr>

                <th className="text-left px-6 py-5">

                  Name

                </th>

                <th className="text-left px-6 py-5">

                  Email

                </th>

                <th className="text-left px-6 py-5">

                  Subject

                </th>

                <th className="text-left px-6 py-5">

                  Message

                </th>

                <th className="text-left px-6 py-5">

                  Date

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

              {contacts.map((contact) => (

                <tr
                  key={contact.id}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >

                  <td className="px-6 py-5 font-semibold">

                    {contact.fullName}

                  </td>

                  <td className="px-6 py-5 text-gray-300">

                    {contact.email}

                  </td>

                  <td className="px-6 py-5 text-orange-400 font-semibold">

                    {contact.subject}

                  </td>

                  <td className="px-6 py-5 max-w-[400px] text-gray-300">

                    <p className="line-clamp-2">

                      {contact.message}

                    </p>

                  </td>

                  <td className="px-6 py-5 text-gray-400">

                    {new Date(
                      contact.createdAt
                    ).toLocaleDateString()}

                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        contact.status === "unread"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >

                      {contact.status}

                    </span>

                  </td>

                  <td className="px-6 py-5 flex gap-3">

                    <button

                      onClick={() => {

                        setSelectedMessage(contact);

                        setShowModal(true);

                      }}

                      className="bg-blue-500 hover:bg-blue-600 transition px-5 py-2 rounded-xl font-semibold"

                    >

                      View

                    </button>

                    <button
                      onClick={() =>
                        deleteMessage(contact.id)
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

      {/* MESSAGE MODAL */}

      {showModal && selectedMessage && (

        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center px-6">

          <div className="bg-[#081120] border border-white/10 rounded-[35px] max-w-3xl w-full p-10 relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-white"
            >

              ✕

            </button>

            <div className="mb-10">

              <p className="text-orange-400 uppercase tracking-[4px] mb-4">

                Customer Message

              </p>

              <h2 className="text-4xl font-black mb-4">

                {selectedMessage.subject}

              </h2>

              <p className="text-gray-400">

                From: {selectedMessage.fullName}

              </p>

            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-10">

              <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">

                {selectedMessage.message}

              </p>

            </div>

            <div className="flex flex-wrap gap-5">

              <a
                href={`mailto:${selectedMessage.email}`}
                className="bg-orange-500 hover:bg-orange-600 transition px-6 py-4 rounded-2xl font-semibold"
              >

                Send Email

              </a>

            </div>

          </div>

        </div>

      )}

    </section>

  );

}