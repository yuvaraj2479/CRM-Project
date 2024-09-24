import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router for navigation
import userinteface from '../Components/assets/user-interface.png'
import GlobalToast, { showErrorToast, showSuccessToast } from "../Components/Layouts/GlobalToast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [createusername, setcreateUsername] = useState("");
  const [createemail, setcreateemail] = useState("")
  const [createpassword, setcreatePassword] = useState("");


  const [sighuperrorvalues] = useState({
    createusername: "",
    createemail: "",
    createpassword: ""
  })

  const [errorvalues] = useState({
    username: "",
    password: ""
  })

  const [errors, setErrors] = useState({});
  const [isSaveClick, setIsSaveClick] = useState(false);

  const [sighuperrors, setsighupErrors] = useState({});
  const [sighupisSaveClick, setsighupIsSaveClick] = useState(false);



  const [isSignIn, setIsSignIn] = useState(false);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };


  const navigate = useNavigate();


  const handleLogin = (e) => {
    e.preventDefault()

    setIsSaveClick(true);
    var errorVal = validation(errorvalues);
    setErrors(errorVal);
    if (Object.keys(errorVal).length < 1) {
      const users = JSON.parse(sessionStorage.getItem('users')) || [];
      const validUser = users.find(user => user.createemail === username && user.createpassword === password);
      if (validUser) {
        sessionStorage.setItem('currentUser', JSON.stringify(validUser));
        showSuccessToast("Login Successfully!", 3000, () => {
          navigate("/dashboard");
        });
       
      } else {
        showErrorToast("Invalid username or password!");

      }
    }
  };


  const validation = () => {
    let errors = {};
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (errorvalues.username === '') {
      errors.username = 'Email is required';
    } else if (!regex.test(errorvalues.username)) {
      errors.username = 'Email is invalid';
    }

    if (!errorvalues.password) {
      errors.password = 'Password is required';
    }


    return errors;
  }


  const sighupValidation = () => {
    let sighuperrors = {};
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (sighuperrorvalues.createusername === "") {
      sighuperrors.createusername = 'UserName is Required';
    }

    if (sighuperrorvalues.createemail === '') {
      sighuperrors.createemail = 'Email is Required';
    } else if (!regex.test(sighuperrorvalues.createemail)) {
      sighuperrors.createemail = 'Email is invalid';
    }

    if (sighuperrorvalues.createpassword === "") {
      sighuperrors.createpassword = 'Password is Required';
    }
    return sighuperrors;
  }


  const handleSignup = (e) => {

    e.preventDefault()

    setsighupIsSaveClick(true);
    var errorVal = sighupValidation(sighuperrorvalues);
    setsighupErrors(errorVal);
    if (Object.keys(errorVal).length < 1) {
      if (createemail && createpassword) {
       
        let users = JSON.parse(sessionStorage.getItem('users')) || [];
        const userExists = users.some(user => user.createemail === createemail);

        if (userExists) {
          showErrorToast("Useremail already exists! Please choose another one.");
          return;
        }
        
        users.push({ createusername, createemail, createpassword });
        sessionStorage.setItem('users', JSON.stringify(users));
        showSuccessToast("User signed up successfully!");
        setcreateUsername("");
        setcreateemail("");
        setcreatePassword('')
      } else {
        showErrorToast("Please provide both username and password");
      }
    }
  };


  return (

    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-300 to-blue-200">
       <GlobalToast />
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
                <div className="mb-4 w-full" >
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 bg-gray-100 rounded-lg outline-none"
                    autocomplete="off"
                    value={createusername}
                    onChange={(e) => {
                      sighuperrorvalues.createusername = e.target.value
                      setcreateUsername(e.target.value)
                      if (sighupisSaveClick) {
                        setsighupErrors(sighupValidation(sighuperrorvalues));
                      }
                    }}
                  />
                  {sighuperrors.createusername && (
                    <span className=" text-red-500 text-tiny p-1">{sighuperrors.createusername}</span>
                  )}
                </div>

                <div className="mb-4 w-full">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full  p-2 bg-gray-100 rounded-lg outline-none"
                    autocomplete="off"
                    value={createemail}
                    onChange={(e) => {
                      sighuperrorvalues.createemail = e.target.value
                      setcreateemail(e.target.value)
                      if (sighupisSaveClick) {
                        setsighupErrors(sighupValidation(sighuperrorvalues));
                      }
                    }}
                  />
                  {sighuperrors.createemail && (
                    <span className=" text-red-500 text-tiny p-1">{sighuperrors.createemail}</span>
                  )}
                </div>

                <div className="mb-4 w-full">
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full  p-2 bg-gray-100 rounded-lg outline-none"
                    autocomplete="off"
                    value={createpassword}
                    onChange={(e) => {
                      sighuperrorvalues.createpassword = e.target.value
                      setcreatePassword(e.target.value)
                      if (sighupisSaveClick) {
                        setsighupErrors(sighupValidation(sighuperrorvalues));
                      }
                    }
                    }
                  />
                  {sighuperrors.createpassword && (
                    <span className=" text-red-500 text-tiny p-1">{sighuperrors.createpassword}</span>
                  )}
                </div>

                <button
                  className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors" onClick={(e) => handleSignup(e)}>Sign Up</button>
              </form>
            </div> :
            <div className={` pt-16 pb-20 pl-5 pr-5 left-0 w-1/2 h-full transition-transform duration-500 `}>
              <form className="flex flex-col items-center justify-center h-full px-10">
                <h1 className="text-2xl font-bold mb-6">Sign In</h1>
                <div className="flex mb-4">
                  <img src={userinteface} alt="My Image Description" className="h-16 w-full" />
                </div>
                <span className="text-sm mb-4">or use your email password</span>

                <div className="mb-4 w-full">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full  p-2 bg-gray-100 rounded-lg outline-none"
                    autocomplete="off"
                    value={username}
                    onChange={(e) => {
                      errorvalues.username = e.target.value
                      setUsername(e.target.value)
                      if (isSaveClick) {
                        setErrors(validation(errorvalues))
                      }
                    }}
                  />
                  {errors.username && (
                    <span className=" text-red-500 text-tiny p-1 ">{errors.username}</span>
                  )}
                </div>
                <div className="mb-4 w-full">
                  <input type="password"
                    placeholder="Password"
                    className="w-full  p-2 bg-gray-100 rounded-lg outline-none"
                    autocomplete="off"
                    value={password}
                    onChange={(e) => {
                      errorvalues.password = e.target.value
                      setPassword(e.target.value)
                      if (isSaveClick) {
                        setErrors(validation(errorvalues))
                      }
                    }}
                  />

                  {errors.password && (
                    <span className=" text-red-500 text-tiny p-1">{errors.password}</span>
                  )}
                </div>

                {/* <a href="#" className="text-xs mb-4 text-gray-500">Forget Your Password?</a> */}
                <button className="w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 " onClick={(e) => handleLogin(e)}>Sign In</button>
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
