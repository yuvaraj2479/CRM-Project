import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  // Retrieve the current logged-in user from localStorage
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // If no user is logged in, redirect to login page
  useEffect(() => {
    if (!currentUser) {
      navigate("/");  // Redirect to login if not authenticated
    } else {
      // Load records specific to the logged-in user from localStorage
      const storedRecords = JSON.parse(localStorage.getItem(currentUser.username + '_records')) || [];
      setRecords(storedRecords);
    }
  }, [currentUser, navigate]);

  // Handle creating a new record for the logged-in user
  const handleCreateRecord = () => {
    if (name && age && email && address) {
      const newRecord = {
        name,
        age,
        email,
        address,
      };

      const updatedRecords = [...records, newRecord];
      setRecords(updatedRecords);

      // Save records for the specific user
      localStorage.setItem(currentUser.username + '_records', JSON.stringify(updatedRecords));

      // Clear input fields
      setName("");
      setAge("");
      setEmail("");
      setAddress("");
    }
  };

  // Handle logout
  const handleLogout = () => {
    // localStorage.removeItem('currentUser');  // Remove the currentUser from localStorage
    navigate("/");  // Redirect to login
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {currentUser?.username}</h2>

      <button onClick={handleLogout}>Logout</button>  {/* Logout Button */}

      <div className="create-record">
        <h3>Create a New Record:</h3>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button onClick={handleCreateRecord}>Add Record</button>
      </div>

      <div className="view-records">
        <h3>Your Records:</h3>
        {records.length > 0 ? (
          <ul>
            {records.map((rec, index) => (
              <li key={index}>
                <strong>Name:</strong> {rec.name}, <strong>Age:</strong> {rec.age}, <strong>Email:</strong> {rec.email}, <strong>Address:</strong> {rec.address}
              </li>
            ))}
          </ul>
        ) : (
          <p>No records found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
