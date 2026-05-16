import { useEffect, useState } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminExpenses() {

  const [expenses, setExpenses] =
    useState([]);

  const [formData, setFormData] =
    useState({

      title: "",
      amount: "",
      category: "",
      expense_date: "",
      notes: "",

    });

  useEffect(() => {

    fetchExpenses();

  }, []);

  const fetchExpenses = async () => {

    try {

      const token =
        localStorage.getItem("adminToken");

      const response = await axios.get(
        "http://localhost:5000/api/expenses",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExpenses(response.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem("adminToken");

      await axios.post(
        "http://localhost:5000/api/expenses",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFormData({

        title: "",
        amount: "",
        category: "",
        expense_date: "",
        notes: "",

      });

      fetchExpenses();

    } catch (error) {

      console.log(error);

    }

  };

  const deleteExpense = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this expense?"
      );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem("adminToken");

      await axios.delete(
        `http://localhost:5000/api/expenses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchExpenses();

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <section className="bg-[#081120] text-white min-h-screen pt-20 pb-24 px-6 ml-[320px]">

      <div className="max-w-7xl mx-auto">

        <AdminNavbar />

        {/* HEADER */}

        <div className="mb-14">

          <p className="text-orange-400 uppercase tracking-[5px] mb-5">

            Financial Management

          </p>

          <h1 className="text-6xl font-black mb-6">

            Expenses

          </h1>

          <p className="text-gray-400 text-lg">

            Track business expenses and financial records.

          </p>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6 bg-white/5 border border-white/10 rounded-[35px] p-10 mb-16"
        >

          <input
            type="text"
            name="title"
            placeholder="Expense Title"
            value={formData.title}
            onChange={handleChange}
            className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <input
            type="date"
            name="expense_date"
            value={formData.expense_date}
            onChange={handleChange}
            className="bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
            required
          />

          <textarea
            rows="4"
            name="notes"
            placeholder="Notes"
            value={formData.notes}
            onChange={handleChange}
            className="md:col-span-2 bg-[#0d1726] border border-white/10 rounded-2xl px-5 py-4 outline-none"
          ></textarea>

          <button
            type="submit"
            className="md:col-span-2 bg-orange-500 hover:bg-orange-600 transition py-5 rounded-2xl font-bold text-lg"
          >

            Add Expense

          </button>

        </form>

        {/* TABLE */}

        <div className="overflow-x-auto rounded-[35px] border border-white/10 bg-white/5">

          <table className="w-full min-w-[1000px]">

            <thead className="bg-orange-500 text-white">

              <tr>

                <th className="text-left px-6 py-5">
                  Title
                </th>

                <th className="text-left px-6 py-5">
                  Amount
                </th>

                <th className="text-left px-6 py-5">
                  Category
                </th>

                <th className="text-left px-6 py-5">
                  Date
                </th>

                <th className="text-left px-6 py-5">
                  Notes
                </th>

                <th className="text-left px-6 py-5">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {expenses.map((expense) => (

                <tr
                  key={expense.id}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >

                  <td className="px-6 py-5 font-semibold">
                    {expense.title}
                  </td>

                  <td className="px-6 py-5 text-orange-400 font-bold">
                    ${expense.amount}
                  </td>

                  <td className="px-6 py-5">
                    {expense.category}
                  </td>

                  <td className="px-6 py-5">
                    {expense.expense_date}
                  </td>

                  <td className="px-6 py-5 max-w-[300px]">
                    {expense.notes}
                  </td>

                  <td className="px-6 py-5">

                    <button
                      onClick={() =>
                        deleteExpense(expense.id)
                      }
                      className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-xl font-semibold"
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </section>

  );

}