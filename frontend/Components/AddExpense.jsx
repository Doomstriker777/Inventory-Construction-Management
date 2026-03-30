import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./AddExpense.css";

const AddExpense = () => {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    date: new Date().toISOString().substring(0, 10)
  });

  const navigate = useNavigate();

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
      const res = await fetch(`${import.meta.env.VITE_API_URL}/expense/add`, {
        method: "POST",
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
        toast.success("Expense added successfully");
        setTimeout(() => navigate("/expense"), 1200);
      } else {
        toast.error(data.message || "Failed to add expense");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="addexpense-container">
      <h2 className="addexpense-title">Add Expense</h2>

      <form onSubmit={handleSubmit} className="addexpense-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Expense title"
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
            placeholder="Amount"
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
            placeholder="Category (Food, Transport...)"
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

        <button type="submit" className="save-btn">
          Save Expense
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default AddExpense;