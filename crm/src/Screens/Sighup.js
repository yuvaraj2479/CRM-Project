import React, { useState } from "react";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (username && password) {
      // Retrieve the existing users from localStorage (if any)
      let users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Check if the username already exists
      const userExists = users.some(user => user.username === username);
      
      if (userExists) {
        alert("Username already exists! Please choose another one.");
        return;
      }

      // Add new user to the array of users
      users.push({ username, password });

      // Store the updated users array in localStorage
      localStorage.setItem('users', JSON.stringify(users));
      
      alert('User signed up successfully!');
      setUsername("");
      setPassword("");
    } else {
      alert('Please provide both username and password');
    }
  };

  return (
    <div className="signup-form">
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default Signup;
