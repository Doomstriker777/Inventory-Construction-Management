import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate, Link } from 'react-router-dom'

import './Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: "", password: ""})

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit() {
    if(!form.email || !form.password){
        toast.warn('Insufficient credentials!',{ autoClose : 2000 })
        return
    }

    if(form.password.length<4){
        toast.warn("Password must be atleast 4 characters",{ autoClose : 3000 })
        return
    }

    fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(res => {
        if (!res.ok) throw new Error("Login failed")
        return res.json()
      })
      .then(data => {
        localStorage.setItem("token", data.jwtToken)
        console.log(localStorage.getItem("token"))
        localStorage.setItem("name", data.name)
        localStorage.setItem("role", data.role)
        localStorage.setItem("projectCode", data.projectCode)  // ✅ FIXED

        toast.success("Login successful!", { autoClose: 2000 })
        toast.info("Redirecting to main page...", { autoClose: 2000 })

        setForm({ email: '', password: '' })

        setTimeout(() => {
          navigate('/main2')
        }, 2200)
      })
      .catch(() => {
        toast.error("Invalid email or password", { autoClose: 3000 })
      })
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Welcome back!!</h1>
        <p className="login-tagline">Please login to continue</p>

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

        <button className="login-btn" onClick={handleSubmit}>
          Login
        </button>

        <p className="redirect-text">
          New user? <Link to="/signup">Create an account</Link>
        </p>
      </div>

      <ToastContainer position="top-right" />
    </div>
  )
}

export default Login