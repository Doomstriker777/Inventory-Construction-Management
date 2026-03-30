import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState("");
  const [project, setproject] = useState("");

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("name"));
    setproject(localStorage.getItem("projectCode"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* ===== Premium Navbar ===== */}
      <header className="navbar">
        <div className="nav-left">
          <h2 className="logo">Inventory Management</h2>
          <p className="tagline">Smart Site Control</p>
        </div>

        <div className="nav-right">
          <button className="nav-btn profile">
            {project}

          </button>

          <button className="nav-btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* ===== Main Content ===== */}
      <main className="content">

        {/* Welcome */}
        <section className="welcome">
          <h1>
            Hello, <span>{loggedInUser}</span>
          </h1>
          <p>
            Manage construction site materials, workforce attendance, financial
            transactions, and requests — all in one secure and organized platform.
          </p>

        </section>

        {/* Modules */}
        <section className="modules">

          <div className="module-card"  onClick={() => navigate("/material")}
            role="button"
            tabIndex={0}>
            <h3>Materials</h3>
            <p>Track inventory and stock updates.</p>
          </div>

          <div className="module-card"  onClick={() => navigate("/attendance")}
            role="button"
            tabIndex={0}>
            <h3>Attendance</h3>
            <p>Daily workforce monitoring made easy.</p>
          </div>

          <div
            className="module-card"
            onClick={() => navigate("/expense")}
            role="button"
            tabIndex={0}
          >
            <h3>Transactions</h3>
            <p>Manage expenses and payments securely.</p>
          </div>

          <div className="module-card" onClick={() => navigate("/request")}
            role="button"
            tabIndex={0}>
            <h3>Requests</h3>
            <p>Raise and approve site requests faster.</p>
          </div>

        </section>
      </main>
    </div>
  );
};

export default MainPage;
