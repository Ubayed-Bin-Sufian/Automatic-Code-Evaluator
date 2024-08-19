import React from "react";
import { useUser } from '../lib/context'; // Adjust the import path as needed
import codingguy from "./images/codingguy.png"; // Replace with your image path
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { user } = useUser(); // Get user from UserContext
  const navigate = useNavigate(); // Initialize navigate function

  const handleChallengeClick = () => {
    navigate('/compete'); // Navigate to /compete on button click
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-8 md:mt-16 px-4 md:px-8">
      <div className="md:w-1/2 mb-12 md:mb-0 md:pr-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Your Coding Journey Starts Here
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mt-6">
          Unlock your potential with personalized learning paths and challenges.
        </p>
        
        {!user ? (
            <Link to="/login" >   
          <button className="mt-8 px-6 py-3 text-lg md:text-xl font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
            Sign Up Now
          </button>
          </Link>
        ) : (
          <Link to="/compete" className="text-gray-700 hover:text-blue-500 text-lg font-medium">
          
        
          <button 
          style={{
            marginTop:'8px',
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            background: 'linear-gradient(to bottom, #FF9933, #FFFFFF, #138808)', // Changed to vertical gradient
            border: 'none',
            borderRadius: '5px',
            color: '#000080',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* <FontAwesomeIcon icon={faFlag} style={{ marginRight: '10px' }} /> */}
          Independence Challenge
        </button>
        </Link>
        )}
      </div>
      <div className="md:w-2/3">
        <img
          src={codingguy} // Replace with your image path
          alt="Coding journey illustration"
          className="w-full h-auto rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default Dashboard;
