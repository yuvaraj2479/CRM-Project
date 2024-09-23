import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import React from "react";
import Login from "./Screens/Login";
import Signup from "./Screens/Sighup";
import Dashboard from "./Screens/Dashboard";
import Records from "./Screens/CreateRecords";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/records" element={<Records />} />
        <Route path="/logout" element={<Records />} />
      </Routes>
    </Router>
  );
}

export default App;
