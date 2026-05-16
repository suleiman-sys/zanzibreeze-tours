import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Tours from "./pages/Tours";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Booking from "./pages/Booking";
import NotFound from "./pages/NotFound";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import FloatingWhatsApp from "./components/FloatingWhatsApp";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ProtectedRoute from "./components/ProtectedRoute";

import TourDetails from "./pages/TourDetails";

import ZanzibarExcursions from "./pages/ZanzibarExcursions";
import TanzaniaSafaris from "./pages/TanzaniaSafaris";
import WaterSports from "./pages/WaterSports";
import VipTransfers from "./pages/VipTransfers";
import HoneymoonPackages from "./pages/HoneymoonPackages";

import Destinations from "./pages/Destinations";
import Gallery from "./pages/Gallery";
import Services from "./pages/Services";

import AdminBookings from "./pages/AdminBookings";
import AdminContacts from "./pages/AdminContacts";
import AdminLogin from "./pages/AdminLogin";
import AdminTours from "./pages/AdminTours";
import AdminContent from "./pages/AdminContent";
import AdminDashboard from "./pages/AdminDashboard";
import AdminCategories from "./pages/AdminCategories";
import AdminDestinations from "./pages/AdminDestinations";
import AdminGallery from "./pages/AdminGallery";
import AdminHero from "./pages/AdminHero";
import BusinessDashboard from "./pages/BusinessDashboard";
import AdminExpenses from "./pages/AdminExpenses";
import AdminCalendar from "./pages/AdminCalendar";

export default function App() {

  const location =
    useLocation();

  const isAdminPage =
    location.pathname.startsWith(
      "/admin"
    );

  return (

    <div className="bg-[#081120] min-h-screen text-white">

      {/* SHOW NAVBAR ONLY ON PUBLIC PAGES */}

      {!isAdminPage && <Navbar />}

      <div className={

        !isAdminPage
          ? "pt-32"
          : ""

      }>

        <Routes>

          {/* PUBLIC ROUTES */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/tours"
            element={<Tours />}
          />

          <Route
            path="/tour/:slug"
            element={<TourDetails />}
          />

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/booking"
            element={<Booking />}
          />

          <Route
            path="/zanzibar-excursions"
            element={<ZanzibarExcursions />}
          />

          <Route
            path="/tanzania-safaris"
            element={<TanzaniaSafaris />}
          />

          <Route
            path="/water-sports"
            element={<WaterSports />}
          />

          <Route
            path="/vip-transfers"
            element={<VipTransfers />}
          />

          <Route
            path="/honeymoon-packages"
            element={<HoneymoonPackages />}
          />

          <Route
            path="/destinations"
            element={<Destinations />}
          />

          <Route
            path="/gallery"
            element={<Gallery />}
          />

          <Route
            path="/services"
            element={<Services />}
          />

          {/* ADMIN LOGIN */}

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          {/* PROTECTED ADMIN ROUTES */}

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/tours"
            element={
              <ProtectedRoute>
                <AdminTours />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/categories"
            element={
              <ProtectedRoute>
                <AdminCategories />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/content"
            element={
              <ProtectedRoute>
                <AdminContent />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/bookings"
            element={
              <ProtectedRoute>
                <AdminBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/contacts"
            element={
              <ProtectedRoute>
                <AdminContacts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/destinations"
            element={
              <ProtectedRoute>
                <AdminDestinations />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/gallery"
            element={
              <ProtectedRoute>
                <AdminGallery />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/hero"
            element={
              <ProtectedRoute>
                <AdminHero />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/expenses"
            element={
              <ProtectedRoute>
                <AdminExpenses />
              </ProtectedRoute>
            }
          />

          {/* 404 */}

          <Route
            path="*"
            element={<NotFound />}
          />

          {/* BUSINESS DASHBOARD */}

         <Route
            path="/admin/business-dashboard"
            element={<BusinessDashboard />}
          />


        <Route
  path="/admin/calendar"
  element={<AdminCalendar />}
/>



        </Routes>

        

      </div>

      {/* SHOW FOOTER ONLY ON PUBLIC PAGES */}

      {!isAdminPage && <Footer />}

      {/* FLOATING BUTTONS ONLY ON PUBLIC PAGES */}

      {!isAdminPage && (

        <>

          <FloatingWhatsApp />

          <ScrollToTopButton />

        </>

      )}

    </div>

  );

}