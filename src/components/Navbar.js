import React, { useContext } from "react";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";
import { UserContext } from '../lib/context'; // Import UserContext
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';

const Navbar = () => {
  const { user } = useContext(UserContext); // Get user from context
  
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to homepage after logout
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
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
            {/* <Link to="/compete" className="text-gray-700 hover:text-blue-500 text-lg font-medium">
              Practice
            </Link> */}
            <Link to="/compete" className="text-gray-700 hover:text-blue-500 text-lg font-medium">
              Compete
            </Link>
            {/* Conditionally render the login button */}
            {!user && (
              <Link to="/login" className="text-blue-500 hover:bg-blue-50 border-2 border-blue-300 rounded-lg px-4 py-2 text-lg font-medium transition duration-300">
                Login
              </Link>
            )}
            {/* Add a Profile link if user is logged in */}
            {user && (
          <button onClick={handleLogout} className="text-blue-500 hover:bg-blue-50 border-2 border-blue-300 rounded-lg px-4 py-2 text-lg font-medium transition duration-300">
            Logout
        </button>
            )}
            {/* Uncomment if you want to add a Sign Up link */}
            {/* <Link to="/signup" className="text-blue-500 hover:bg-blue-50 border-2 border-blue-300 rounded-lg px-4 py-2 text-lg font-medium transition duration-300">
              Sign Up
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
