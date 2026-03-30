import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link, useNavigate } from 'react-router-dom'

import './Signup.css'

const Signup = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "siteEngineer", // default role
    projectCode: ""       // NEW: project code
  })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function submitDetails() {
    fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (!res.ok) throw new Error("Signup failed")
        return res.json()
      })
      .then(data => {
        toast.success("Account created successfully!", { autoClose: 2000 })
        toast.info("Redirecting to login page...", { autoClose: 2000 })

        // Reset form
        setForm({ name: "", email: "", password: "", role: "siteEngineer", projectCode: "" })

        setTimeout(() => {
          navigate('/login')
        }, 2000)
      })
      .catch(() => {
        toast.error("Signup failed. Try again!", { autoClose: 3000 })
      })
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2 className="signup-tagline">Sign Up!</h2>

        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="input-box"
          placeholder="Full Name"
        />

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="input-box"
          placeholder="Email Address"
        />

        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="input-box"
          placeholder="Password"
        />

        <input
          type="text"
          name="projectCode"
          value={form.projectCode}
          onChange={handleChange}
          className="input-box"
          placeholder="Project Code"
        />

        {/* Role selector */}
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="input-box"
        >
          <option value="siteEngineer">Site Engineer</option>
          <option value="inventoryManager">Inventory Manager</option>
          <option value="admin">Admin</option>
        </select>

        <button className="signup-btn" onClick={submitDetails}>
          Create Account
        </button>

        <p className="redirect-text">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>

      <ToastContainer position="top-right" />
    </div>
  )
}

export default Signup