import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import React from "react";
import Login from "./Screens/Login";
import Dashboard from "./Screens/Dashboard";
import Records from "./Screens/CreateRecords";
import PageNotFound from "./Screens/PageNotFound";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/records" element={<Records />} />
        <Route path="/logout" element={<Records />} />
        <Route path="/404" element={<PageNotFound />} /> 
        <Route path="*" element={<Navigate to="/404" />} /> 
      </Routes>
    </Router>
  );
}

export default App;
