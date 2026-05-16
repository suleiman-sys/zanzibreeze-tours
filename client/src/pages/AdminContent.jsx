import { useEffect, useState } from "react";

import API from "../services/api";

import AdminNavbar from "../components/AdminNavbar";

export default function AdminContent() {

  const [content, setContent] =
    useState([]);

  useEffect(() => {

    fetchContent();

  }, []);

  const fetchContent = async () => {

    try {

      const response = await API.get(
        "/api/content"
      );

      setContent(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (

    id,
    field,
    value

  ) => {

    setContent(

      content.map((item) =>

        item.id === id

          ? {

              ...item,

              [field]: value,

            }

          : item

      )

    );

  };

  const updateContent = async (item) => {

    const token =
      localStorage.getItem(
        "adminToken"
      );

    try {

      let imageUrl =
        item.image;

      /* IMAGE UPLOAD */

      if (
        item.image instanceof File
      ) {

        const imageData =
          new FormData();

        imageData.append(
          "image",
          item.image
        );

        const uploadResponse =
          await API.post(

            "/api/upload",

            imageData

          );

        imageUrl =
          uploadResponse.data.imageUrl;

      }

      await API.put(

        `http://localhost:5000/api/content/${item.id}`,

        {

          title: item.title,

          subtitle:
            item.subtitle,

          description:
            item.description,

          button_text:
            item.button_text,

          button_link:
            item.button_link,

          image: imageUrl,

        },

        {

          headers: {

            Authorization:
              `Bearer ${token}`,

          },

        }

      );

      alert(
        "Content updated!"
      );

      fetchContent();

    } catch (error) {

      console.log(error);

      alert(

        error.response?.data
          ?.error ||

        "Update failed"

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

            Website CMS

          </h1>

          <p className="text-gray-400 text-lg">

            Manage homepage and website content dynamically.

          </p>

        </div>

        {/* CONTENT */}
        <div className="space-y-10">

          {content.map((item) => (

            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-[35px] p-10"
            >

              <h2 className="text-3xl font-black mb-8 capitalize text-orange-400">

                {item.section_name}

              </h2>

              <div className="grid gap-6">

                {/* TITLE */}
                <input
                  type="text"
                  placeholder="Title"
                  value={item.title || ""}
                  onChange={(e) =>

                    handleChange(

                      item.id,

                      "title",

                      e.target.value

                    )

                  }
                  className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                />

                {/* SUBTITLE */}
                <input
                  type="text"
                  placeholder="Subtitle"
                  value={item.subtitle || ""}
                  onChange={(e) =>

                    handleChange(

                      item.id,

                      "subtitle",

                      e.target.value

                    )

                  }
                  className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                />

                {/* DESCRIPTION */}
                <textarea
                  rows="5"
                  placeholder="Description"
                  value={item.description || ""}
                  onChange={(e) =>

                    handleChange(

                      item.id,

                      "description",

                      e.target.value

                    )

                  }
                  className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                ></textarea>

                {/* BUTTON TEXT */}
                <input
                  type="text"
                  placeholder="Button Text"
                  value={item.button_text || ""}
                  onChange={(e) =>

                    handleChange(

                      item.id,

                      "button_text",

                      e.target.value

                    )

                  }
                  className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                />

                {/* BUTTON LINK */}
                <input
                  type="text"
                  placeholder="Button Link"
                  value={item.button_link || ""}
                  onChange={(e) =>

                    handleChange(

                      item.id,

                      "button_link",

                      e.target.value

                    )

                  }
                  className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                />

                {/* IMAGE */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>

                    handleChange(

                      item.id,

                      "image",

                      e.target.files[0]

                    )

                  }
                  className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
                />

                {/* BUTTON */}
                <button
                  onClick={() =>
                    updateContent(item)
                  }
                  className="bg-orange-500 hover:bg-orange-600 transition py-4 rounded-2xl font-semibold text-lg"
                >

                  Save Changes

                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}