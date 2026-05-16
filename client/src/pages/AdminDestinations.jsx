import { useState, useEffect } from "react";
import axios from "axios";

import API from "../services/api";

import AdminNavbar from "../components/AdminNavbar";

export default function AdminDestinations() {

  const [destinations, setDestinations] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({

      title: "",
      slug: "",
      image: null,
      description: "",

    });

  useEffect(() => {

    fetchDestinations();

  }, []);

  const fetchDestinations = async () => {

    try {

      const response =
        await API.get(

          "/api/destinations"

        );

      setDestinations(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const token =
      localStorage.getItem(
        "adminToken"
      );

    try {

      let imageUrl =
        formData.image;

      /* IMAGE */

      if (
        formData.image instanceof File
      ) {

        const imageData =
          new FormData();

        imageData.append(
          "image",
          formData.image
        );

        const uploadResponse =
          await axios.post(

            "http://localhost:5000/api/upload",

            imageData

          );

        imageUrl =
          uploadResponse.data.imageUrl;

      }

      /* UPDATE */

      if (editingId) {

        await axios.put(

          `http://localhost:5000/api/destinations/${editingId}`,

          {

            ...formData,

            image: imageUrl,

          },

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

      }

      /* CREATE */

      else {

        await axios.post(

          "http://localhost:5000/api/destinations",

          {

            ...formData,

            image: imageUrl,

          },

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

      }

      fetchDestinations();

      setEditingId(null);

      setFormData({

        title: "",
        slug: "",
        image: null,
        description: "",

      });

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.error ||
        "Action failed"
      );

    }

  };

  const deleteDestination =
    async (id) => {

      const token =
        localStorage.getItem(
          "adminToken"
        );

      const confirmDelete =
        window.confirm(
          "Delete this destination?"
        );

      if (!confirmDelete) return;

      try {

        await axios.delete(

          `http://localhost:5000/api/destinations/${id}`,

          {

            headers: {

              Authorization:
                `Bearer ${token}`,

            },

          }

        );

        fetchDestinations();

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

          <h1 className="text-5xl font-black mb-5">

            Destinations CMS

          </h1>

          <p className="text-gray-400 text-lg">

            Create and manage destinations.

          </p>

        </div>

        {/* FORM */}

        <div className="bg-white/5 border border-white/10 rounded-[35px] p-10 mb-16">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >

            <input
              type="text"
              name="title"
              placeholder="Destination Title"
              value={formData.title}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              required
            />

            <input
              type="text"
              name="slug"
              placeholder="destination-slug"
              value={formData.slug}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              required
            />

            {/* IMAGE */}

            <input
              type="file"
              accept="image/*"
              onChange={(e) =>

                setFormData({

                  ...formData,

                  image:
                    e.target.files[0],

                })

              }
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <textarea
              rows="5"
              name="description"
              placeholder="Destination Description"
              value={formData.description}
              onChange={handleChange}
              className="md:col-span-2 bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              required
            ></textarea>

            <button
              type="submit"
              className="md:col-span-2 bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl font-semibold text-lg"
            >

              {

                editingId

                  ? "Update Destination"

                  : "Add Destination"

              }

            </button>

          </form>

        </div>

        {/* DESTINATIONS */}

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {destinations.map((item) => (

            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-[35px] overflow-hidden"
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[260px] object-cover"
              />

              <div className="p-6">

                <h2 className="text-3xl font-black mb-4">

                  {item.title}

                </h2>

                <p className="text-gray-400 mb-6 line-clamp-3">

                  {item.description}

                </p>

                <div className="flex gap-4">

                  {/* EDIT */}

                  <button
                    onClick={() => {

                      setEditingId(
                        item.id
                      );

                      setFormData({

                        title:
                          item.title,

                        slug:
                          item.slug,

                        image:
                          item.image,

                        description:
                          item.description,

                      });

                      window.scrollTo({

                        top: 0,

                        behavior:
                          "smooth",

                      });

                    }}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 transition py-3 rounded-2xl font-semibold"
                  >

                    Edit

                  </button>

                  {/* DELETE */}

                  <button
                    onClick={() =>
                      deleteDestination(
                        item.id
                      )
                    }
                    className="flex-1 bg-red-500 hover:bg-red-600 transition py-3 rounded-2xl font-semibold"
                  >

                    Delete

                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>

  );

}