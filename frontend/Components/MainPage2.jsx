import React from "react";
import { useNavigate } from "react-router-dom";

const MainPage2 = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        position: "relative",
        fontFamily: "Segoe UI, sans-serif",
      }}
    >
      {/* Blue Transparent Layer */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(21, 101, 192, 0.65)",
        }}
      />

      {/* Center Content */}
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "40px",
          color: "white",
        }}
      >
        {/* Heading */}
        <h1
          style={{
            fontSize: "52px",
            fontWeight: "700",
            marginBottom: "10px",
          }}
        >
          Construction
        </h1>

        <h1
          style={{
            fontSize: "60px",
            fontWeight: "800",
            marginBottom: "30px",
            backgroundColor: "white",
            color: "#1565c0",
            padding: "10px 25px",
            borderRadius: "8px",
            letterSpacing: "2px",
          }}
        >
          INVENTORY MANAGEMENT
        </h1>

        {/* Description */}
        <p
          style={{
            maxWidth: "850px",
            fontSize: "18px",
            lineHeight: "1.7",
            marginBottom: "40px",
          }}
        >
          A role-based system designed to manage materials, attendance,
          financial transactions, and material requests efficiently at
          construction sites. This platform replaces manual records with a
          centralized digital solution that improves transparency,
          accountability, and workflow coordination.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/")}
          style={{
            padding: "14px 40px",
            fontSize: "18px",
            fontWeight: "600",
            borderRadius: "40px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "white",
            color: "#1565c0",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#e3f2fd";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "white";
          }}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default MainPage2;