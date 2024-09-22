import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];


    // Check if the username and password match any user in localStorage
    const validUser = users.find(user => user.username === username && user.password === password);
    if (validUser) {
        // Save the specific logged-in user's details to localStorage
        localStorage.setItem('currentUser', JSON.stringify(validUser));
        alert('Login successful!');
        navigate("/dashboard"); // Redirect to dashboard after successful login
      } else {
        alert('Invalid username or password');
      }
  };
  return (
    <div className="login-form">
      <h2>Login</h2>
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
