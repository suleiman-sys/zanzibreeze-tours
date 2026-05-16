import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(

        "http://localhost:5000/api/admin/login",

        {

          email,
          password,

        }

      );

      /* SAVE TOKEN */

      localStorage.setItem(

        "adminToken",

        response.data.token

      );

      localStorage.setItem(

        "adminAuth",

        "true"

      );

      /* SAVE ADMIN */

      localStorage.setItem(

        "adminData",

        JSON.stringify(
          response.data.admin
        )

      );

      navigate("/admin/dashboard");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.error ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <section className="bg-[#081120] text-white min-h-screen flex items-center justify-center px-6">

      <div className="w-full max-w-xl bg-white/5 border border-white/10 rounded-[40px] p-10 backdrop-blur-2xl shadow-2xl">

        {/* HEADER */}
        <div className="text-center mb-10">

          <p className="text-orange-400 uppercase tracking-[5px] mb-4">

            Admin Panel

          </p>

          <h1 className="text-5xl font-black">

            Secure Login

          </h1>

        </div>

        {/* FORM */}
        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          {/* EMAIL */}
          <div>

            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full bg-[#0d1726] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
              required
            />

          </div>

          {/* PASSWORD */}
          <div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full bg-[#0d1726] border border-white/10 rounded-2xl px-6 py-5 outline-none focus:border-orange-500"
              required
            />

          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl font-semibold text-lg disabled:opacity-50"
          >

            {

              loading

                ? "Logging in..."

                : "Login"

            }

          </button>

        </form>

      </div>

    </section>
  );
}