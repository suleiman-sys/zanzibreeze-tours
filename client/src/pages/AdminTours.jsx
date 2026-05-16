import { useEffect, useState } from "react";

import API from "../services/api";

import toast from "react-hot-toast";

import AdminNavbar from "../components/AdminNavbar";

export default function AdminTours() {

  const [tours, setTours] =
    useState([]);

  const [categories, setCategories] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [formData, setFormData] =
    useState({

      title: "",
      slug: "",
      category: "",
      section: "homepage",
      image: null,
      price: "",
      duration: "",
      rating: "",
      location: "",
      description: "",
      highlights: "",
      included: "",
      itinerary: "",

    });

  useEffect(() => {

    fetchTours();
    fetchCategories();

  }, []);

  const fetchTours = async () => {

    try {

      const response =
        await API.get(
          "/api/tours"
        );

      setTours(response.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch tours"
      );

    }

  };

  const fetchCategories = async () => {

    try {

      const response =
        await API.get(
          "/api/categories"
        );

      setCategories(response.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch categories"
      );

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

      /* IMAGE UPLOAD */

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
          await API.post(

            "/api/upload",

            imageData

          );

        imageUrl =
          uploadResponse.data.imageUrl;

      }

      /* UPDATE TOUR */

      if (editingId) {

        await API.put(

          `/api/tours/${editingId}`,

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

        toast.success(
          "Tour updated successfully"
        );

      }

      /* CREATE TOUR */

      else {

        await API.post(

          "/api/tours",

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

        toast.success(
          "Tour added successfully"
        );

      }

      fetchTours();

      setEditingId(null);

      setFormData({

        title: "",
        slug: "",
        category: "",
        section: "homepage",
        image: null,
        price: "",
        duration: "",
        rating: "",
        location: "",
        description: "",
        highlights: "",
        included: "",
        itinerary: "",

      });

    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.error ||

        "Action failed"

      );

    }

  };

  const deleteTour = async (id) => {

    const token =
      localStorage.getItem(
        "adminToken"
      );

    const confirmDelete =
      window.confirm(
        "Delete this tour?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(

        `/api/tours/${id}`,

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      fetchTours();

      toast.success(
        "Tour deleted successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.error ||

        "Delete failed"

      );

    }

  };

  return (

    <section className="bg-[#081120] text-white min-h-screen pt-20 pb-24 px-6 ml-[320px]">

      <div className="max-w-7xl mx-auto">

        <AdminNavbar />

        {/* HEADER */}

        <div className="mb-16">

          <h1 className="text-5xl font-black mb-5">

            Tour Management

          </h1>

          <p className="text-gray-400 text-lg">

            Create and manage tours dynamically.

          </p>

        </div>

        {/* FORM */}

        <div className="bg-white/5 border border-white/10 rounded-[35px] p-10 mb-16">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >

            {/* TITLE */}

            <input
              type="text"
              name="title"
              placeholder="Tour Title"
              value={formData.title}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              required
            />

            {/* SLUG */}

            <input
              type="text"
              name="slug"
              placeholder="tour-slug"
              value={formData.slug}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              required
            />

            {/* CATEGORY */}

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              required
            >

              <option value="">

                Select Category

              </option>

              {categories.map((item) => (

                <option
                  key={item.id}
                  value={item.name}
                >
                  {item.name}
                </option>

              ))}

            </select>

            {/* SECTION */}

            <select
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            >

             <option value="homepage">

                Homepage

              </option>

              <option value="excursions">

                Zanzibar Excursions

              </option>

              <option value="safaris">

                Tanzania Safaris

              </option>

              <option value="vip">

                VIP Transfer

              </option>

              <option value="watersports">

                Water Sports

              </option>

              <option value="honeymoon">

                Honeymoon Packages

              </option>

            </select>

            {/* IMAGE */}

            <input
              type="file"
              name="image"
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

            {/* PRICE */}

            <input
              type="text"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              required
            />

            {/* DURATION */}

            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              required
            />

            {/* RATING */}

            <input
              type="text"
              name="rating"
              placeholder="Rating"
              value={formData.rating}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              required
            />

            {/* LOCATION */}

            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              required
            />

            {/* DESCRIPTION */}

            <textarea
              rows="5"
              name="description"
              placeholder="Tour Description"
              value={formData.description}
              onChange={handleChange}
              className="md:col-span-2 bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              required
            ></textarea>
          
            {/* HIGHLIGHTS */}

            <textarea
              rows="4"
              name="highlights"
              placeholder="Tour Highlights"
              value={formData.highlights}
              onChange={handleChange}
              className="md:col-span-2 bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            ></textarea>

            {/* INCLUDED */}

            <textarea
              rows="4"
              name="included"
              placeholder="Included Services"
              value={formData.included}
              onChange={handleChange}
              className="md:col-span-2 bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            ></textarea>

            {/* ITINERARY */}

            <textarea
              rows="4"
              name="itinerary"
              placeholder="Tour Itinerary"
              value={formData.itinerary}
              onChange={handleChange}
              className="md:col-span-2 bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            ></textarea>

            {/* BUTTON */}

            <button
              type="submit"
              className="md:col-span-2 bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl font-semibold text-lg"
            >

              {

                editingId

                  ? "Update Tour"

                  : "Add Tour"

              }

            </button>

          </form>

        </div>

      </div>
      {/* TOURS LIST */}

<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

  {tours.map((tour) => (

    <div
      key={tour.id}
      className="bg-white/5 border border-white/10 rounded-[30px] overflow-hidden"
    >

      <img
        src={tour.image}
        alt={tour.title}
        className="w-full h-[250px] object-cover"
      />

      <div className="p-6">

        <div className="flex items-center justify-between mb-4">

          <h2 className="text-2xl font-black">

            {tour.title}

          </h2>

          <span className="text-orange-400">

            ${tour.price}

          </span>

        </div>

        <p className="text-gray-400 mb-6 line-clamp-3">

          {tour.description}

        </p>

        <div className="flex gap-4">

          {/* EDIT */}

          <button
            onClick={() => {

              setEditingId(tour.id);

              setFormData({

                title: tour.title,
                slug: tour.slug,
                category: tour.category,
                section: tour.section,
                image: tour.image,
                price: tour.price,
                duration: tour.duration,
                rating: tour.rating,
                location: tour.location,
                description: tour.description,
                highlights: tour.highlights,
                included: tour.included,
                itinerary: tour.itinerary,
                

              });

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });

            }}
            className="flex-1 bg-blue-500 hover:bg-blue-600 transition py-3 rounded-2xl font-semibold"
          >

            Edit

          </button>

          {/* DELETE */}

          <button
            onClick={() =>
              deleteTour(tour.id)
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
      
    </section>

  );

}