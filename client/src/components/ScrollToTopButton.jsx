import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollToTopButton() {

  const [visible, setVisible] = useState(false);

  useEffect(() => {

    function handleScroll() {
      setVisible(window.scrollY > 300);
    }

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);

  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      {visible && (

        <button
          onClick={scrollToTop}
          className="fixed right-6 bottom-6 z-[999] w-14 h-14 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white text-xl shadow-2xl hover:scale-110 transition duration-300"
        >
          <FaArrowUp />
        </button>

      )}
    </>
  );
}