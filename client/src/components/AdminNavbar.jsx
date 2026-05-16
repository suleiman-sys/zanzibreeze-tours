import {

  FaClipboardList,
  FaEnvelope,
  FaSignOutAlt,
  FaTachometerAlt,
  FaMapMarkedAlt,
  FaEdit,
  FaLayerGroup,
  FaGlobeAfrica,
  FaImages,
  FaChartPie,
  FaMoneyBillWave,
  FaCalendarAlt,

} from "react-icons/fa";

import {

  Link,
  useLocation,
  useNavigate,

} from "react-router-dom";

export default function AdminNavbar() {

  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = () => {

    localStorage.removeItem("adminAuth");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");

    navigate("/admin/login");

  };

  const menuItems = [

    {

      title: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin/dashboard",

    },

    {

      title: "Business Dashboard",
      icon: <FaChartPie />,
      path: "/admin/business-dashboard",

    },

    {

      title: "Tours",
      icon: <FaMapMarkedAlt />,
      path: "/admin/tours",

    },

    {

      title: "Categories",
      icon: <FaLayerGroup />,
      path: "/admin/categories",

    },

    {

      title: "Bookings",
      icon: <FaClipboardList />,
      path: "/admin/bookings",

    },

    {

      title: "Calendar",
      icon: <FaCalendarAlt />,
      path: "/admin/calendar",

    },

    {

      title: "Expenses",
      icon: <FaMoneyBillWave />,
      path: "/admin/expenses",

    },

    {

      title: "Contacts",
      icon: <FaEnvelope />,
      path: "/admin/contacts",

    },

    {

      title: "Website CMS",
      icon: <FaEdit />,
      path: "/admin/content",

    },

    {

      title: "Destinations",
      icon: <FaGlobeAfrica />,
      path: "/admin/destinations",

    },

    {

      title: "Gallery",
      icon: <FaImages />,
      path: "/admin/gallery",

    },

    {

      title: "Hero Section",
      icon: <FaEdit />,
      path: "/admin/hero",

    },

  ];

  return (

    <div className="w-[300px] h-screen overflow-y-auto bg-[#0d1726] border-r border-white/10 fixed left-0 top-0 p-8 z-50 flex flex-col">

      {/* LOGO */}

      <div className="mb-16">

        <p className="text-orange-400 uppercase tracking-[5px] mb-3">

          Admin Panel

        </p>

        <h1 className="text-4xl font-black leading-tight">

          Zanzibreeze Tours & Safari

        </h1>

      </div>

      {/* MENU */}

      <div className="space-y-4 flex-1">

        {menuItems.map((item, index) => (

          <Link
            key={index}
            to={item.path}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition font-semibold text-lg

            ${

              location.pathname === item.path

                ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"

                : "bg-white/5 hover:bg-white/10"

            }`}
          >

            <div className="text-xl">

              {item.icon}

            </div>

            <span>

              {item.title}

            </span>

          </Link>

        ))}

      </div>

      {/* LOGOUT */}

      <div className="pt-10 pb-6">

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 transition px-5 py-4 rounded-2xl font-semibold text-lg"
        >

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>

  );

}