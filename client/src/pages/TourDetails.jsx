import {
  useParams,
  Link,
  useNavigate,
} from "react-router-dom";

import { useTranslation } from "react-i18next";

import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

export default function TourDetails() {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const { slug } = useParams();

  const [tour, setTour] = useState(null);

  const [relatedTours, setRelatedTours] =
    useState([]);

  useEffect(() => {

    fetchTour();

    window.scrollTo(0, 0);

  }, [slug]);

  const fetchTour = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tours`
      );

      const tours = response.data;

      const foundTour = tours.find(

        (item) =>

          item.slug
            ?.trim()
            .toLowerCase() ===

          slug
            ?.trim()
            .toLowerCase()

      );

      setTour(foundTour);

      if (foundTour) {

        const related = tours
          .filter(

            (item) =>

              item.category ===
                foundTour.category &&

              item.id !== foundTour.id

          )
          .slice(0, 3);

        setRelatedTours(related);

      }

    } catch (error) {

      console.log(error);

    }

  };

  if (!tour) {

    return (
      <section className="bg-[#081120] text-white min-h-screen flex items-center justify-center px-6">

        <div className="text-center">

          <h1 className="text-5xl md:text-7xl font-black mb-6">

            {t("tourNotFound")}

          </h1>

          <p className="text-gray-400 text-lg mb-10">

            The tour you are looking for does not exist.

          </p>

          <button
            onClick={() =>
              navigate("/tours")
            }
            className="bg-orange-500 hover:bg-orange-600 transition px-8 py-4 rounded-2xl font-semibold text-lg"
          >

            Back To Tours

          </button>

        </div>

      </section>
    );
  }

  return (
    <section className="bg-[#081120] text-white min-h-screen pt-36 pb-24">

      <div className="max-w-7xl mx-auto px-6">

        {/* HERO IMAGE */}
       <div className="relative rounded-[40px] overflow-hidden mb-24 flex justify-center py-6">

         <img
            src={tour.image}
            alt={tour.title}
            className="w-full max-w-[900px] object-contain rounded-[40px]"
          />



        </div>

        {/* MAIN GRID */}
        <div className="grid lg:grid-cols-3 gap-10">

          {/* LEFT SIDE */}
          <div className="lg:col-span-2">

            {/* INFO BOXES */}
            <div className="grid md:grid-cols-3 gap-6 mb-16">

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center min-h-[180px] flex flex-col justify-center">

                <h3 className="text-orange-400 text-2xl md:text-3xl font-black mb-4">

                  {tour.duration}

                </h3>

                <p className="text-gray-400">

                  {t("duration")}

                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center min-h-[180px] flex flex-col justify-center">

                <h3 className="text-orange-400 text-3xl font-black mb-4">

                  📍

                </h3>

                <p className="text-gray-400">

                  {tour.location}

                </p>

              </div>

              <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center min-h-[180px] flex flex-col justify-center">

                <h3 className="text-orange-400 text-3xl font-black mb-4">

                  ⭐ {tour.rating}

                </h3>

                <p className="text-gray-400">

                  {t("rating")}

                </p>

              </div>

            </div>

            {/* OVERVIEW */}
            <div className="mb-20 bg-white/5 border border-white/10 rounded-[35px] p-8 md:p-12">

              <h2 className="text-4xl md:text-5xl font-black mb-8">

                Tour Overview

              </h2>

              <p className="text-gray-300 text-lg md:text-xl leading-relaxed">

                {tour.description}

              </p>

            </div>

            {/* TOUR HIGHLIGHTS */}

<div className="mb-20 bg-white/5 border border-white/10 rounded-[35px] p-8 md:p-12">

  <h2 className="text-4xl md:text-5xl font-black mb-10">

    Tour Highlights

  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    {tour.highlights
      ?.split("•")
      .filter((item) => item.trim() !== "")
      .map((item, index) => (

        <div
          key={index}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4"
        >

          <div className="text-orange-400 text-2xl">

            ✓

          </div>

          <p className="text-lg text-gray-300">

            {item}

          </p>

        </div>

      ))}

  </div>

</div>

{/* INCLUDED SERVICES */}

<div className="mb-20 bg-white/5 border border-white/10 rounded-[35px] p-8 md:p-12">

  <h2 className="text-4xl md:text-5xl font-black mb-10">

    Included Services

  </h2>

  <div className="grid md:grid-cols-2 gap-6">

    {tour.included
      ?.split("•")
      .filter((item) => item.trim() !== "")
      .map((item, index) => (

        <div
          key={index}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-4"
        >

          <div className="text-orange-400 text-2xl">

            ✓

          </div>

          <p className="text-lg text-gray-300">

            {item}

          </p>

        </div>

      ))}

  </div>

</div>

{/* TOUR ITINERARY */}

<div className="mb-20 bg-white/5 border border-white/10 rounded-[35px] p-8 md:p-12">

  <h2 className="text-4xl md:text-5xl font-black mb-10">

    Tour Itinerary

  </h2>

  <div className="space-y-6">

    {tour.itinerary
      ?.split("\n")
      .filter((item) => item.trim() !== "")
      .map((item, index) => (

        <div
          key={index}
          className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-center gap-5"
        >

          <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center font-black text-lg">

            {index + 1}

          </div>

          <p className="text-lg text-gray-300">

            {item}

          </p>

        </div>

      ))}

  </div>

</div>

            {/* GALLERY */}
            <div>

              <h2 className="text-4xl md:text-5xl font-black mb-10">

                Tour Gallery

              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-auto rounded-3xl block"
                  />
                  </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div>

            <div className="sticky top-32 bg-white/5 border border-white/10 rounded-[35px] p-8 backdrop-blur-xl shadow-2xl">

              <p className="text-gray-400 mb-3">

                Starting From

              </p>

              <h2 className="text-5xl md:text-6xl font-black text-orange-400 mb-10">

                ${tour.price}

              </h2>

              <div className="space-y-5">

                <Link
                  to="/booking"
                  state={{
                    tour: tour.title,
                  }}
                  className="block text-center w-full bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl font-semibold text-lg"
                >

                  Book Now

                </Link>

                <a
                  href={`https://wa.me/255625996460?text=Hello%20Summer%20Breeze%20Tours,%20I%20would%20like%20to%20book%20${tour.title}`}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center w-full border border-white/10 hover:bg-white/10 transition py-5 rounded-2xl font-semibold text-lg"
                >

                  WhatsApp Inquiry

                </a>

              </div>

              <div className="border-t border-white/10 mt-10 pt-10 space-y-6">

                <div className="flex justify-between">

                  <span className="text-gray-400">

                    Duration

                  </span>

                  <span>

                    {tour.duration}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-400">

                    Location

                  </span>

                  <span>

                    {tour.location}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-gray-400">

                    Rating

                  </span>

                  <span>

                    ⭐ {tour.rating}

                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* RELATED TOURS */}
        <div className="mt-32">

          <div className="mb-16">

            <p className="text-orange-400 uppercase tracking-[4px] mb-4">

              More Experiences

            </p>

            <h2 className="text-5xl font-black">

              Related Tours

            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {relatedTours.map((item) => (

              <div
                key={item.id}
                className="group bg-white/5 border border-white/10 rounded-[30px] overflow-hidden hover:-translate-y-2 transition duration-500"
              >

                <div className="overflow-hidden">

                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[280px] object-cover group-hover:scale-110 transition duration-700"
                  />

                </div>

                <div className="p-8">

                  <div className="flex items-center justify-between mb-5">

                    <span className="text-orange-400">

                      {item.duration}

                    </span>

                    <span className="text-yellow-400">

                      ⭐ {item.rating}

                    </span>

                  </div>

                  <h3 className="text-3xl font-bold mb-4">

                    {item.title}

                  </h3>

                  <p className="text-gray-400 mb-8 line-clamp-3">

                    {item.description}

                  </p>

                  <div className="flex items-center justify-between">

                    <h2 className="text-3xl font-black text-orange-400">

                      ${item.price}

                    </h2>

                    <Link
                      to={`/tour/${item.slug}`}
                      className="bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-2xl font-semibold"
                    >

                      View Tour

                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}