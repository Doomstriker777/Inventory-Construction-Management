import { useState, useEffect } from "react";
import axios from "axios";
import "./Attendance.css";
import { ToastContainer, toast } from 'react-toastify';

export default function Attendance() {
  const [date, setDate] = useState("");
  const [rows, setRows] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);
  
  const [pastRecords, setPastRecords] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [activeSection, setActiveSection] = useState("manage");

  const filteredRecords = date ? pastRecords.filter(r => r.date === date) : [];

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/attendance`);
      if (res.data.success) {
        setPastRecords(res.data.data);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch historical attendance");
    }
  };

  const addRow = () => {
    setRows([
      ...rows,
      { labourType: "", workers: 0, wage: 0, total: 0 }
    ]);
  };

  const deleteRow = (index) => {
    const updated = rows.filter((_, i) => i !== index);
    updateTotals(updated);
  };

  const updateRow = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    updated[index].total = updated[index].workers * updated[index].wage;
    updateTotals(updated);
  };

  const updateTotals = (updatedRows) => {
    setRows(updatedRows);
    const sum = updatedRows.reduce((a, r) => a + r.total, 0);
    setGrandTotal(sum);
  };

  const handleSubmit = async () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }
    if (rows.length === 0) {
      toast.error("Please add at least one row");
      return;
    }

    for (let r of rows) {
      if (!r.labourType) {
        toast.error("Labour Type is required for all rows");
        return;
      }
    }

    const payload = {
      entries: rows.map(r => ({
        date,
        labourType: r.labourType,
        workers: r.workers,
        wage: r.wage,
        total: r.total
      }))
    };

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/attendance`, payload);
      if (res.data.success) {
        toast.success("Attendance added successfully");
        setRows([]);
        setGrandTotal(0);
        fetchRecords(); 
      }
    } catch (err) {
      console.error(err);
      toast.error("Error saving attendance");
    }
  };

  const handleEditClick = (record) => {
    setEditingId(record._id);
    setEditFormData({ ...record });
  };

  const handleEditChange = (field, value) => {
    const updated = { ...editFormData, [field]: value };
    if (field === "workers" || field === "wage") {
      updated.total = (parseFloat(updated.workers) || 0) * (parseFloat(updated.wage) || 0);
    }
    setEditFormData(updated);
  };

  const handleSaveEdit = async () => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/attendance/${editingId}`, editFormData);
      if (res.data.success) {
        toast.success("Record updated");
        setEditingId(null);
        fetchRecords();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to update record");
    }
  };

  const handleDeleteRecord = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/attendance/${id}`);
      if (res.data.success) {
        toast.success("Record deleted");
        fetchRecords();
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete record");
    }
  };

  return (
    <div className="container" style={{maxWidth: '1200px'}}>
      <ToastContainer position="top-right" autoClose={3000}/>
      <button className="back-btn" onClick={() => window.history.back()}>
        ← Back
      </button>
      
      <h1 className="page-title">Labour Attendance Entry</h1>

      <div className="section-cards">
        <div
          className={`section-card ${activeSection === "manage" ? "active" : ""}`}
          onClick={() => setActiveSection("manage")}
        >
          <h3>Manage Attendance</h3>
          <p>Add new labour attendance</p>
        </div>

        <div
          className={`section-card ${activeSection === "summary" ? "active" : ""}`}
          onClick={() => setActiveSection("summary")}
        >
          <h3>Attendance Summary</h3>
          <p>View past records by date</p>
        </div>
      </div>

      {activeSection === "manage" && (
        <div className="manage-section">
          <div className="top-bar">
            <label className="date-label">Attendance Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <table>
            <thead>
              <tr>
                <th>Labour Type</th>
                <th>No. of Workers</th>
                <th>Daily Wage (₹)</th>
                <th>Total (₹)</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td>
                    <input
                      type="text"
                      value={row.labourType}
                      onChange={(e) => updateRow(i, "labourType", e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={row.workers}
                      onChange={(e) => updateRow(i, "workers", Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={row.wage}
                      onChange={(e) => updateRow(i, "wage", Number(e.target.value))}
                    />
                  </td>
                  <td>{row.total}</td>
                  <td>
                    <button className="delete-btn" onClick={() => deleteRow(i)}>❌</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <button className="add-btn" onClick={addRow}>+ Add Labour</button>
            <button className="ok-btn" onClick={handleSubmit} style={{marginTop: "15px", padding: "10px 24px", background: "#28a745", color: "white", fontSize: "16px", fontWeight: "bold"}}>OK (Submit)</button>
          </div>

          <div className="summary">
            <span>Current Entry Total:</span>
            <strong>₹ {grandTotal}</strong>
          </div>
        </div>
      )}

      {activeSection === "summary" && (
        <div className="summary-section">
          <div className="top-bar" style={{justifyContent: "center", marginBottom: "20px"}}>
            <label className="date-label" style={{fontSize: "16px"}}>Select Date to View records : </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{padding: "10px", fontSize: "16px"}}
            />
          </div>
          
          <h2>Past Attendance Records</h2>
          <div className="records-container" style={{overflowX: 'auto'}}>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Labour Type</th>
                  <th>Workers</th>
                  <th>Wage (₹)</th>
                  <th>Total (₹)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!date ? (
                  <tr><td colSpan="6" style={{textAlign: "center", padding: "20px"}}>Please select a date from above to view its records.</td></tr>
                ) : filteredRecords.length === 0 ? (
                  <tr><td colSpan="6" style={{textAlign: "center", padding: "20px"}}>No records found for {date}.</td></tr>
                ) : filteredRecords.map((rec) => (
                  <tr key={rec._id}>
                    {editingId === rec._id ? (
                      <>
                        <td><input type="date" value={editFormData.date} onChange={(e) => handleEditChange("date", e.target.value)} /></td>
                        <td><input type="text" value={editFormData.labourType} onChange={(e) => handleEditChange("labourType", e.target.value)} /></td>
                        <td><input type="number" min="0" value={editFormData.workers} onChange={(e) => handleEditChange("workers", e.target.value)} /></td>
                        <td><input type="number" min="0" value={editFormData.wage} onChange={(e) => handleEditChange("wage", e.target.value)} /></td>
                        <td>{editFormData.total}</td>
                        <td>
                          <button style={{background: "#28a745", color: "white", padding: "6px 12px", marginRight: "5px", border: "none", borderRadius: "4px"}} onClick={handleSaveEdit}>Save</button>
                          <button style={{background: "#6c757d", color: "white", padding: "6px 12px", border: "none", borderRadius: "4px"}} onClick={() => setEditingId(null)}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{rec.date}</td>
                        <td>{rec.labourType}</td>
                        <td>{rec.workers}</td>
                        <td>{rec.wage}</td>
                        <td>₹ {rec.total}</td>
                        <td>
                          <button style={{background: "#ffc107", color: "black", padding: "6px 12px", marginRight: "5px", border: "none", borderRadius: "4px"}} onClick={() => handleEditClick(rec)}>✏️ Edit</button>
                          <button className="delete-btn" onClick={() => handleDeleteRecord(rec._id)}>🗑️ Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {date && filteredRecords.length > 0 && (
            <div className="summary" style={{marginTop: "20px", display: "flex", justifyContent: "flex-end", gap: "10px", fontSize: "18px"}}>
              <span>Total Daily Cost:</span>
              <strong>₹ {filteredRecords.reduce((acc, rec) => acc + (rec.total || 0), 0)}</strong>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
