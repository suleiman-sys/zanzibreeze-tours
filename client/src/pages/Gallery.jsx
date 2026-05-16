import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

export default function Gallery() {

  const [galleryImages, setGalleryImages] =
    useState([]);

  const [selectedImage, setSelectedImage] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchGallery();

  }, []);

  const fetchGallery = async () => {

    try {

      setLoading(true);

      const response =
        await API.get(

          "/api/gallery"

        );

      setGalleryImages(response.data);

      setLoading(false);

    } catch (error) {

      console.log(error);

      setLoading(false);

    }

  };

  return (

    <section className="bg-[#081120] text-white min-h-screen pt-40 pb-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}

        <div className="text-center mb-24">

          <p className="text-orange-400 uppercase tracking-[5px] mb-5">

            Travel Moments

          </p>

          <h1 className="text-6xl md:text-7xl font-black mb-8">

            Our Gallery

          </h1>

          <p className="text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">

            Explore unforgettable experiences, luxury adventures,
            breathtaking beaches, wildlife safaris, and magical
            Zanzibar moments captured through our journeys.

          </p>

        </div>

        {/* LOADING */}

        {loading ? (

          <div className="text-center text-gray-400 text-xl py-20">

            Loading gallery...

          </div>

        ) : galleryImages.length === 0 ? (

          <div className="text-center text-gray-400 text-xl py-20">

            No gallery images found.

          </div>

        ) : (

          /* GALLERY GRID */

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {galleryImages.map((item) => (

              <div
                key={item.id}
                className="group bg-white/5 border border-white/10 rounded-[30px] overflow-hidden"
              >

                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[350px] object-cover group-hover:scale-110 transition duration-700"
                  />

                </div>

                <div className="p-8">

                  <h2 className="text-3xl font-bold mb-4">

                    {item.title}

                  </h2>

                  <button
                    onClick={() =>
                      setSelectedImage(item)
                    }
                    className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-2xl font-semibold"
                  >

                    View More

                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

      {/* MODAL */}

      {selectedImage && (

        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-[100] flex items-center justify-center px-6">

          <div className="bg-[#081120] border border-white/10 rounded-[40px] overflow-hidden max-w-4xl w-full relative">

            {/* CLOSE */}

            <button
              onClick={() =>
                setSelectedImage(null)
              }
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-orange-500 transition text-2xl"
            >

              ×

            </button>

            {/* IMAGE */}

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full h-[500px] object-cover"
            />

            {/* CONTENT */}

            <div className="p-10">

              <h2 className="text-5xl font-black mb-6">

                {selectedImage.title}

              </h2>

            </div>

          </div>

        </div>

      )}

    </section>

  );

}