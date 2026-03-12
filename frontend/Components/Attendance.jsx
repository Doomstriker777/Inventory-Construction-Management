import { useState } from "react";
import "./Attendance.css";

export default function Attendance() {
  const [date, setDate] = useState("");
  const [rows, setRows] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

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
    updated[index].total =
      updated[index].workers * updated[index].wage;
    updateTotals(updated);
  };

  const updateTotals = (updatedRows) => {
    setRows(updatedRows);
    const sum = updatedRows.reduce((a, r) => a + r.total, 0);
    setGrandTotal(sum);
  };

  return (
    <div className="container">
      <h1>Labour Attendance</h1>

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
                  onChange={(e) =>
                    updateRow(i, "labourType", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={row.workers}
                  onChange={(e) =>
                    updateRow(i, "workers", Number(e.target.value))
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={row.wage}
                  onChange={(e) =>
                    updateRow(i, "wage", Number(e.target.value))
                  }
                />
              </td>
              <td>{row.total}</td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteRow(i)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-btn" onClick={addRow}>
        + Add Labour
      </button>

      <div className="summary">
        <span>Total Cost:</span>
        <strong>₹ {grandTotal}</strong>
      </div>
    </div>
  );
}
