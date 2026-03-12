import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "./ExpensesOrg.css";

const ExpenseOrg = () => {
  const [expenses, setExpenses] = useState([]);
  const [displayExpenses, setDisplayExpenses] = useState([]);
  const [mainFilter, setMainFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");

  const navigate = useNavigate();

  const fetchExpenses = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await fetch("http://localhost:8080/expense/all", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (data.success) {
        setExpenses(data.expenses);
        setDisplayExpenses(data.expenses);
      } else {
        toast.error("Failed to fetch expenses");
      }
    } catch {
      toast.error("Server error");
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  useEffect(() => {
    let updated = [...expenses];

    if (mainFilter === "month" && monthFilter !== "") {
      updated = updated.filter(
        (exp) => new Date(exp.date).getMonth() + 1 === Number(monthFilter)
      );
    }

    if (mainFilter === "latest") {
      updated.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    if (mainFilter === "oldest") {
      updated.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    if (mainFilter === "high") {
      updated.sort((a, b) => b.amount - a.amount);
    }

    if (mainFilter === "low") {
      updated.sort((a, b) => a.amount - b.amount);
    }

    setDisplayExpenses(updated);
  }, [mainFilter, monthFilter, expenses]);

  const resetFilter = () => {
    setMainFilter("");
    setMonthFilter("");
    setDisplayExpenses(expenses);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    if (!window.confirm("Are you sure you want to delete this expense?"))
      return;

    try {
      const res = await fetch(
        `http://localhost:8080/expense/delete/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Expense deleted successfully");
        fetchExpenses();
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <div className="expense-container">

      {/* ===== HEADER SECTION ===== */}
      <div
        className="expense-header"
        style={{ marginBottom: "40px" }}
      >

        {/* Title + Back Row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginBottom: "10px"
          }}
        >
          <h1 className="expense-title" style={{ margin: 0 }}>
            Expenses
          </h1>

          <button
            onClick={() => navigate("/")}
            style={{
              background: "#e0ecff",
              color: "#1d4ed8",
              border: "none",
              padding: "10px 20px",
              borderRadius: "12px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#c7dbff";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#e0ecff";
              e.target.style.transform = "translateY(0)";
            }}
          >
            ⬅ Back
          </button>
        </div>

        <p className="subtitle" style={{ marginBottom: "25px" }}>
          Track and manage your spending
        </p>

        {/* Controls Row */}
        <div
          className="top-buttons"
          style={{
            marginTop: "10px",
            gap: "18px"
          }}
        >
          <div style={{ display: "flex", gap: "14px" }}>
            <select
              className="filter-dropdown"
              value={mainFilter}
              onChange={(e) => {
                setMainFilter(e.target.value);
                if (e.target.value !== "month") {
                  setMonthFilter("");
                }
              }}
            >
              <option value="">Filter / Sort</option>
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="high">Amount High → Low</option>
              <option value="low">Amount Low → High</option>
              <option value="month">Filter by Month</option>
            </select>

            {mainFilter === "month" && (
              <select
                className="sub-dropdown"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              >
                <option value="">Select Month</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            )}

            <button className="secondary-btn" onClick={resetFilter}>
              Reset
            </button>
          </div>

          <button
            className="primary-btn"
            onClick={() => navigate("/add-expense")}
          >
            + Add Expense
          </button>
        </div>
      </div>

      {/* ===== EXPENSE LIST ===== */}
      {displayExpenses.length === 0 ? (
        <p className="empty-text">No expenses found.</p>
      ) : (
        <div
          className="expense-list"
          style={{
            marginTop: "30px"
          }}
        >
          {displayExpenses.map((exp) => (
            <div className="expense-card" key={exp._id}>
              <div className="expense-info">
                <h3 className="expense-name">{exp.title}</h3>
                <p className="expense-amount">₹{exp.amount}</p>

                <div className="expense-meta">
                  <span>{exp.category || "General"}</span>
                  <span>
                    {new Date(exp.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric"
                    })}
                  </span>
                </div>
              </div>

              <div className="card-actions">
                <button
                  className="edit-btn"
                  onClick={() => navigate(`/edit-expense/${exp._id}`)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(exp._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default ExpenseOrg;