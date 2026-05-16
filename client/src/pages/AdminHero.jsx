import { useEffect, useState } from "react";

import API from "../services/api";

import toast from "react-hot-toast";

import AdminNavbar from "../components/AdminNavbar";

export default function AdminHero() {

  const [hero, setHero] = useState({

    title: "",
    subtitle: "",
    description: "",
    background_image: "",
    featured_image: "",
    featured_title: "",
    featured_price: "",
    featured_duration: "",

  });

  useEffect(() => {

    fetchHero();

  }, []);

  const fetchHero = async () => {

    try {

      const response =
        await API.get(
  "http://localhost:5000/api/hero"
);

      setHero(response.data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch hero section"
      );

    }

  };

  const handleChange = (e) => {

    setHero({

      ...hero,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.put(
  `http://localhost:5000/api/hero/${hero.id}`,

        hero

      );

      toast.success(
        "Hero updated successfully"
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to update hero"
      );

    }

  };

  return (

    <section className="bg-[#081120] text-white min-h-screen pt-20 pb-24 px-6 ml-[320px]">

      <div className="max-w-5xl mx-auto">

        <AdminNavbar />

        {/* HEADER */}

        <div className="mb-16">

          <h1 className="text-5xl font-black mb-5">

            Hero Section Management

          </h1>

          <p className="text-gray-400 text-lg">

            Update homepage hero section dynamically.

          </p>

        </div>

        {/* FORM */}

        <div className="bg-white/5 border border-white/10 rounded-[35px] p-10">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-6"
          >

            <input
              type="text"
              name="title"
              placeholder="Main Title"
              value={hero.title || ""}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              name="subtitle"
              placeholder="Subtitle"
              value={hero.subtitle || ""}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <textarea
              rows="5"
              name="description"
              placeholder="Description"
              value={hero.description || ""}
              onChange={handleChange}
              className="md:col-span-2 bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            ></textarea>

           <div className="md:col-span-2">

  <p className="mb-3 text-gray-400">

    Background Image

  </p>

  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const data =
        new FormData();

      data.append(
        "image",
        file
      );

      try {

        const res =
          await API.post(

            "/api/upload",

            data

          );

        setHero({

          ...hero,

          background_image:
            res.data.imageUrl,

        });

      } catch (err) {

        console.log(err);

      }

    }}
    className="w-full bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4"
  />

</div>

<div className="md:col-span-2">

  <p className="mb-3 text-gray-400">

    Featured Image

  </p>

  <input
    type="file"
    accept="image/*"
    onChange={async (e) => {

      const file =
        e.target.files[0];

      if (!file) return;

      const data =
        new FormData();

      data.append(
        "image",
        file
      );

      try {

        const res =
          await API.post(

            "/api/upload",

            data

          );

        setHero({

          ...hero,

          featured_image:
            res.data.imageUrl,

        });

      } catch (err) {

        console.log(err);

      }

    }}
    className="w-full bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4"
  />

</div>

            <input
              type="text"
              name="featured_title"
              placeholder="Featured Tour Title"
              value={hero.featured_title || ""}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              name="featured_price"
              placeholder="Featured Price"
              value={hero.featured_price || ""}
              onChange={handleChange}
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <input
              type="text"
              name="featured_duration"
              placeholder="Featured Duration"
              value={hero.featured_duration || ""}
              onChange={handleChange}
              className="md:col-span-2 bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            />

            <button
              type="submit"
              className="md:col-span-2 bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl font-semibold text-lg"
            >

              Update Hero Section

            </button>

          </form>

        </div>

      </div>

    </section>

  );

}