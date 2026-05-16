import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function AdminCategories() {

  const [categories, setCategories] =
    useState([]);

  const [name, setName] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [editingId, setEditingId] =
    useState(null);

  const token =
    localStorage.getItem("adminToken");

  useEffect(() => {

    fetchCategories();

  }, []);

  const fetchCategories = async () => {

    try {

      const response =
        await axios.get(

          `${import.meta.env.VITE_API_URL}/api/categories`

        );

      setCategories(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      /* UPDATE */
      if (editingId) {

        await axios.put(

          `${import.meta.env.VITE_API_URL}/api/categories/${editingId}`,

          {
            name,
            slug,
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

          `${import.meta.env.VITE_API_URL}/api/categories`,

          {
            name,
            slug,
          },

          {
            headers: {

              Authorization:
                `Bearer ${token}`,

            },
          }

        );

      }

      setName("");
      setSlug("");
      setEditingId(null);

      fetchCategories();

    } catch (error) {

      console.log(error);

    }

  };

  const handleDelete = async (id) => {

    try {

      await axios.delete(

        `${import.meta.env.VITE_API_URL}/api/categories/${id}`,

        {
          headers: {

            Authorization:
              `Bearer ${token}`,

          },
        }

      );

      fetchCategories();

    } catch (error) {

      console.log(error);

    }

  };

  const handleEdit = (item) => {

    setEditingId(item.id);

    setName(item.name);

    setSlug(item.slug);

    window.scrollTo({

      top: 0,
      behavior: "smooth",

    });

  };

  return (
    <section className="min-h-screen bg-[#081120] text-white pl-[300px] py-20 px-10">

      <div className="max-w-5xl">

        <h1 className="text-5xl font-black mb-4">

          Categories CMS

        </h1>

        <p className="text-gray-400 mb-12">

          Create, edit and manage tour categories.

        </p>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-[35px] p-8 mb-16"
        >

          <div className="grid md:grid-cols-2 gap-6 mb-6">

            <input
              type="text"
              placeholder="Category Name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              required
            />

            <input
              type="text"
              placeholder="category-slug"
              value={slug}
              onChange={(e) =>
                setSlug(e.target.value)
              }
              className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-4 rounded-2xl font-semibold"
          >

            {

              editingId

                ? "Update Category"

                : "Add Category"

            }

          </button>

        </form>

        {/* LIST */}
        <div className="space-y-5">

          {categories.map((item) => (

            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-between"
            >

              <div>

                <h2 className="text-2xl font-bold mb-2">

                  {item.name}

                </h2>

                <p className="text-gray-400">

                  {item.slug}

                </p>

              </div>

              <div className="flex gap-4">

                {/* EDIT */}
                <button
                  onClick={() =>
                    handleEdit(item)
                  }
                  className="bg-blue-500 hover:bg-blue-600 transition px-5 py-3 rounded-2xl"
                >

                  Edit

                </button>

                {/* DELETE */}
                <button
                  onClick={() =>
                    handleDelete(item.id)
                  }
                  className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-2xl"
                >

                  Delete

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}