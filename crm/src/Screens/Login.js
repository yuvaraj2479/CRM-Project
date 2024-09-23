import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import userinteface from '../Components/assets/user-interface.png'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [createusername, setcreateUsername] = useState("");
  const [createemail, setcreateemail] = useState("")
  const [createpassword, setcreatePassword] = useState("");
  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || [];

    console.log(users,'sdsd');
    


    // Check if the username and password match any user in localStorage
    const validUser = users.find(user => user.createemail === username && user.createpassword === password);
    if (validUser) {
      // Save the specific logged-in user's details to localStorage
      localStorage.setItem('currentUser', JSON.stringify(validUser));
      alert('Login successful!');
      navigate("/dashboard"); // Redirect to dashboard after successful login
    } else {
      alert('Invalid username or password');
    }
  };


  const [isSignIn, setIsSignIn] = useState(false);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };



  const handleSignup = () => {
    if (createemail && createpassword) {
      // Retrieve the existing users from localStorage (if any)
      let users = JSON.parse(localStorage.getItem('users')) || [];

      // Check if the username already exists
      const userExists = users.some(user => user.createemail === createemail);

      if (userExists) {
        alert("Username already exists! Please choose another one.");
        return;
      }

      // Add new user to the array of users 
      users.push({ createusername, createemail, createpassword });

      // Store the updated users array in localStorage
      localStorage.setItem('users', JSON.stringify(users));

      alert('User signed up successfully!');
      setcreateUsername("");
      setcreateemail("");
      setcreatePassword('')
    } else {
      alert('Please provide both username and password');
    }
  };


  return (

    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-blue-200">
      <div className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Sign Up Form */}
        {
          isSignIn ?
            <div className={`pt-10 pb-10 pl-5 pr-5 left-0 w-1/2 h-full `}>
              <form className="flex flex-col items-center justify-center h-full px-10">
                <h1 className="text-2xl font-bold mb-6">Create Account</h1>
                <div className="flex mb-4">
                  <img src={userinteface} alt="My Image Description" className="h-16 w-full" />
                </div>
                <span className="text-sm mb-4">or use your email for registration</span>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full mb-4 p-2 bg-gray-100 rounded-lg outline-none"
                  autocomplete="off"
                  value={createusername}
                  onChange={(e) => setcreateUsername(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full mb-4 p-2 bg-gray-100 rounded-lg outline-none"
                  autocomplete="off"
                  value={createemail}
                  onChange={(e) => setcreateemail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full mb-4 p-2 bg-gray-100 rounded-lg outline-none"
                  autocomplete="off"
                  value={createpassword}
                  onChange={(e) => setcreatePassword(e.target.value)}
                />
                <button
                  className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors" onClick={handleSignup}>Sign Up</button>
              </form>
            </div> :
            <div className={` pt-16 pb-20 pl-5 pr-5 left-0 w-1/2 h-full transition-transform duration-500 `}>
              <form className="flex flex-col items-center justify-center h-full px-10">
                <h1 className="text-2xl font-bold mb-6">Sign In</h1>
                <div className="flex mb-4">
                  <img src={userinteface} alt="My Image Description" className="h-16 w-full" />
                </div>
                <span className="text-sm mb-4">or use your email password</span>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full mb-4 p-2 bg-gray-100 rounded-lg outline-none"
                  autocomplete="off"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input type="password"
                  placeholder="Password"
                  className="w-full mb-4 p-2 bg-gray-100 rounded-lg outline-none"
                  autocomplete="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <a href="#" className="text-xs mb-4 text-gray-500">Forget Your Password?</a> */}
                <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 " onClick={(e)=>handleLogin(e)}>Sign In</button>
              </form>
            </div>
        }
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center">
          {
            isSignIn ?
              <div className="text-center p-8">
                <h1 className="text-3xl font-bold">Welcome Back!</h1>
                <p className="text-sm mb-6">Enter your personal details to use all of our site features</p>
                <button onClick={toggleForm} className="py-2 px-8 border border-white text-white rounded-lg hover:bg-white hover:text-purple-600 transition-colors">Sign In</button>
              </div>
              :
              <div className="text-center p-8">
                <h1 className="text-3xl font-bold">Hello, Friend!</h1>
                <p className="text-sm mb-6">Register with your personal details to use all of our site features</p>
                <button onClick={toggleForm} className="py-2 px-8 border border-white text-white rounded-lg hover:bg-white hover:text-purple-600 transition-colors">Sign Up</button>
              </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;
