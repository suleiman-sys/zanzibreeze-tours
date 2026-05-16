import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section className="relative py-32 px-6 overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop')",
        }}
      ></div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto text-center text-white">

        <p className="text-orange-400 uppercase tracking-[6px] mb-6 font-semibold">
          Start Your Journey
        </p>

        <h2 className="text-5xl md:text-7xl font-black leading-tight mb-8">

          Ready For Your
          <span className="text-orange-400">
            {" "}Next Adventure?
          </span>

        </h2>

        <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-12">

          Discover breathtaking Zanzibar beaches, unforgettable safaris,
          luxury experiences, and magical adventures crafted for travelers
          seeking extraordinary memories.

        </p>

        {/* BUTTONS */}
        <div className="flex flex-wrap justify-center gap-6">

          <Link
            to="/booking"
            className="bg-orange-500 hover:bg-orange-600 transition px-10 py-5 rounded-full font-semibold text-lg shadow-2xl shadow-orange-500/30"
          >
            Book Your Tour
          </Link>

          <a
            href="https://wa.me/255625996460"
            target="_blank"
            rel="noreferrer"
            className="border border-white/20 hover:bg-white/10 transition px-10 py-5 rounded-full font-semibold text-lg backdrop-blur-xl"
          >
            WhatsApp Inquiry
          </a>

        </div>

      </div>

    </section>
  );
}