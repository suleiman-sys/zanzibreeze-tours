import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/255625996460"
      target="_blank"
      rel="noreferrer"
      className="fixed left-6 bottom-6 z-[999] w-16 h-16 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white text-4xl shadow-2xl hover:scale-110 transition duration-300"
    >
      <FaWhatsapp />
    </a>
  );
}