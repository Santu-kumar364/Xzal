import { Card } from "@mui/material";
import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes } from "react-router-dom";

const Authentication = () => {
  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {/* Full-screen Background Image */}
      <img
        src="https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg"
        alt="Social Background"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1
        }}
      />
      
      {/* Dark Overlay */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        zIndex: -1
      }}></div>
      
      {/* Main Card Container */}
      <Card style={{
        width: "90%",
        maxWidth: "500px",
        padding: "2.5rem",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        boxShadow: "0 4px 30px rgba(0,0,0,0.2)",
        borderRadius: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}>
        {/* Branding Text Inside Card */}
        <div style={{
          textAlign: "center",
          marginBottom: "2rem",
          width: "100%"
        }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "0.5rem",
            color: "#333"
          }}>
            Xzal
          </h1>
          <p style={{
            fontSize: "1.1rem",
            margin: 0,
            color: "#555",
            fontStyle: "italic"
          }}>
            Where Connections Flourish and Stories Unfold
          </p>
        </div>
        <Routes>
          <Route path="/" element={<Login />}/> 
          <Route path="/login" element={<Login />}/> 
          <Route path="/register" element={<Register />}/> 
        </Routes>
        
      </Card>
    </div>
  );
};

export default Authentication;





 