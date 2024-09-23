import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userinteface from '../../Components/assets/user-interface.png'
import crm from '../../Components/assets/crm.jpg'

const Navbar = () => {
  // State to manage mobile menu visibility
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()

  // Function to toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsProfileMenuOpen(false);
  };

  return (
    <nav className="bg-blue-600 w-full text-white shadow-lg">
      <div className="w-full  px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center ">
            <img src={crm} alt="My Image Description" className="h-10 text-white" /> 
            <h1 className="text-xl font-bold px-2 "> Customer Relationship Management</h1>
          </div>
          <div className="hidden md:flex md:space-x-8 items-center">
            <NavLink
              to="/dashboard"
              exact
              className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              activeClassName="bg-blue-700"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/records"
              className="text-white hover:bg-blue-500 px-3 py-2 rounded-md text-sm font-medium"
              activeClassName="bg-blue-700"
            >
              Create Records
            </NavLink>

            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center focus:outline-none"
              >
                <img src={userinteface} alt="My Image Description" className="h-10 text-white w-full" />
              </button>

              {/* Dropdown menu */}
              {isProfileMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                    <span className="block px-4 py-2 text-sm text-gray-700">Username</span>
                    <button
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        // Add logout functionality here
                        alert('Logout');
                        navigate('/')
                        closeMenus();
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center ">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
              aria-controls="mobile-menu"
              aria-expanded={isOpen ? "true" : "false"}
            >
              {/* Icon changes based on mobile menu state */}
              {isOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <NavLink
            to="/dashboard"
            exact
            className="block text-white hover:bg-blue-500 px-3 py-2 rounded-md text-base font-medium"
            activeClassName="bg-blue-700"
            onClick={() => setIsOpen(false)} // Close menu on link click
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/records"
            className="block text-white hover:bg-blue-500 px-3 py-2 rounded-md text-base font-medium"
            activeClassName="bg-blue-700"
            onClick={() => setIsOpen(false)} // Close menu on link click
          >
            Create Dashboard
          </NavLink>
          <NavLink
            to="/"
            className="block text-white hover:bg-blue-500 px-3 py-2 rounded-md text-base font-medium"
            activeClassName="bg-blue-700"
            onClick={() => setIsOpen(false)} // Close menu on link click
          >
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
