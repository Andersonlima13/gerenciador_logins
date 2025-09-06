import React from "react";
import Sidebar_component from "../components/Sidebar";
import Navbar from "../components/Navbar"


export default function register() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#6f85a8' }}>
    <Navbar />
    <Sidebar_component />
    
   
  </div>
  );
}