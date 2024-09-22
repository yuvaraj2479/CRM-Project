import React, { useState, useEffect } from "react";

const Records = () => {
  const [record, setRecord] = useState("");
  const [records, setRecords] = useState([]);
  const user = JSON.parse(localStorage.getItem('users')); // Logged-in user

  // Load user's records from localStorage when component mounts
  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem(user.username + '_records')) || [];
    setRecords(storedRecords);
  }, [user.username]);

  // Handle creating a new record
  const handleCreateRecord = () => {
    if (record) {
      const updatedRecords = [...records, record];
      setRecords(updatedRecords);
      localStorage.setItem(user.username + '_records', JSON.stringify(updatedRecords));
      setRecord(""); // Clear the input field
    }
  };

  return (
    <div className="record-page">
      <h2>Welcome, {user.username}</h2>

      {/* Input for creating a new record */}
      <div className="create-record-form">
        <input
          type="text"
          placeholder="Enter new record"
          value={record}
          onChange={(e) => setRecord(e.target.value)}
        />
        <button onClick={handleCreateRecord}>Create Record</button>
      </div>

      {/* Display the user's records */}
      <div className="records-list">
        <h3>Your Records:</h3>
        {records.length > 0 ? (
          <ul>
            {records.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        ) : (
          <p>No records yet.</p>
        )}
      </div>
    </div>
  );
};

export default Records;
