const services = [

  {
    title: "Luxury Tours",
    description:
      "Experience unforgettable luxury tours across Zanzibar and Tanzania.",
    icon: "🌍",
  },

  {
    title: "Airport Transfers",
    description:
      "Private airport pickups and VIP transportation services.",
    icon: "🚐",
  },

  {
    title: "Hotel Booking",
    description:
      "Premium hotel and resort booking services for your stay.",
    icon: "🏨",
  },

  {
    title: "Safari Adventures",
    description:
      "Explore Tanzania wildlife parks with unforgettable safari experiences.",
    icon: "🦁",
  },

  {
    title: "Water Sports",
    description:
      "Jetski, snorkeling, diving, parasailing and ocean adventures.",
    icon: "🌊",
  },

  {
    title: "Honeymoon Packages",
    description:
      "Romantic beach escapes and luxury honeymoon experiences.",
    icon: "❤️",
  },

];

export default function Services() {

  return (
    <section className="bg-[#081120] text-white min-h-screen pt-40 pb-24 px-6">

      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-24">

          <p className="text-orange-400 uppercase tracking-[6px] mb-6 font-semibold">
            What We Offer
          </p>

          <h1 className="text-5xl md:text-7xl font-black leading-tight mb-8">

            Premium
            <span className="text-orange-400">
              {" "}Travel Services
            </span>

          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">

            Discover luxury tourism services crafted to make
            your Zanzibar and Tanzania experience unforgettable.

          </p>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

          {services.map((service, index) => (

            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-[35px] p-10 hover:-translate-y-3 transition duration-500"
            >

              <div className="text-6xl mb-8">
                {service.icon}
              </div>

              <h2 className="text-3xl font-black mb-6">
                {service.title}
              </h2>

              <p className="text-gray-400 leading-relaxed text-lg">
                {service.description}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}