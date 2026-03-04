import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RequestsTemp.css";

const RequestsTemp = () => {
  const navigate = useNavigate();

  const [requests, setRequests] = useState([]);

  const [form, setForm] = useState({
    item: "",
    quantity: "",
    status: "",
  });

  const [editId, setEditId] = useState(null);

  const handleAdd = () => {
    if (!form.item || !form.quantity || !form.status) {
      alert("Please fill all fields!");
      return;
    }

    const newRequest = {
      id: Date.now(),
      ...form,
    };

    setRequests((prev) => [...prev, newRequest]);
    setForm({ item: "", quantity: "", status: "" });
  };

  const handleDelete = (id) => {
    setRequests((prev) => prev.filter((req) => req.id !== id));
  };

  const handleEdit = (req) => {
    setEditId(req.id);
    setForm({
      item: req.item,
      quantity: req.quantity,
      status: req.status,
    });
  };

  const handleUpdate = () => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === editId ? { ...req, ...form } : req
      )
    );

    setEditId(null);
    setForm({ item: "", quantity: "", status: "" });
  };

  return (
    <div className="request-page">

      {/* ===== HEADER WITH BACK BUTTON ===== */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
        }}
      >
        <h2
          className="page-title"
          style={{ margin: 0 }}
        >
          Request your necessity here
        </h2>

        <button
          onClick={() => navigate("/")}
          style={{
            background: "#e0ecff",
            color: "#1d4ed8",
            border: "none",
            padding: "10px 18px",
            borderRadius: "12px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#c7dbff";
            e.target.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#e0ecff";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Back
        </button>
      </div>

      {/* ===== FORM SECTION ===== */}
      <div className="form-wrapper">
        <div className="request-form-card">
          <h3 style={{ marginBottom: "20px" }}>
            {editId ? "Edit Request" : "Add New Request"}
          </h3>

          <input
            type="text"
            placeholder="Item Name"
            value={form.item}
            onChange={(e) => setForm({ ...form, item: e.target.value })}
          />

          <input
            type="number"
            placeholder="Quantity"
            min="1"
            value={form.quantity}
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <select
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value })
            }
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          {editId ? (
            <button className="btn update" onClick={handleUpdate}>
              Update Request
            </button>
          ) : (
            <button className="btn add" onClick={handleAdd}>
              Add Request
            </button>
          )}
        </div>
      </div>

      {/* ===== REQUEST LIST ===== */}
      <div
        className="request-list"
        style={{
          marginTop: "40px",
          maxHeight: "400px",
          overflowY: "auto",
          paddingRight: "5px",
        }}
      >
        {requests.map((req) => (
          <div key={req.id} className="request-card">
            <div>
              <h3>{req.item}</h3>
              <p>Qty: {req.quantity}</p>
              <span className={`status ${req.status.toLowerCase()}`}>
                {req.status}
              </span>
            </div>

            <div className="actions">
              <button className="btn edit" onClick={() => handleEdit(req)}>
                Edit
              </button>

              <button
                className="btn delete"
                onClick={() => handleDelete(req.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default RequestsTemp;