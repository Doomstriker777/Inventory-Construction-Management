import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./EditExpense.css";

const EditExpense = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: ""
  });

  const fetchExpense = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/expense/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();

      if (data.success) {
        setForm({
          title: data.expense.title || "",
          amount: data.expense.amount || "",
          category: data.expense.category || "",
          date: data.expense.date
            ? data.expense.date.substring(0, 10)
            : ""
        });
      } else {
        toast.error("Expense not found");
      }
    } catch {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/expense/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...form,
          amount: Number(form.amount)
        })
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Expense updated successfully!");
        setTimeout(() => navigate("/expense"), 1200);
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="editexpense-container">
      <h2 className="editexpense-title">Edit Expense ✏️</h2>

      <form onSubmit={handleSubmit} className="editexpense-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="update-btn">
          Update Expense
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default EditExpense;