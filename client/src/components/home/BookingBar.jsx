import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function BookingBar() {

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [destination, setDestination] = useState("Zanzibar");
  const [tourType, setTourType] = useState("Luxury Safari");
  const [guests, setGuests] = useState("");
  const [date, setDate] = useState("");

  function handleSearch(e) {

    e.preventDefault();

    navigate("/tours", {
      state: {
        destination,
        tourType,
        guests,
        date,
      },
    });
  }

  return (
    <section className="relative z-20 mt-8 px-6">

      <div className="max-w-7xl mx-auto">

        <form
          onSubmit={handleSearch}
          className="bg-[#081120] border border-white/10 rounded-[35px] p-8 grid md:grid-cols-2 xl:grid-cols-5 gap-6 shadow-2xl"
        >

          {/* DESTINATION */}
          <div>

            <label className="block text-gray-400 mb-3">
              {t("destination")}
            </label>

            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
            >

              <option
                value="Zanzibar"
                className="bg-[#081120] text-white"
              >
                Zanzibar
              </option>

              <option
                value="Tanzania Mainland"
                className="bg-[#081120] text-white"
              >
                Tanzania Mainland
              </option>

              <option
                value="Serengeti"
                className="bg-[#081120] text-white"
              >
                Serengeti
              </option>

              <option
                value="Ngorongoro"
                className="bg-[#081120] text-white"
              >
                Ngorongoro
              </option>

              <option
                value="Mnemba Island"
                className="bg-[#081120] text-white"
              >
                Mnemba Island
              </option>

              <option
                value="Nungwi Beach"
                className="bg-[#081120] text-white"
              >
                Nungwi Beach
              </option>

              <option
                value="Kendwa Beach"
                className="bg-[#081120] text-white"
              >
                Kendwa Beach
              </option>

            </select>

          </div>

          {/* TOUR TYPE */}
          <div>

            <label className="block text-gray-400 mb-3">
              {t("tourType")}
            </label>

            <select
              value={tourType}
              onChange={(e) => setTourType(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
            >

              <option
                value="Luxury Safari"
                className="bg-[#081120] text-white"
              >
                Luxury Safari
              </option>

              <option
                value="Zanzibar Excursion"
                className="bg-[#081120] text-white"
              >
                Zanzibar Excursion
              </option>

              <option
                value="Water Sports"
                className="bg-[#081120] text-white"
              >
                Water Sports
              </option>

              <option
                value="Honeymoon Package"
                className="bg-[#081120] text-white"
              >
                Honeymoon Package
              </option>

              <option
                value="VIP Transfer"
                className="bg-[#081120] text-white"
              >
                VIP Transfer
              </option>

              <option
                value="Snorkeling Tour"
                className="bg-[#081120] text-white"
              >
                Snorkeling Tour
              </option>

              <option
                value="Beach Holiday"
                className="bg-[#081120] text-white"
              >
                Beach Holiday
              </option>

              <option
                value="Safari Blue"
                className="bg-[#081120] text-white"
              >
                Safari Blue
              </option>

            </select>

          </div>

          {/* GUESTS */}
          <div>

            <label className="block text-gray-400 mb-3">
              {t("guests")}
            </label>

            <input
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="2 Guests"
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white placeholder:text-gray-500"
            />

          </div>

          {/* DATE */}
          <div>

            <label className="block text-gray-400 mb-3">
              {t("travelDate")}
            </label>

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none text-white"
            />

          </div>

          {/* BUTTON */}
          <div className="flex items-end">

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 transition duration-300 py-5 rounded-2xl font-semibold text-lg text-white"
            >
              {t("searchTours")}
            </button>

          </div>

        </form>

      </div>

    </section>
  );
}