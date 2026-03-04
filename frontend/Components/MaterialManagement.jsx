import React, { useState } from "react";
import "./MaterialManagement.css";

function MaterialManagement() {
  const [activeSection, setActiveSection] = useState("manage");
  const [materials, setMaterials] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const [formData, setFormData] = useState({
    materialType: "",
    quantity: "",
    unit: "",
    trucks: "",
    supplier: "",
    date: "",
    remarks: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editIndex === -1) {
      setMaterials([...materials, formData]);
    } else {
      const updated = [...materials];
      updated[editIndex] = formData;
      setMaterials(updated);
      setEditIndex(-1);
    }

    setFormData({
      materialType: "",
      quantity: "",
      unit: "",
      trucks: "",
      supplier: "",
      date: "",
      remarks: "",
    });
  };

  const handleEdit = (index) => {
    setFormData(materials[index]);
    setEditIndex(index);
    setActiveSection("manage");
  };

  const handleDelete = (index) => {
    setMaterials(materials.filter((_, i) => i !== index));
  };

  // Calculate totals
  const materialTotals = materials.reduce((acc, item) => {
    const qty = Number(item.quantity);
    const name = item.materialType.trim();
    acc[name] = (acc[name] || 0) + qty;
    return acc;
  }, {});

  return (
    <div className="material-page">
      <h2 className="page-title">Material Management Module</h2>

      {/* Section Cards */}
      <div className="section-cards">
        <div
          className={`section-card ${activeSection === "manage" ? "active" : ""}`}
          onClick={() => setActiveSection("manage")}
        >
          <h3>Manage Materials</h3>
          <p>Add, edit and track materials</p>
        </div>

        <div
          className={`section-card ${activeSection === "summary" ? "active" : ""}`}
          onClick={() => setActiveSection("summary")}
        >
          <h3>Material Summary</h3>
          <p>Total quantity of each material</p>
        </div>
      </div>

      {/* MANAGE MATERIALS */}
      {activeSection === "manage" && (
        <div className="material-container">
          <form className="material-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="materialType"
              placeholder="Material Name (e.g., Bricks, Cement)"
              value={formData.materialType}
              onChange={handleChange}
              required
            />

            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />

            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
            >
              <option value="">Unit</option>
              <option value="Bags">Bags</option>
              <option value="Tons">Tons</option>
              <option value="Cubic Feet">Cubic Feet</option>
              <option value="Numbers">Numbers</option>
            </select>

            <input
              type="number"
              name="trucks"
              placeholder="No. of Trucks"
              value={formData.trucks}
              onChange={handleChange}
            />

            <input
              type="text"
              name="supplier"
              placeholder="Supplier Name"
              value={formData.supplier}
              onChange={handleChange}
            />

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />

            <textarea
              name="remarks"
              placeholder="Remarks"
              value={formData.remarks}
              onChange={handleChange}
            ></textarea>

            <button type="submit">
              {editIndex === -1 ? "Add Material" : "Update Material"}
            </button>
          </form>

          <table className="material-table">
            <thead>
              <tr>
                <th>Material</th>
                <th>Quantity</th>
                <th>Unit</th>
                <th>No. of Trucks</th>
                <th>Supplier</th>
                <th>Date</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {materials.length === 0 ? (
                <tr>
                  <td colSpan="8">No records available</td>
                </tr>
              ) : (
                materials.map((item, index) => (
                  <tr key={index}>
                    <td>{item.materialType}</td>
                    <td>{item.quantity}</td>
                    <td>{item.unit}</td>
                    <td>{item.trucks}</td>
                    <td>{item.supplier}</td>
                    <td>{item.date}</td>
                    <td>{item.remarks}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* SUMMARY */}
      {activeSection === "summary" && (
        <div className="summary-container">
          {Object.keys(materialTotals).length === 0 ? (
            <p>No material data available</p>
          ) : (
            Object.entries(materialTotals).map(([material, total]) => (
              <div key={material} className="summary-card">
                <h3>{material}</h3>
                <p>
                  Total Quantity: <strong>{total}</strong>
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default MaterialManagement;
