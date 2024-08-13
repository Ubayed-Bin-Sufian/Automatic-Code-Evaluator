import React from "react";
import logo from "./images/logo.png"
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
<nav className="fixed top-0 left-0 w-full bg-white shadow-md shadow-blue-300">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-20">
    <div className="flex items-center">
  <Link to="/">
    <img src={logo} alt="Logo" className="h-10 w-auto" />
  </Link>
</div>
      <div className="flex items-center space-x-6">
        <a href="/practice" className="text-gray-700 hover:text-blue-500 text-lg font-medium">
          Practice
        </a>
        <a href="/compete" className="text-gray-700 hover:text-blue-500 text-lg font-medium">
          Compete
        </a>
        <a href="/login" className="text-blue-500 hover:bg-blue-50 border-2 border-blue-300 rounded-lg px-4 py-2 text-lg font-medium transition duration-300">
          Login
        </a>
        {/* <a href="/signup" className="text-blue-500 hover:bg-blue-50 border-2 border-blue-300 rounded-lg px-4 py-2 text-lg font-medium transition duration-300">
          Sign Up
        </a> */}
      </div>
    </div>
  </div>
</nav>
  );
};

export default Navbar;
