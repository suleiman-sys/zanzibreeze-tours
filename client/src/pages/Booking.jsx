import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import LocationPicker from "../components/LocationPicker";

import { useTranslation } from "react-i18next";


export default function Booking() {


  const { t, i18n } = useTranslation();

  const isArabic = i18n.language === "ar";

  const location = useLocation();

  const selectedTour =
    location.state?.tour?.title ||
    location.state?.tour ||
    "";

  const [tours, setTours] = useState([]);

 const [formData, setFormData] = useState({

  fullName: "",
  email: "",
  phone: "",
  country: "",
  preferredTime: "",
  language: "English",
  pickupLocation: "",
  tour: "",
  travelDate: "",
  guests: "",
  message: "",
  price: 0,

});

  const [pricePerPerson, setPricePerPerson] =
    useState(0);

  const [totalPrice, setTotalPrice] =
    useState(0);

  const [successMessage, setSuccessMessage] =
    useState("");

  /* FETCH TOURS */

  useEffect(() => {

    fetchTours();

  }, []);

  const fetchTours = async () => {

    try {

      const response = await axios.get(
        "http://localhost:5000/api/tours"
      );

      setTours(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  /* AUTO SELECT TOUR */

  useEffect(() => {

    if (selectedTour) {

      setFormData((prev) => ({

        ...prev,

        tour: selectedTour,

      }));

    }

  }, [selectedTour]);

  /* HANDLE CHANGE */

 const handleChange = (e) => {

  const updatedForm = {

    ...formData,

    [e.target.name]:
      e.target.value,

  };

  /* AUTO TOUR PRICE */

  if (e.target.name === "tour") {

    const selectedTourData =
      tours.find(
        (tour) =>
          tour.title === e.target.value
      );

    const basePrice =
      Number(selectedTourData?.price || 0);

    updatedForm.price =
      basePrice;

    setPricePerPerson(
      basePrice
    );

    setTotalPrice(
      basePrice
    );

  }

  /* GUEST PRICING */

  if (e.target.name === "guests") {

    const guests =
      Number(e.target.value);

    const selectedTourData =
      tours.find(
        (tour) =>
          tour.title === updatedForm.tour
      );

    const basePrice =
      Number(selectedTourData?.price || 0);

    let finalPrice =
      basePrice;

    /* DISCOUNTS */

    if (guests === 2) {

      finalPrice =
        basePrice * 0.9;

    }

    else if (guests >= 3) {

      finalPrice =
        basePrice * 0.8;

    }

    setPricePerPerson(
      finalPrice
    );

    setTotalPrice(
      finalPrice * guests
    );

    updatedForm.price =
      finalPrice * guests;

  }

  setFormData(updatedForm);

};
  /* SUBMIT */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(

        "http://localhost:5000/api/bookings",

        formData

      );

      setSuccessMessage(
        response.data.message
      );

      setFormData({

  fullName: "",
  email: "",
  phone: "",
  country: "",
  preferredTime: "",
  language: "English",
  pickupLocation: "",
  tour: "",
  travelDate: "",
  guests: "",
  message: "",
  price: 0,

});

      setPricePerPerson(0);
      setTotalPrice(0);

    } catch (error) {

      console.log(error);

      alert("Booking failed");

    }

  };

  return (

    <section className="bg-[#081120] text-white min-h-screen pt-40 pb-24 px-6">

      <div className="max-w-5xl mx-auto">

        {/* HERO */}

        <div className={`mb-20 ${isArabic ? "text-right" : "text-center"}`}>

          <p className="text-orange-400 uppercase tracking-[5px] mb-5">

            {t("reserveAdventure")}

          </p>

          <h1 className="text-5xl md:text-7xl font-black mb-8">

            {t("bookYourTour")}

          </h1>

          <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">

            {t("bookingDesc")}

          </p>

        </div>

        {/* SUCCESS MESSAGE */}

        {successMessage && (

          <div className="bg-green-500/20 border border-green-500 text-green-300 p-5 rounded-2xl mb-8 text-center font-semibold">

            {successMessage}

          </div>

        )}

        {/* FORM */}

        <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 md:p-14">

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-8"
          >

            {/* FULL NAME */}

            <div>

              <label className="block mb-3 text-gray-300">

                {t("fullName")}

              </label>

              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder={t("enterFullName")}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
                required
              />

            </div>

            {/* EMAIL */}

            <div>

              <label className="block mb-3 text-gray-300">

                {t("emailAddress")}

              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t("enterEmail")}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
                required
              />

            </div>

            {/* PHONE */}

            {/* COUNTRY */}

<div>

  <label className="block mb-3 text-gray-300">

    Country

  </label>

  <input
    type="text"
    name="country"
    value={formData.country}
    onChange={handleChange}
    placeholder="Your country"
    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
    required
  />

</div>


         {/* WHATSAPP */}

<div>

  <label className="block mb-3 text-gray-300">

    WhatsApp Number

  </label>
<input
  type="text"
  name="phone"
  value={formData.phone}
  onChange={handleChange}
  placeholder="+255 712 345 678"
  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
  required
/>

<p className="text-sm text-gray-400 mt-2">

  Include country code

</p>

</div>

<LocationPicker
  formData={formData}
  setFormData={setFormData}
/>
            {/* TOUR */}

            <div>

              <label className="block mb-3 text-gray-300">

                {t("selectTour")}

              </label>

              <select
                name="tour"
                value={formData.tour}
                onChange={handleChange}
                className="w-full bg-[#081120] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
                required
              >

                <option value="">

                  {t("chooseTour")}

                </option>

                {tours.map((tour) => (

                  <option
                    key={tour.id}
                    value={tour.title}
                  >

                    {tour.title}

                  </option>

                ))}

              </select>

            </div>

            {/* DATE */}

            {/* PREFERRED TIME */}

<div>

  <label className="block mb-3 text-gray-300">

    Preferred Time

  </label>

  <select
    name="preferredTime"
    value={formData.preferredTime}
    onChange={handleChange}
    className="w-full bg-[#081120] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
  >

    <option value="">

      Select Time

    </option>

    <option value="Morning">

      Morning

    </option>

    <option value="Afternoon">

      Afternoon

    </option>

    <option value="Sunset">

      Sunset

    </option>

  </select>

</div>

{/* GUIDE LANGUAGE */}

<div>

  <label className="block mb-3 text-gray-300">

    Guide Language

  </label>

  <select
    name="language"
    value={formData.language}
    onChange={handleChange}
    className="w-full bg-[#081120] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
  >

    <option value="English">

      English

    </option>

    <option value="French">

      French

    </option>

    <option value="German">

      German

    </option>

    <option value="Arabic">

      Arabic

    </option>

  </select>

</div>

            <div>

              <label className="block mb-3 text-gray-300">

                {t("travelDate")}

              </label>

              <input
                type="date"
                name="travelDate"
                value={formData.travelDate}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
                required
              />

            </div>

            {/* GUESTS */}

            <div>

              <label className="block mb-3 text-gray-300">

                {t("numberGuests")}

              </label>

              <input
                type="number"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                placeholder={t("guestPlaceholder")}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
                required
              />

            </div>

            {/* PRICE SUMMARY */}

            <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8">

              <div className="flex items-center justify-between mb-5">

                <span className="text-gray-300 text-lg">

                  Price Per Person

                </span>

                <span className="text-orange-400 font-black text-3xl">

                  ${pricePerPerson}

                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="text-gray-300 text-lg">

                  Total Price

                </span>

                <span className="text-green-400 font-black text-4xl">

                  ${totalPrice}

                </span>

              </div>

            </div>

            {/* MESSAGE */}

            <div className="md:col-span-2">

              <label className="block mb-3 text-gray-300">

                {t("specialRequests")}

              </label>

              <textarea
                rows="6"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("specialRequestsPlaceholder")}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
              ></textarea>

            </div>

            {/* BUTTON */}

            <div className="md:col-span-2">

              <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl font-semibold text-lg"
              >

                {t("submitBooking")}

              </button>

            </div>

          </form>

        </div>

      </div>

    </section>

  );

}